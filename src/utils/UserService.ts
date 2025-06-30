import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  role?: 'Private' | 'Particular';
  isOnboardingComplete?: boolean;
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
      //OBTENER MAIL
      await AsyncStorage.setItem('mail', email.toLowerCase());
      

      // Agregar el nuevo usuario a la lista
      users.push(newUser);
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

      // Establecer como usuario actual
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

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
        // Guardar el mail también al iniciar sesión
        await AsyncStorage.setItem('mail', user.email);
        return { success: true, message: 'Inicio de sesión exitoso', user };
      } else {
        return { success: false, message: 'Email o contraseña incorrectos' };
      }
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      return { success: false, message: 'Error interno del servidor' };
    }
  }

  // Método de login
  static async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const users = await this.getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        return { success: false, message: 'Usuario no encontrado' };
      }
      
      if (user.password !== password) {
        return { success: false, message: 'Contraseña incorrecta' };
      }
      
      // Establecer como usuario actual
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      
      return { success: true, message: 'Inicio de sesión exitoso', user };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, message: 'Error al iniciar sesión' };
    }
  }

  // Método de registro
  static async register(userData: { email: string; password: string; name?: string }): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const result = await this.registerUser(userData.email, userData.password);
      
      if (result.success && result.user) {
        // Actualizar con datos adicionales si se proporcionan
        if (userData.name) {
          const updatedUser = { ...result.user, name: userData.name };
          await this.updateUser(result.user.id, { name: userData.name });
          result.user = updatedUser;
        }
        
        // Establecer como usuario actual
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(result.user));
      }
      
      return result;
    } catch (error) {
      console.error('Error en register:', error);
      return { success: false, message: 'Error al registrar usuario' };
    }
  }

  // Actualizar datos del usuario
  static async updateUser(userId: string, updateData: Partial<User>): Promise<{ success: boolean; message: string }> {
    try {
      const users = await this.getUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        return { success: false, message: 'Usuario no encontrado' };
      }
      
      // Actualizar los datos del usuario
      users[userIndex] = { ...users[userIndex], ...updateData };
      
      // Guardar la lista actualizada
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Si es el usuario actual, actualizar también el current user
      const currentUser = await this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[userIndex]));
      }
      
      return { success: true, message: 'Usuario actualizado correctamente' };
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      return { success: false, message: 'Error actualizando usuario' };
    }
  }

  // Actualizar rol del usuario
  static async updateUserRole(userId: string, role: 'Private' | 'Particular'): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      // Obtener usuarios existentes
      const users = await this.getUsers();
      
      // Encontrar y actualizar el usuario
      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex === -1) {
        return { success: false, message: 'Usuario no encontrado' };
      }

      // Actualizar el rol
      users[userIndex].role = role;

      // Guardar la lista actualizada
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

      // Actualizar usuario actual si es el mismo
      const currentUser = await this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        const updatedCurrentUser = { ...currentUser, role };
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedCurrentUser));
      }

      return { 
        success: true, 
        message: 'Rol actualizado exitosamente',
        user: users[userIndex]
      };

    } catch (error) {
      console.error('Error actualizando rol:', error);
      return { success: false, message: 'Error actualizando el rol' };
    }
  }

  // Obtener usuario actual
  // Obtener usuario actual por ID
  static async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(CURRENT_USER_KEY);
      if (userData) {
        const user = JSON.parse(userData);
        // Obtener datos actualizados del usuario desde la lista de usuarios
        const users = await this.getUsers();
        const currentUser = users.find(u => u.id === user.id);
        return currentUser || user; // Fallback al usuario guardado si no se encuentra en la lista
      }
      return null;
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

  static async changePassword(email: string, oldPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      const users = await this.getUsers();
      const idx = users.findIndex(u => u.email === email && u.password === oldPassword);
      if (idx === -1) {
        return { success: false, message: 'Contraseña actual incorrecta' };
      }
      users[idx].password = newPassword;
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      return { success: true, message: 'Contraseña actualizada' };
    } catch (error) {
      return { success: false, message: 'Error al cambiar la contraseña' };
    }
  }
}
