# Sistema de AsyncStorage para Usuarios - Movan

## Descripción
Este sistema implementa el almacenamiento local de usuarios usando AsyncStorage en React Native. Permite registrar usuarios, iniciar sesión, y mantener el estado de autenticación.

## Archivos Principales

### 1. UserService.ts (`src/utils/UserService.ts`)
Servicio principal que maneja todas las operaciones CRUD de usuarios:
- `registerUser()` - Registra un nuevo usuario
- `loginUser()` - Autentica un usuario existente
- `getCurrentUser()` - Obtiene el usuario actualmente logueado
- `logoutUser()` - Cierra la sesión
- `getUsers()` - Obtiene todos los usuarios registrados
- `clearAllUsers()` - Elimina todos los usuarios (útil para desarrollo)

### 2. useAuth.tsx (`src/utils/useAuth.tsx`)
Hook personalizado y contexto de autenticación para React:
- Proporciona estado global de autenticación
- Funciones de login, registro y logout
- Estado de carga y usuario actual

### 3. CreateAccount.tsx (Modificado)
Componente de registro que ahora:
- Valida emails y contraseñas con criterios específicos
- Requiere confirmación de contraseña
- Muestra descripción clara de requisitos de contraseña
- Indicador visual de fortaleza de contraseña en tiempo real
- Guarda usuarios en AsyncStorage
- Muestra estados de carga

### 4. Login.tsx (Modificado)
Componente de login que ahora:
- Autentica contra usuarios almacenados
- Maneja errores de autenticación
- Navega automáticamente al éxito

### 5. UserManagement.tsx (`src/components/atoms/UserManagement.tsx`)
Componente de gestión para ver y administrar usuarios (útil para desarrollo).

## Cómo Usar

### Registro de Usuario
```typescript
import { UserService } from '../utils/UserService';

const handleRegister = async () => {
  const result = await UserService.registerUser(email, password);
  if (result.success) {
    console.log('Usuario registrado:', result.user);
  } else {
    console.log('Error:', result.message);
  }
};
```

### Login de Usuario
```typescript
const handleLogin = async () => {
  const result = await UserService.loginUser(email, password);
  if (result.success) {
    console.log('Login exitoso:', result.user);
  } else {
    console.log('Error:', result.message);
  }
};
```

### Usar el Hook de Autenticación
```typescript
import { useAuth } from '../utils/useAuth';

const MyComponent = () => {
  const { user, isLoggedIn, login, logout } = useAuth();

  if (isLoggedIn) {
    return <Text>Bienvenido {user.email}</Text>;
  }
  
  return <LoginForm />;
};
```

### Configurar el AuthProvider
Para usar el contexto de autenticación, envuelve tu app:

```typescript
import { AuthProvider } from './src/utils/useAuth';

export default function App() {
  return (
    <AuthProvider>
      {/* Tu aplicación */}
    </AuthProvider>
  );
}
```

## Estructura de Datos

### Usuario
```typescript
interface User {
  id: string;
  email: string;
  password: string; // En producción, debería estar hasheada
  createdAt: string;
}
```

## Validaciones Implementadas

### Registro
- ✅ Email no vacío
- ✅ Formato de email válido
- ✅ Contraseña mínimo 6 caracteres
- ✅ Contraseña máximo 50 caracteres
- ✅ Contraseña debe contener letras y números
- ✅ Confirmación de contraseña
- ✅ Email único (no duplicados)
- ✅ Indicador visual de fortaleza de contraseña
- ✅ Descripción clara de requisitos de contraseña

### Login
- ✅ Campos requeridos
- ✅ Email y contraseña coinciden con registro

## Almacenamiento AsyncStorage

### Claves utilizadas:
- `@movan_users` - Array de todos los usuarios registrados
- `@movan_current_user` - Usuario actualmente logueado

## Comandos Útiles para Desarrollo

### Limpiar datos de AsyncStorage
```typescript
import { UserService } from './src/utils/UserService';
await UserService.clearAllUsers();
```

### Ver usuarios registrados
```typescript
const users = await UserService.getUsers();
console.log('Usuarios:', users);
```

### Verificar usuario actual
```typescript
const currentUser = await UserService.getCurrentUser();
console.log('Usuario actual:', currentUser);
```

## Consideraciones de Seguridad

⚠️ **IMPORTANTE**: Esta implementación es para desarrollo/demo:

1. **Contraseñas en texto plano**: En producción, usa bcrypt o similar
2. **Validación básica**: Implementa validaciones más robustas
3. **Datos locales**: AsyncStorage no es seguro para datos sensibles
4. **Sin respaldo**: Los datos se pierden al desinstalar la app

## Próximos Pasos

1. **Hashear contraseñas**: Implementar bcrypt o similar
2. **Validaciones avanzadas**: Email verificación, políticas de contraseña
3. **Sincronización**: Integrar con API backend
4. **Seguridad**: Usar Keychain/Keystore para datos sensibles
5. **Recuperación**: Sistema de recuperación de contraseña

## Testing

Para probar el sistema:
1. Registra un usuario en `CreateAccount`
2. Ve al componente `UserManagement` para ver usuarios registrados
3. Intenta hacer login con las credenciales
4. Verifica que la navegación funcione correctamente
