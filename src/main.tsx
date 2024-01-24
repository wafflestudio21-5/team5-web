import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UserProvider } from './contexts/UserContext.tsx'
import { PostProvider } from './contexts/PostContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<UserProvider>
			<PostProvider>
				<App />
			</PostProvider>
		</UserProvider>
	</React.StrictMode>
)
