import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import imagePath from '@/src/constants/imagePaths';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    // Lógica para crear la cuenta
    console.log('Crear cuenta con:', { username, email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Creación de Cuenta</Text>

      <Text style={styles.label}>Crea Tu nombre de usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Ingresa un Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Crea tu contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>O crea tu cuenta con</Text>

      <View style={styles.iconContainer}>
      <MaterialCommunityIcons name="facebook" size={50} color="white" />
      <MaterialCommunityIcons name="google" size={50} color="#DB4437" />
      </View>

      <Text style={styles.footerText}>from mApache</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
    alignItems: 'center',
    padding: verticalScale(40),
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  label: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: moderateScale(20),
    marginBottom: verticalScale(5),
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
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    color: 'white',
    fontSize: 16,
    marginVertical: verticalScale(15),
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(20),
  },
  socialIcon: {
    width: 50,
    height: 50,
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    marginTop: verticalScale(160),
    textAlign: 'center',
  },
});

export default CreateAccount;