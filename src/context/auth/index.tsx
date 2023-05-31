import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface UserInfo {
  id: number;
  nickName: string;
}

interface AuthContextType {
  user: any;
  signin: (user: UserInfo, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: UserInfo) => {
    setUser(newUser);
  };

  let signout = () => {
    setUser(null);
  };

  let value = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export { AuthProvider, RequireAuth };
