import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { useUserContext } from './contexts/UserContext.tsx'
import Explore from './pages/Explore.tsx'
import Home from './pages/Home.tsx'
import Profile from './pages/Profile/Profile.tsx'
import Reels from './pages/Reels.tsx'
import Login from './pages/Login/Login.tsx'
import PasswordRecovery from './pages/Login/passwordRecovery/PasswordRecovery.tsx'
import SignUp from './pages/Login/signUp/SignUp.tsx'
import Certification from './pages/Login/passwordRecovery/Certification.tsx'
import NewPassword from './pages/Login/passwordRecovery/NewPassword.tsx'
// import MakePassword from './pages/Login/signIn/MakePassword.tsx'
// import AskToSave from './pages/Login/signIn/AskToSave.tsx'
// import AskBirthday from './pages/Login/signIn/AskBirthday.tsx'
// import MakeUsername from './pages/Login/signIn/MakeUsername.tsx'
// import AskEmail from './pages/Login/signIn/AskEmail.tsx'
// import CertificationSignIn from './pages/Login/signIn/CertificationSignIn.tsx'
// import Agree from './pages/Login/signIn/Agree.tsx'
// import AddPhoto from './pages/Login/signIn/AddPhoto.tsx'
import CertificationSignUp from './pages/Login/signUp/CertificationSignUp.tsx'
import EditProfile from './pages/Profile/EditProfile.tsx'
import Follow from './pages/Profile/Follow.tsx'
import GlobalStyles from './styles/GlobalStyles.tsx'
import { ThemeProvider } from 'styled-components'
import Theme from './styles/Theme.tsx'
import Layout from './components/NavBar/Layout.tsx'

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
		path: 'accounts/edit/',
		element: <EditProfile />,
	},
	{
		path: 'if/follow/',
		element: <Follow />,
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
	// {
	// 	path: 'signUp/password/',
	// 	element: <MakePassword />,
	// },
	// {
	// 	path: 'signUp/save/',
	// 	element: <AskToSave />,
	// },
	// {
	// 	path: 'signUp/birthday/',
	// 	element: <AskBirthday />,
	// },
	// {
	// 	path: 'signUp/username/',
	// 	element: <MakeUsername />,
	// },
	// {
	// 	path: 'signUp/email/',
	// 	element: <AskEmail />,
	// },
	{
		path: 'signUp/certification/',
		element: <CertificationSignUp />,
	},
	// {
	// 	path: 'signUp/agreeToTerm/',
	// 	element: <Agree />,
	// },
	// {
	// 	path: 'signUp/photo/',
	// 	element: <AddPhoto />,
	// },
	{
		path: '*',
		element: <Navigate to="/" />,
	},
])

function App() {
	return (
		<ThemeProvider theme={Theme}>
			<Layout>
				<GlobalStyles />
				<RouterProvider router={router} />
				{/* 개발할 때 login 화면으로 안가려고 주석처리 해놨습니다. */}
				{/*const { isLoggedin } = useUserContext()*/}
				{/*<RouterProvider router={isLoggedin ? router : loginRouter} />*/}
			</Layout>
		</ThemeProvider>
	)
}

export default App
