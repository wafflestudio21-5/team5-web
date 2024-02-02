import axios from 'axios';
import { useEffect } from 'react';
import { resetAccessToken } from './login';

export default function TokenRefresher() {
	console.log('in');

	useEffect(() => {
		const interceptor = axios.interceptors.response.use(
			function (response) {
				return response;
			},
			async function (error) {
				const originConfig = error.config;
				if (error.response.status === 401) {
					const responseData = await resetAccessToken();
					localStorage.setItem('accessToken', responseData.accessToken);
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
