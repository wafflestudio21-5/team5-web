import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { UserProvider } from './contexts/UserContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</AuthProvider>
	</React.StrictMode>
);
