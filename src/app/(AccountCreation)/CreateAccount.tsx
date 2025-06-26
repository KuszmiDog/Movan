import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '@/src/constants/CreateAccount_styles/CreateAccount_styles';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  const handleCreateAccount = () => {
    
    console.log('Crear cuenta con:', { email, password });
    router.push('/(AccountCreation)/RolSelection'); 

  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
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

      <View style={styles.accountcreation}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="facebook" size={50} color="white" />
          <MaterialCommunityIcons name="google" size={50} color="white" />
          <MaterialCommunityIcons name="instagram" size={50} color="white" />
        </View>
      </View>
        <View style={styles.footer}>
            <Text style={styles.footerText}>from mApache</Text>
          </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateAccount;