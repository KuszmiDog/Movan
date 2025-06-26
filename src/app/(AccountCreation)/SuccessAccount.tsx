import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '@/src/constants/CreateAccount_styles/SuccessAccount_styles';

const SuccessAccount = () => {
  const router = useRouter();

  const handleGoToMenu = () => {
    router.push('/(Menu)/(tabs)/Inicio'); // Navegar al menú principal
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>¡Cuenta creada con éxito!</Text>
        <Text style={styles.subtitle}>Tu cuenta ha sido creada correctamente.</Text>
        <TouchableOpacity style={styles.button} onPress={handleGoToMenu}>
          <Text style={styles.buttonText}>Ir al Menú</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>from mApache</Text>
      </View>
    </View>
  );
};

export default SuccessAccount;