import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type AuthUser = {
  email: string;
};

type AuthContextType = {
  user: AuthUser | null;
  login: (token: string) => void
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

   // 🔁 Rehydrate on app load / refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser({ email: decoded.sub });
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded: any = jwtDecode(token);
    setUser({ email: decoded.sub }); // 🔥 THIS triggers Navbar update
    localStorage.setItem("email", decoded.sub)
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)!;
}
