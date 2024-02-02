import axios from 'axios';
import { useEffect } from 'react';
import { resetAccessToken } from './login';
import { useUserContext } from '../contexts/UserContext';

export default function TokenRefresher() {
	console.log('in');
	const { setAccessToken } = useUserContext();
	useEffect(() => {
		const interceptor = axios.interceptors.response.use(
			function (response) {
				return response;
			},
			async function (error) {
				if (error.response.status === 401) {
					const responseData = await resetAccessToken();
					setAccessToken(responseData.accessToken);
					return axios(error.config);
				}
			}
		);
		return () => {
			axios.interceptors.response.eject(interceptor);
		};
	}, []);
	return <></>;
}
