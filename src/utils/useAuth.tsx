import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { UserService, User } from './UserService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const currentUser = await UserService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error verificando estado de autenticación:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await UserService.loginUser(email, password);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, message: 'Error interno del servidor' };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const result = await UserService.registerUser(email, password);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, message: 'Error interno del servidor' };
    }
  };

  const logout = async () => {
    try {
      await UserService.logoutUser();
      setUser(null);
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isLoggedIn: user !== null,
    login,
    register,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Hook para verificar si el usuario está autenticado
export const useRequireAuth = () => {
  const { user, isLoading } = useAuth();
  
  return {
    user,
    isLoading,
    isAuthenticated: user !== null,
  };
};
