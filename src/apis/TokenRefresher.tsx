import axios from 'axios';
import { useEffect } from 'react';

import { useUserContext } from '../contexts/UserContext';

import { resetAccessToken } from './login';

export default function TokenRefresher() {
	const { setAccessToken } = useUserContext();
	useEffect(() => {
		const interceptor = axios.interceptors.response.use(
			function (response) {
				return response;
			},
			async function (error) {
				const originConfig = error.config;
				if (error.response.status === 401) {
					const responseData = await resetAccessToken();
					const newAccessToken = responseData.accessToken;
					setAccessToken(newAccessToken);
					originConfig.headers['Authorization'] =
						'Bearer ' + responseData.accessToken;
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
