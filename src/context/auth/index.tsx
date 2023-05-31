import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthContextType {
  token: any,
  signin: (token: any) => void;
  signout: () => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<any>(null);

  const signin = (newToken: any) => {
    setToken(newToken);
  };

  const signout = () => {
    setToken(null);
  };

  const value = { token, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export { AuthProvider, RequireAuth, useAuth };
