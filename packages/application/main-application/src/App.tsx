import React, { Suspense } from 'react'
import { FC } from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
// import RemoteComponent from '@cdl-pkg/remote-component'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import Workspace from './components/Workspace/index'
import Landing from './components/Landing/index'
import Nomatch from './components/Nomatch/index'
import { AuthProvider, RequireAuth } from './auth'

const DarggerEditor = React.lazy(() => import('@cdl-pkg/dragger-editor'))

// const items = [
//   'https://static.zhongan.com/website/health/zarm/images/banners/1.png',
//   'https://static.zhongan.com/website/health/zarm/images/banners/2.png',
//   'https://static.zhongan.com/website/health/zarm/images/banners/3.png'
// ]

const Test = () => {
  return (
    <div>
      {/* <RemoteComponent name='61ff40f0ec3be24090be5e91' items={items} />
      <RemoteComponent name='61ff47c9ec3be24090c025a5' images={items} />
      <RemoteComponent name='61ff4a88ec3be24090c0d056' /> */}
      {/* <RemoteComponent
        name='62011592ec3be240902f635a'
        shapes={'radius'}
        buttonText='Hello!'
      >
        1
      </RemoteComponent> */}
      {/*<RemoteComponent name='62011592ec3be240902f635a' images={items} /> *!/*/}
      {/*<RemoteComponent name='61ff4a88ec3be24090c0d056' buttonText='1' />*/}
    </div>
  )
}

const isLogin = true
const routes = [
  { name: 'main', path: '/', component: <Landing />, key: 'landing' },
  { name: 'login', path: '/login', component: <SignIn />, key: 'login' },
  { name: 'register', path: '/register', component: <SignUp />, key: 'regis' },
  {
    name: 'workspace',
    path: '/workspace',
    access: isLogin,
    component: <Workspace />,
    key: 'workspace'
  },
  {
    name: 'lowcode',
    path: '/editor/:id',
    access: isLogin,
    component: <DarggerEditor />,
    key: 'lowcode'
  },
  {
    name: 'test',
    path: '/test',
    component: <Test />,
    key: 'test'
  }
]

const App: FC = () => {
  return (
    <div className='main'>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <AuthProvider>
            <Routes>
              {routes.slice(3, routes.length).map((item) => (
                <Route
                  path={item.path}
                  element={<RequireAuth>{item.component}</RequireAuth>}
                  key={item.key}
                />
              ))}
              <Route path='/' element={<Landing />}></Route>
              <Route path='/login' element={<SignIn />}></Route>
              <Route path='/resigter' element={<SignUp />}></Route>
              <Route path='*' element={<Nomatch />}></Route>
            </Routes>
          </AuthProvider>
        </Router>
      </Suspense>
    </div>
  )
}

export default App
