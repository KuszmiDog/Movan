import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: string;
}

const USERS_KEY = '@movan_users';
const CURRENT_USER_KEY = '@movan_current_user';

export class UserService {
  // Obtener todos los usuarios registrados
  static async getUsers(): Promise<User[]> {
    try {
      const usersData = await AsyncStorage.getItem(USERS_KEY);
      return usersData ? JSON.parse(usersData) : [];
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      return [];
    }
  }

  // Registrar un nuevo usuario
  static async registerUser(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      // Validar que los campos no estén vacíos
      if (!email || !password) {
        return { success: false, message: 'Email y contraseña son requeridos' };
      }

      // Validar formato de email básico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, message: 'Formato de email inválido' };
      }

      // Validaciones de contraseña más específicas
      if (password.length < 6) {
        return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' };
      }

      if (password.length > 50) {
        return { success: false, message: 'La contraseña no puede tener más de 50 caracteres' };
      }

      // Validar que contenga al menos una letra y un número (opcional pero recomendado)
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      
      if (!hasLetter || !hasNumber) {
        return { 
          success: false, 
          message: 'Para mayor seguridad, incluye al menos una letra y un número en tu contraseña' 
        };
      }

      const users = await this.getUsers();
      
      // Verificar si el usuario ya existe
      const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        return { success: false, message: 'Ya existe una cuenta con este email' };
      }

      // Crear nuevo usuario
      const newUser: User = {
        id: Date.now().toString(),
        email: email.toLowerCase(),
        password, // En producción, deberías hashear la contraseña
        createdAt: new Date().toISOString(),
      };

      // Agregar el nuevo usuario a la lista
      users.push(newUser);
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

      return { 
        success: true, 
        message: 'Usuario registrado exitosamente',
        user: newUser 
      };
    } catch (error) {
      console.error('Error registrando usuario:', error);
      return { success: false, message: 'Error interno del servidor' };
    }
  }

  // Iniciar sesión
  static async loginUser(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const users = await this.getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      
      if (user) {
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        return { success: true, message: 'Inicio de sesión exitoso', user };
      } else {
        return { success: false, message: 'Email o contraseña incorrectos' };
      }
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      return { success: false, message: 'Error interno del servidor' };
    }
  }

  // Obtener usuario actual
  static async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(CURRENT_USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      return null;
    }
  }

  // Cerrar sesión
  static async logoutUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  }

  // Verificar si el usuario está logueado
  static async isUserLoggedIn(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return user !== null;
    } catch (error) {
      console.error('Error verificando estado de sesión:', error);
      return false;
    }
  }

  // Eliminar todos los usuarios (útil para desarrollo/testing)
  static async clearAllUsers(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USERS_KEY);
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
      console.error('Error limpiando usuarios:', error);
    }
  }
}
