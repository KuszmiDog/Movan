import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const Transport = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const handleCreateAccount = () => {
    // Lógica para crear la cuenta
    console.log('Crear cuenta con:', { username, password });
    router.push('/IndividualLogic/IndividualID'); // Navegar a IndividualID

  };


  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.text}>¡Agrega datos para confirmar {'\n'} tu identidad!</Text>
        <Text style={styles.label}>Ingresa tu correo para registrarte</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Ingresa una contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          keyboardType="default"
          secureTextEntry
        />

        <Text style={styles.label}>Repite tu contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Repetir contraseña"
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          keyboardType="default"
          secureTextEntry
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>from mApache</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#565EB3',
  },
  input: {
    width: moderateScale(300),
    backgroundColor: 'white',
    borderRadius: moderateScale(5),
    padding: verticalScale(10),
    marginBottom: verticalScale(15),
    fontSize: 16,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start', // Cambiar de 'center' a 'flex-start'
    alignItems: 'center',
    backgroundColor: '#565EB3',
    paddingTop: verticalScale(50), // Agregar espacio desde la parte superior
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#565EB3',
  },
  text: {
    color: 'white',
    fontSize: 26,
    textShadowColor: 'black',
    textShadowOffset: { width: 3, height: 4 },
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(30),
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
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: moderateScale(20),
    marginBottom: verticalScale(5),
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    marginTop: verticalScale(160),
    textAlign: 'center',
  },
});

export default Transport;