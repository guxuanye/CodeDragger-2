import React, { useEffect, useState } from 'react'
import TabPanel from './component/TabPanelProps/TabPanelProps'
import Material from './component/Material'
import {
  getMaterialList,
  GetMaterialListResponse,
  MaterialType
} from './service'
import './Left.css'
import { WithDraggable } from '../../utils/WithDraggable'
import RemoteComponent from '@cdl-pkg/remote-component'
import { getDefaultInstance } from '../../utils/JsonSchema'
import { GenNonDuplicateID } from '../../utils'

function MockIcon() {
  return (
    <div
      style={{
        width: '90px',
        height: '45px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      icon
    </div>
  )
}

export default function Left() {
  const [loadingStatus, setLoadingStatus] = useState<
    'loading' | 'ready' | 'error'
  >('loading')
  const [materialList, setMaterialList] = useState<MaterialType[]>([])

  useEffect(() => {
    getMaterialList()
      .then((res: GetMaterialListResponse) => {
        setMaterialList(res.data)
        setLoadingStatus('ready')
      })
      .catch((_reason) => setLoadingStatus('error'))
  }, [])

  const renderMaterialPanel = () => {
    return materialList.map((material: MaterialType) => {
      if (material.remoteComponent) {
        const { name, desc, schema } = material
        const defaultProps = getDefaultInstance(schema)
        defaultProps.name = name
        console.log(defaultProps.id)
        const Draggable = WithDraggable(
          'RemoteComponent',
          defaultProps
        )(RemoteComponent)
        return (
          <Material desc={desc}>
            <Draggable>
              <MockIcon />
            </Draggable>
          </Material>
        )
      }
      return <div>unknown</div>
    })
  }

  const renderContenr = () => {
    if (loadingStatus === 'loading') {
      return <div>loading</div>
    } else if (loadingStatus === 'error') {
      return <div>加载失败</div>
    } else if (loadingStatus === 'ready') {
      return renderMaterialPanel()
    }
  }

  return (
    <div className='left'>
      <div className='options'>
        <TabPanel />
      </div>
      <div className='component'>{renderContenr()}</div>
    </div>
  )
}
