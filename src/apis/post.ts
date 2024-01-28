import axios from 'axios';
import { baseURL } from '../constants';

type TryPostType = {
	content: string;
	hideComments: boolean;
	hideLikes: boolean;
	files: FileList;
	accessToken: string;
};

export const tryPost = async ({
	content,
	hideComments,
	hideLikes,
	files,
	accessToken,
}: TryPostType) => {
	const formData = new FormData();
	formData.append('content', content);
	formData.append('hideComments', '' + hideComments);
	formData.append('hideLikes', '' + hideLikes);
	formData.append('files', files?.[0] as Blob);
	try {
		const response = await axios.post(`${baseURL}/api/v1/posts`, formData, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		alert('포스트 생성 실패');
	}
};
