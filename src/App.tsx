import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import NavBar from './components/NavBar.tsx';
import { useAuthContext } from './contexts/AuthContext.tsx';
import Explore from './pages/Explore/Explore.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login/Login.tsx';
import Certification from './pages/Login/passwordRecovery/Certification.tsx';
import NewPassword from './pages/Login/passwordRecovery/NewPassword.tsx';
import PasswordRecovery from './pages/Login/passwordRecovery/PasswordRecovery.tsx';
import AddPhoto from './pages/Login/signUp/AddPhoto.tsx';
// import Agree from './pages/Login/signUp/Agree.tsx';
import AskBirthday from './pages/Login/signUp/AskBirthday.tsx';
import AskEmail from './pages/Login/signUp/AskEmail.tsx';
import AskPhone from './pages/Login/signUp/AskPhone.tsx';
import AskToSave from './pages/Login/signUp/AskToSave.tsx';
import CertificationSignUp from './pages/Login/signUp/CertificationSignUp.tsx';
import MakePassword from './pages/Login/signUp/MakePassword.tsx';
import MakeUsername from './pages/Login/signUp/MakeUsername.tsx';
import SignUp from './pages/Login/signUp/SignUp.tsx';
import Edit from './pages/Profile/Edit/Edit.tsx';
import Follow from './pages/Profile/Follow.tsx';
import Profile from './pages/Profile/Profile.tsx';
import Saved from './pages/Profile/Saved.tsx';
import Search from './pages/Search.tsx';
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
				path: 'search/',
				element: <Search />,
			},
			{
				path: 'explore/',
				element: <Explore />,
			},
			{
				path: ':id/',
				element: <Profile />,
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
				path: ':id/saved/',
				element: <Saved />,
			},
			{
				path: 'account/edit/',
				element: <Edit />,
			},
			{
				path: 'account/edit/username/',
			},
			{
				path: 'account/edit/name/',
			},
			{
				path: 'account/edit/bio/',
			},
			{
				path: 'account/edit/link/',
			},
			{
				path: 'account/edit/gender/',
			},
			{
				path: '*',
				element: <Navigate to="" />, // 이상한 url이 home이 아닌 profile로 가는 원인 모를 현상이 있음. useparams 도입 후 고칠 것
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
		path: 'signUp/phone/',
		element: <AskPhone />,
	},
	{
		path: 'signUp/certification/',
		element: <CertificationSignUp />,
	},
	{
		path: 'signUp/agreeToTerm/',
		// element: <Agree />,
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

export default function App() {
	const { isLoggedin } = useAuthContext();
	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyles />
			{/*<RouterProvider router={router}>*/}
			{/* const { isLoggedin } = useUserContext() */}
			<RouterProvider router={isLoggedin ? router : loginRouter} />
			{/* </RouterProvider> */}
		</ThemeProvider>
	);
}
