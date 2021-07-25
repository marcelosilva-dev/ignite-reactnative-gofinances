import React, { ReactNode, useContext } from "react";
import { createContext } from "react";

import * as AuthSession from "expo-auth-session";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  async function signInWithGoogle() {
    try {
      const CLIENT_ID =
        "940734496385-68fkmibujg1j4krfa91i7g89p07ved12.apps.googleusercontent.com";
      const REDIRECT_URI =
        "https://auth.expo.io/@marcelo.silva.1998/gofinances";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });
      console.log(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  const user = {
    id: "01",
    name: "Marcelo",
    email: "marcelo@email.com",
    photo: "dhfgszhgbdhgbh",
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
