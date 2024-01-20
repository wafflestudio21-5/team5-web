import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

type trySignUpProps = {
  navigate: (to: string) => void;
  addr: string;
};

export type UserContextData = {
  accessToken: string;
  setAccessToken: (s: string) => void;
  refreshToken: string;
  setRefreshToken: (s: string) => void;
  path: string;
  setPath: (s: string) => void;
  name: string;
  setName: (s: string) => void;
  username: string;
  setUsername: (s: string) => void;
  password: string;
  setPassword: (s: string) => void;
  email: string;
  setEmail: (s: string) => void;
  birthday: Date;
  setBirthday: (d: Date) => void;
  isSaved: boolean;
  setIsSaved: (b: boolean) => void;
  isLoggedin: boolean;
  setIsLoggedin: (b: boolean) => void;
  trySignUp: (props: trySignUpProps) => void;
};

export const UserContext = createContext<UserContextData | null>(null);

type ProviderProps = {
  children: ReactNode;
};
export function UserProvider({ children }: ProviderProps) {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [path, setPath] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [isSaved, setIsSaved] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const trySignUp = async ({ navigate, addr }: trySignUpProps) => {
    try {
      const year = birthday.getFullYear();
      const month = String(birthday.getMonth() + 1).padStart(2, '0');
      const day = String(birthday.getDate()).padStart(2, '0');
      const formatted = `${year}-${month}-${day}`
      const response = await axios.post(
        "https://waffle5gram.shop/api/v1/auth/signup",
        {
          username: username,
          name: name,
          password: password,
          contact: email,
          contactType: "email",
          birthday: formatted
        },
      );
      console.log(response);
      navigate(addr);
    } catch (error) {
      alert("회원가입 실패");
    }
  };
  return (
    <UserContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        path,
        setPath,
        name,
        setName,
        username,
        setUsername,
        password,
        setPassword,
        email,
        setEmail,
        birthday,
        setBirthday,
        isSaved,
        setIsSaved,
        isLoggedin,
        setIsLoggedin,
        trySignUp,
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
