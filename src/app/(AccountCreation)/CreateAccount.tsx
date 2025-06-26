import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserService } from '../../utils/UserService';


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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#565EB3' 
  },
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
    alignItems: 'center',
    padding: verticalScale(40),
    paddingTop: verticalScale(140), // Espacio superior en lugar de top
    justifyContent: 'space-between', // Distribuye el espacio entre contenido y footer
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: moderateScale(20),
    marginBottom: verticalScale(5),
  },
  passwordDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    alignSelf: 'flex-start',
    marginLeft: moderateScale(20),
    marginBottom: verticalScale(8),
    fontStyle: 'italic',
  },
  passwordStrengthContainer: {
    width: '90%',
    marginBottom: verticalScale(10),
    alignItems: 'flex-start',
    paddingLeft: moderateScale(20),
  },
  passwordStrengthBar: {
    height: 3,
    width: '30%',
    borderRadius: 2,
    marginBottom: verticalScale(5),
  },
  passwordStrengthText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: moderateScale(5),
    padding: verticalScale(10),
    marginBottom: verticalScale(15),
    fontSize: 16,
  },
  button: {
    backgroundColor: '#262E93',
    paddingVertical: verticalScale(10),
    paddingHorizontal: verticalScale(50),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  buttonDisabled: {
    backgroundColor: '#8A8FB0',
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
    paddingBottom: verticalScale(20),
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  
});

export default CreateAccount;