import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserService } from './UserService';

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role?: 'Private' | 'Particular';
  isOnboardingComplete?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: any) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  reloadUser: () => Promise<void>;
  debugAuthState?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar sesión al iniciar la app
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      setIsLoading(true);
      
      // Verificar si hay una sesión activa
      const sessionData = await AsyncStorage.getItem('@auth_session');
      console.log('🔍 Session data:', sessionData);
      
      if (sessionData) {
        const { userId, timestamp } = JSON.parse(sessionData);
        console.log('👤 User ID from session:', userId);
        
        // Verificar si la sesión no ha expirado (30 días)
        const now = new Date().getTime();
        const sessionAge = now - timestamp;
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        
        if (sessionAge < thirtyDays) {
          // Sesión válida, obtener datos del usuario
          console.log('⏰ Sesión válida, obteniendo datos del usuario...');
          const currentUser = await UserService.getCurrentUser();
          console.log('👤 Current user loaded from UserService:', currentUser);
          
          if (currentUser) {
            console.log('✅ Estableciendo usuario en contexto:', currentUser);
            setUser(currentUser);
            setIsAuthenticated(true);
            console.log('✅ User authenticated:', currentUser.email, 'Role:', currentUser.role);
          } else {
            console.log('❌ User not found, clearing session');
            // Usuario no encontrado, limpiar sesión
            await clearSession();
          }
        } else {
          console.log('⏰ Session expired, clearing');
          // Sesión expirada
          await clearSession();
        }
      } else {
        console.log('🚫 No session found');
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      await clearSession();
    } finally {
      setIsLoading(false);
    }
  };

  const createSession = async (userId: string) => {
    try {
      const sessionData = {
        userId,
        timestamp: new Date().getTime()
      };
      
      await AsyncStorage.setItem('@auth_session', JSON.stringify(sessionData));
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const clearSession = async () => {
    try {
      await AsyncStorage.removeItem('@auth_session');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const result = await UserService.login(email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
        await createSession(result.user.id);
        
        return { success: true, message: 'Inicio de sesión exitoso' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Error al iniciar sesión' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setIsLoading(true);
      
      const result = await UserService.register(userData);
      
      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
        await createSession(result.user.id);
        
        return { success: true, message: 'Registro exitoso' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'Error al registrar usuario' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await clearSession();
      // También limpiar otros datos si es necesario
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        
        // Actualizar en UserService también
        await UserService.updateUser(user.id, userData);
      }
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const reloadUser = async () => {
    try {
      const currentUser = await UserService.getCurrentUser();
      console.log('🔄 Reloading user:', currentUser);
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Reload user error:', error);
    }
  };

  // Función de debug para verificar estado completo
  const debugAuthState = async () => {
    try {
      console.log('🐛 === DEBUG AUTH STATE ===');
      console.log('Usuario en estado:', user);
      console.log('isAuthenticated:', isAuthenticated);
      console.log('isLoading:', isLoading);
      
      // Verificar storage directo
      const sessionData = await AsyncStorage.getItem('@auth_session');
      console.log('Session storage:', sessionData);
      
      const currentUserData = await AsyncStorage.getItem('@movan_current_user');
      console.log('Current user storage:', currentUserData);
      
      const usersData = await AsyncStorage.getItem('@movan_users');
      console.log('Users storage:', usersData);
      
      // Intentar obtener usuario actual
      const currentUser = await UserService.getCurrentUser();
      console.log('getCurrentUser result:', currentUser);
      
      console.log('🐛 === END DEBUG ===');
    } catch (error) {
      console.error('Error en debug:', error);
    }
  };

  const completeOnboarding = async () => {
    try {
      if (user) {
        const updatedUser = { ...user, isOnboardingComplete: true };
        setUser(updatedUser);
        
        // Actualizar en UserService
        await UserService.updateUser(user.id, { isOnboardingComplete: true });
      }
    } catch (error) {
      console.error('Complete onboarding error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    completeOnboarding,
    reloadUser,
    debugAuthState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;