
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface User {
  full_name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const safeJSONParse = (item: string | null) => {
  if (item === null) return null;
  try {
    return JSON.parse(item);
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(safeJSONParse(localStorage.getItem('user')));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token]);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = async () => {
    try {
      await fetch('https://app.arcaccra.com/apis/accounts/logout/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
      });
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
