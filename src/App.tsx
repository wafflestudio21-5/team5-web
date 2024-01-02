import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Explore from './pages/Explore.tsx'
import Home from './pages/Home.tsx'
import Profile from './pages/Profile.tsx'
import Reels from './pages/Reels.tsx'
import Login from './pages/Login/Login.tsx'
import PasswordRecovery from './pages/Login/passwordRecovery/PasswordRecovery.tsx'
import SignIn from './pages/Login/signIn/SignIn.tsx'
import { useUserContext } from './contexts/UserContext.tsx'
import Certification from './pages/Login/passwordRecovery/Certification.tsx'
import NewPassword from './pages/Login/passwordRecovery/NewPassword.tsx'
import MakePassword from './pages/Login/signIn/MakePassword.tsx'
import AskToSave from './pages/Login/signIn/AskToSave.tsx'
import AskBirthday from './pages/Login/signIn/AskBirthday.tsx'
import AskUsername from './pages/Login/signIn/AskUsername.tsx'
import AskEmail from './pages/Login/signIn/AskEmail.tsx'
import CertificationSignIn from './pages/Login/signIn/CertificationSignIn.tsx'
import Agree from './pages/Login/signIn/Agree.tsx'

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

const loginRouter = createBrowserRouter([
  {
    path: '',
    element: <Login />
  },
  {
    path: 'passwordRecovery/',
    element: <PasswordRecovery />,
  },
  {
    path: 'passwordRecovery/certification/',
    element: <Certification />
  },
  {
    path: 'passwordRecovery/newPassword/',
    element: <NewPassword />
  },
  {
    path: 'signIn/',
    element: <SignIn />
  },
  {
    path: 'signIn/password/',
    element: <MakePassword />
  },
  {
    path: 'signIn/askToSave/',
    element: <AskToSave />
  },
  {
    path: 'signIn/askBirthday/',
    element: <AskBirthday />
  },
  {
    path: 'signIn/askUsername/',
    element: <AskUsername />
  },
  {
    path: 'signIn/askEmail/',
    element: <AskEmail />
  },
  {
    path: 'signIn/certification/',
    element: <CertificationSignIn />
  },
  {
    path: 'signIn/agreeToTerm/',
    element: <Agree />
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])

function App() {
  const { isLoggedin } = useUserContext()
  return <RouterProvider router={ isLoggedin ? router : loginRouter } />
}

export default App
