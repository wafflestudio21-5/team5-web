import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import NavBar from './components/NavBar.tsx';
import { useUserContext } from './contexts/UserContext.tsx';
import Explore from './pages/Explore.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login/Login.tsx';
import Certification from './pages/Login/passwordRecovery/Certification.tsx';
import NewPassword from './pages/Login/passwordRecovery/NewPassword.tsx';
import PasswordRecovery from './pages/Login/passwordRecovery/PasswordRecovery.tsx';
import AddPhoto from './pages/Login/signUp/AddPhoto.tsx';
import Agree from './pages/Login/signUp/Agree.tsx';
import AskBirthday from './pages/Login/signUp/AskBirthday.tsx';
import AskEmail from './pages/Login/signUp/AskEmail.tsx';
import AskToSave from './pages/Login/signUp/AskToSave.tsx';
import CertificationSignUp from './pages/Login/signUp/CertificationSignUp.tsx';
import MakePassword from './pages/Login/signUp/MakePassword.tsx';
import MakeUsername from './pages/Login/signUp/MakeUsername.tsx';
import SignUp from './pages/Login/signUp/SignUp.tsx';
import EditProfile from './pages/Profile/EditProfile.tsx';
import Follow from './pages/Profile/Follow.tsx';
import Profile from './pages/Profile/Profile.tsx';
import Reels from './pages/Reels.tsx';
import GlobalStyles from './styles/GlobalStyles.tsx';
import Theme from './styles/Theme.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <NavBar />,
		children: [
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
				path: ':id/edit/',
				element: <EditProfile />,
			},
			{
				path: ':id/followers/',
				element: <Follow />,
			},
			{
				path: ':id/following/',
				element: <Follow />,
			},
			{
				path: '*',
				element: <Navigate to="" />,
			},
		],
	},
]);

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
]);

function App() {
	const { isLoggedin } = useUserContext();
	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyles />
			<RouterProvider router={router}>
				{/* const { isLoggedin } = useUserContext() */}
				{/*<RouterProvider router={isLoggedin ? router : loginRouter} />*/}
			</RouterProvider>
		</ThemeProvider>
	);
}

export default App;
