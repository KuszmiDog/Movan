import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Buttonbase from '../HyperLink/Hyperlink';
import HyperLink from '../HyperLink/Hyperlink';
import { router } from 'expo-router';

const LoginForm = ({ onLogin }) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = useCallback(() => {
    // Comentamos temporalmente la validación
    /* if (!mail || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    } */

    // Navegación directa al menú
    router.push('/(Menu)/(tabs)/Inicio');

    // Mantenemos el código original comentado por si lo necesitas después
    /* if (onLogin) {
      onLogin({ mail, password });
    } else {
      Alert.alert('Login', `Usuario: ${mail}`);
    }
    setError(''); */
  }, []);  // Removemos las dependencias ya que no las usamos por ahora

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

      <TouchableOpacity style={styles.EnterButton} onPress={handleLogin}>
        <Text style={styles.bottomText}>Siguiente</Text>
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
