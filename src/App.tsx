import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import NavBar from './components/NavBar.tsx';
import { useUserContext } from './contexts/UserContext.tsx';
import AddText from './pages/AddPost/AddText.tsx';
import UploadPhoto from './pages/AddPost/UploadPhoto.tsx';
import EditPost from './pages/EditPost/EditPost.tsx';
import DetailExplore from './pages/Explore/DetailExplore.tsx';
import Explore from './pages/Explore/Explore.tsx';
import ExploreFeed from './pages/Explore/ExploreFeed.tsx';
import Notification from './pages/Feed/Notification.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login/Login.tsx';
import AddPhoto from './pages/Login/signUp/AddPhoto.tsx';
import Agree from './pages/Login/signUp/Agree.tsx';
import AskBirthday from './pages/Login/signUp/AskBirthday.tsx';
import AskEmail from './pages/Login/signUp/AskEmail.tsx';
import AskPhone from './pages/Login/signUp/AskPhone.tsx';
import AskToSave from './pages/Login/signUp/AskToSave.tsx';
import CertificationSignUp from './pages/Login/signUp/CertificationSignUp.tsx';
import MakePassword from './pages/Login/signUp/MakePassword.tsx';
import MakeUsername from './pages/Login/signUp/MakeUsername.tsx';
import SignUp from './pages/Login/signUp/SignUp.tsx';
import AskBirthdaySocial from './pages/Login/socialLogin/AskBirthdaySocial.tsx';
import MakeUsernameSocial from './pages/Login/socialLogin/MakeUsernameSocial.tsx';
import ChangePassword from './pages/Profile/ChangePassword.tsx';
import Bio from './pages/Profile/Edit/Bio.tsx';
import Edit from './pages/Profile/Edit/Edit.tsx';
import Gender from './pages/Profile/Edit/Gender.tsx';
import Link from './pages/Profile/Edit/Link/Link.tsx';
import LinkDetail from './pages/Profile/Edit/Link/LinkDetail.tsx';
import Name from './pages/Profile/Edit/Name.tsx';
import Username from './pages/Profile/Edit/Username.tsx';
import Follow from './pages/Profile/Follow.tsx';
import Profile from './pages/Profile/Profile.tsx';
import Saved from './pages/Profile/Saved.tsx';
import SavedFeed from './pages/Profile/SavedFeed.tsx';
import UserFeed from './pages/Profile/UserFeed.tsx';
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
				path: 'notification/',
				element: <Notification />,
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
				path: 'explore/:category/',
				element: <DetailExplore />,
			},
			{
				path: 'explore/:category/:id',
				element: <ExploreFeed />,
			},
			{
				path: 'addPost/',
				element: <UploadPhoto />,
			},
			{
				path: 'addText/',
				element: <AddText />,
			},
			{
				path: ':id/',
				element: <Profile />,
			},
			{
				path: ':id/feed/',
				element: <UserFeed />,
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
				path: ':id/saved/feed',
				element: <SavedFeed />,
			},
			{
				path: 'account/edit/',
				element: <Edit />,
			},
			{
				path: 'account/edit/username/',
				element: <Username />,
			},
			{
				path: 'account/edit/name/',
				element: <Name />,
			},
			{
				path: 'account/edit/bio/',
				element: <Bio />,
			},
			{
				path: 'account/edit/link/',
				element: <Link />,
			},
			{
				path: 'account/edit/link/:linkParam/',
				element: <LinkDetail />,
			},
			{
				path: 'account/edit/gender/',
				element: <Gender />,
			},
			{
				path: 'account/changePassword/',
				element: <ChangePassword />,
			},
			{ path: 'post/edit/:id/', element: <EditPost /> },
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
		path: 'signUp/username2/',
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
		element: <Agree />,
	},
	{
		path: 'signUp/photo/',
		element: <AddPhoto />,
	},
	{
		path: 'signUp/username/',
		element: <MakeUsernameSocial />,
	},
	{
		path: 'signUp/birthdaySocial/',
		element: <AskBirthdaySocial />,
	},
	{
		path: '*',
		element: <Navigate to="/" />,
	},
]);

export default function App() {
	const { isLoggedIn } = useUserContext();

	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyles />
			<RouterProvider router={isLoggedIn ? router : loginRouter} />
		</ThemeProvider>
	);
}
