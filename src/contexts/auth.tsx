import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import type { FC, ReactNode } from "react";
import type { User } from "~/types/api";

type UserContextType = {
  user: User | null;
  authenticated: boolean;
  setUser: (user: User) => void;
  setAuthenticated: (authenticated: boolean) => void;
};

const AuthContext = createContext<UserContextType>({
  user: null,
  authenticated: false,
  setUser: () => void 0,
  setAuthenticated: () => void 0,
});

export const useAuth = () => useContext(AuthContext);

const getUser = async (
  token: string,
  setAuthenticated: (authenticated: boolean) => void,
  setUser: (user: User | null) => void
) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    setUser(null);
    setAuthenticated(false);
    return;
  }

  const user = (await res.json()) as User;
  setUser(user);
  setAuthenticated(true);
};

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const [cookie] = useCookies(["token"]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!cookie.token) {
      setUser(null);
      setAuthenticated(false);
      return;
    }

    getUser(cookie.token, setAuthenticated, setUser);
  }, []);

  useEffect(() => {
    if (!cookie.token) {
      setUser(null);
      setAuthenticated(false);
      return;
    }

    getUser(cookie.token, setAuthenticated, setUser);
  }, [cookie.token]);

  if (user === undefined) return <p>Loading...</p>;

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        setUser,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
