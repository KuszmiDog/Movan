import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserService } from '../../utils/UserService';
import styles from '@/src/constants/CreateAccount_styles/CreateAccount_styles'; // Importa tus estilos


const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Hook para manejar la navegación

  // Función para evaluar la fortaleza de la contraseña
  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return { strength: 'none', color: 'transparent', text: '' };
    if (pwd.length < 6) return { strength: 'weak', color: '#FF6B6B', text: 'Muy débil' };
    
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    
    if (pwd.length >= 8 && hasLetter && hasNumber && hasSpecial) {
      return { strength: 'strong', color: '#4CAF50', text: 'Fuerte' };
    } else if (pwd.length >= 6 && hasLetter && hasNumber) {
      return { strength: 'medium', color: '#FFA726', text: 'Buena' };
    } else {
      return { strength: 'weak', color: '#FF6B6B', text: 'Débil' };
    }
  };

  const passwordStrength = getPasswordStrength(password);


  const handleCreateAccount = async () => {
    if (isLoading) return;

    // Validaciones básicas
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);

    try {
      // Registrar usuario usando AsyncStorage
      const result = await UserService.registerUser(email, password);
      
      if (result.success) {
        Alert.alert(
          'Éxito', 
          'Cuenta creada exitosamente',
          [
            {
              text: 'Continuar',
              onPress: () => {
                console.log('Usuario registrado:', result.user);
                router.push('/(AccountCreation)/RolSelection'); // Navegar a RolSelection
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error creando cuenta:', error);
      Alert.alert('Error', 'Ocurrió un error inesperado. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Creación de Cuenta</Text>

          <Text style={styles.label}>Ingresa un Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Crea tu contraseña</Text>
          <Text style={styles.passwordDescription}>
            • Mínimo 6 caracteres{'\n'}
            • Combina letras y números{'\n'}
            • Usa símbolos especiales para mayor seguridad
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          {password.length > 0 && (
            <View style={styles.passwordStrengthContainer}>
              <View style={[styles.passwordStrengthBar, { backgroundColor: passwordStrength.color }]} />
              <Text style={[styles.passwordStrengthText, { color: passwordStrength.color }]}>
                {passwordStrength.text}
              </Text>
            </View>
          )}

          <Text style={styles.label}>Confirma tu contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={handleCreateAccount}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.buttonText}>Siguiente</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>from mApache</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CreateAccount;