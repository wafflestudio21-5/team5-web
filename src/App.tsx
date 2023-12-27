import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Explore from './pages/Explore.tsx'
import Home from './pages/Home.tsx'
import Profile from './pages/Profile.tsx'
import Reels from './pages/Reels.tsx'
import Login from './pages/Login/Login.tsx'
import PasswordRecovery from './pages/Login/PasswordRecovery.tsx'
import SignIn from './pages/Login/SignIn.tsx'

const router = createBrowserRouter([
  {
    path: '',
    element: <Home />
  },
  {
    path: 'explore/',
    element: <Explore />
  },
  {
    path: 'reels/',
    element: <Reels />
  },
  {
    path: ':id/',
    element: <Profile />
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])

const LoginRouter = createBrowserRouter([
  {
    path: '',
    element: <Login />
  },
  {
    path: 'passwordRecovery/',
    element: <PasswordRecovery />
  },
  {
    path: 'facebookLogin/',
    element: <Reels />
  },
  {
    path: 'signIn/',
    element: <SignIn />
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={LoginRouter} />
    </>
  )
}

export default App
