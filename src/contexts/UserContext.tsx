import { createContext, ReactNode } from 'react'

export type UserContextData = {}

export const UserContext = createContext<UserContextData | null>(null)

type ProviderProps = {
	children: ReactNode
}
export function UserProvider({ children }: ProviderProps) {
	return <UserContext.Provider value={{}}>{children}</UserContext.Provider>
}
