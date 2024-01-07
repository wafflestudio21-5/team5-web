import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Explore from './pages/Explore.tsx'
import Home from './pages/Home.tsx'
import Profile from './pages/Profile.tsx'
import Reels from './pages/Reels.tsx'
import Login from './pages/Login/Login.tsx'
import PasswordRecovery from './pages/Login/passwordRecovery/PasswordRecovery.tsx'
import SignUp from './pages/Login/signUp/SignUp.tsx'
import { useUserContext } from './contexts/UserContext.tsx'
import Certification from './pages/Login/passwordRecovery/Certification.tsx'
import NewPassword from './pages/Login/passwordRecovery/NewPassword.tsx'
import MakePassword from './pages/Login/signUp/MakePassword.tsx'
import AskToSave from './pages/Login/signUp/AskToSave.tsx'
import AskBirthday from './pages/Login/signUp/AskBirthday.tsx'
import MakeUsername from './pages/Login/signUp/MakeUsername.tsx'
import AskEmail from './pages/Login/signUp/AskEmail.tsx'
import CertificationSignUp from './pages/Login/signUp/CertificationSignUp.tsx'
import Agree from './pages/Login/signUp/Agree.tsx'
import AddPhoto from './pages/Login/signUp/AddPhoto.tsx'

const router = createBrowserRouter([
	{
		path: '',
		element: <Home />,
	},
	{
		path: 'explore/',
		element: <Explore />,
	},
	{
		path: 'reels/',
		element: <Reels />,
	},
	{
		path: ':id/',
		element: <Profile />,
	},
	{
		path: '*',
		element: <Navigate to="/" />,
	},
])

const loginRouter = createBrowserRouter([
	{
		path: '',
		element: <Login />,
	},
	{
		path: 'passwordRecovery/',
		element: <PasswordRecovery />,
	},
	{
		path: 'passwordRecovery/certification/',
		element: <Certification />,
	},
	{
		path: 'passwordRecovery/newPassword/',
		element: <NewPassword />,
	},
	{
		path: 'signUp/',
		element: <SignUp />,
	},
	{
		path: 'signUp/password/',
		element: <MakePassword />,
	},
	{
		path: 'signUp/save/',
		element: <AskToSave />,
	},
	{
		path: 'signUp/birthday/',
		element: <AskBirthday />,
	},
	{
		path: 'signUp/username/',
		element: <MakeUsername />,
	},
	{
		path: 'signUp/email/',
		element: <AskEmail />,
	},
	{
		path: 'signUp/certification/',
		element: <CertificationSignUp />,
	},
	{
		path: 'signUp/agreeToTerm/',
		element: <Agree />,
	},
	{
		path: 'signUp/photo/',
		element: <AddPhoto />,
	},
	{
		path: '*',
		element: <Navigate to="/" />,
	},
])

function App() {
	const { isLoggedin } = useUserContext()
	return <RouterProvider router={isLoggedin ? router : loginRouter} />
}

export default App
