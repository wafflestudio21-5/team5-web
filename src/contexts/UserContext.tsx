/* import axios from "axios";
 */import { createContext, ReactNode, useContext, useState } from "react";

export type UserContextData = {
  accessToken: string;
  setAccessToken: (s: string) => void;
  refreshToken: string;
  setRefreshToken: (s: string) => void;
  name: string;
  setName: (s: string) => void;
  username: string;
  setUsername: (s: string) => void;
};

export const UserContext = createContext<UserContextData | null>(null);

type ProviderProps = {
  children: ReactNode;
};
export function UserProvider({ children }: ProviderProps) {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  return (
    <UserContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        name,
        setName,
        username,
        setUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
