import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Explore from './pages/Explore.tsx'
import Home from './pages/Home.tsx'
import Profile from './pages/Profile.tsx'
import Reels from './pages/Reels.tsx'
import Login from './pages/Login.tsx'

const router = createBrowserRouter([
  {
    path: '',
    element: <Login />
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

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
