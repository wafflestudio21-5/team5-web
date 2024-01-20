import axios from 'axios';

import { baseURL } from '../constants.ts';
import { UserType } from '../types.ts';

export const getUserInformation = async (
	username: string
): Promise<UserType | undefined> => {
	try {
		const response = await axios.get<UserType>(
			`${baseURL}/api/v1/account/${username}`
		);
		return response.data;
	} catch {
		alert('유저 정보를 불러오는데 실패했습니다.');
	}
};
