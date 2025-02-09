import React from 'react'
import Button from '@mui/material/Button'
import './Nav.css'
import { currentAction, logoutAction } from '@/api'

export default class Hello extends React.Component {
  state = {
    username: 'Dragger'
  }
  //登出事件
  logout = () => {
    const fetchData = async () => {
      return await logoutAction()
    }
    const result = fetchData()
    result.then(() => {
      window.location.href = './login'
    })
  }
  //挂载时初始化
  componentDidMount() {
    const fetchInfo = async () => {
      const result = await currentAction()
      this.setState({ username: result.info.username })
    }
    fetchInfo()
  }

  render(): React.ReactNode {
    return (
      <div className='nav-bar'>
        <div className='logo'>
          <img
            width='250px'
            src='https://qckvp9.file.qingfuwucdn.com/file/0a96a0d609bbee22_1644330902648.png'
            alt='lowcode logo'
          />
        </div>
        <ul className='button-list'>
          <li>
            <Button variant='outlined' color='inherit' onClick={this.logout}>
              登出
            </Button>
          </li>
          <li>
            <Button variant='outlined' color='inherit'>
              Hello! {this.state.username}
            </Button>
          </li>
        </ul>
      </div>
    )
  }
}
