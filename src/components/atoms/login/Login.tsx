import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Buttonbase from '../HyperLink/Hyperlink';
import HyperLink from '../HyperLink/Hyperlink';
import { router } from 'expo-router';
import { UserService } from '../../../utils/UserService';

const LoginForm = ({ onLogin }: { onLogin?: (credentials: { mail: string; password: string }) => void }) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    if (isLoading) return;

    // Validaciones básicas
    if (!mail || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Intentar hacer login usando AsyncStorage
      const result = await UserService.loginUser(mail, password);
      
      if (result.success) {
        Alert.alert(
          'Éxito',
          'Inicio de sesión exitoso',
          [
            {
              text: 'Continuar',
              onPress: () => {
                console.log('Usuario logueado:', result.user);
                router.push('/(Menu)/(tabs)/Inicio');
              }
            }
          ]
        );
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Ocurrió un error inesperado. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  }, [mail, password, isLoading]);

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa tu cuenta</Text>

      <Text style={styles.formtext}>Ingresa Correo electronico </Text>
      <TextInput
        placeholder="Correo electronico"
        style={styles.input}
        value={mail}
        onChangeText={setMail}
        autoCapitalize="none"
      />
      <Text style={styles.formtext}>Ingresa Contraseña </Text>
      <TextInput  
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity 
        style={[styles.EnterButton, isLoading && styles.EnterButtonDisabled]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={styles.bottomText}>Siguiente</Text>
        )}
      </TouchableOpacity>

      <View style={styles.ContainerTextBelow}>

        <Text style={styles.TextBelow}> No tienes cuenta? </Text>

        <HyperLink tittle={"Crea tu cuenta!"} navigateTo='(AccountCreation)/CreateAccount'/>

        <Text style={styles.TextBelow}> No puedes ingresar? </Text>

        <HyperLink tittle={"Recupera tu cuenta"} navigateTo='(AccountCreation)/CreateAccount'/>
        
      </View>
      
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    top: 190,
    flex: 1,
    padding: 20,
    backgroundColor: '#565EB3',
    gap:10
  },
  title: {
    bottom: 30,
    fontSize: 35,
    textShadowRadius: 10,
    color: "white",
    fontWeight: "600",
    textAlign: 'center',
  },
  formtext:{
    fontSize: 16,
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: moderateScale(20),
    marginBottom: verticalScale(5),
    right: 20,
  },

  EnterButton:{
    backgroundColor: "#262E93",
    paddingVertical: verticalScale(10),
    paddingHorizontal: verticalScale(50),
    borderRadius: moderateScale(5),
    alignItems: "center",
    justifyContent: "center",
    top: 15,
    alignSelf: "center", 
    minWidth: 220, 
  },

  EnterButtonDisabled: {
    backgroundColor: '#8A8FB0',
    opacity: 0.7,
  },

  bottomText:{
    fontFamily: "Roboto",
    color: "white",
    fontSize: 22
  },

  input: {
    fontSize: 17,
    height: 44,
    borderColor: '#ccc',
    backgroundColor: '#ffff',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  ContainerTextBelow: {
    alignSelf: "center",
    top: 40,
    gap: 10
  
  },

  TextBelow:{
    alignSelf: "center",
    color: "white",
    top: 10,
    fontSize: 20,
    fontWeight: 600,
  },

  TextBelowLink:{
    alignSelf: "center",
    color: "yellow",
    fontSize: 20,
    fontWeight: 800,
    fontStyle: "normal"
  },

  error: {
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
});
