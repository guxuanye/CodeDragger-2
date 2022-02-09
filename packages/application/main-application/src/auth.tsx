import React, { useState, createContext, useContext } from 'react'
import { Navigate } from 'react-router-dom'

interface IContextProvider {
  authed: Boolean
  login: Function
  logoutAct: Function
}

const AuthContext = createContext<IContextProvider>({
  authed: false,
  login: () => {},
  logoutAct: () => {}
})

/**
 * 自定义hook，函数返回 Context 值，包括 authed状态、login、logout函数来修改authed状态
 */
function useAuth() {
  const [authed, setAuthed] = useState<Boolean>(false)

  return {
    authed,
    login() {
      return new Promise((res: Function) => {
        setAuthed(true)
        res()
      })
    },
    logoutAct() {
      //setAuthed(false)
      return new Promise(() => {
        setAuthed(false)
      })
    }
  }
}

// 将context值传递给了Context Provider，并返回该组件用于广播context值
export function AuthProvider({ children }: {children: any}) {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// 返回 Context 值
export default function useAuthConsumer() {
  return useContext(AuthContext)
}

/**
 * @description
 * 封装拦截组件,如果已登录，返回包括的children组件；
 * 未登录，返回 <Navigate to="/user" /> 组件跳转到登录页面。
 *
 * @example
 * <RequireAuth>
 *   <ComponentNeedAuth />
 * </RequireAuth>
 */
export function RequireAuth({ children }: {children: any}) {
  const { authed } = useAuthConsumer()
  return authed === true ? children : <Navigate to='/login' replace />
}
