import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import styles from '@/src/constants/Opciones_styles/Opciones_style'; 

const Opciones = () => {
  type ValidRoutes = 
    | '/(Menu)/(Ajustes)/Notifications'
    | '/(Menu)/(Ajustes)/Privacy'
    | '/(Menu)/(Ajustes)/Help'
    | '/(Menu)/(Ajustes)/Terms'
    | '/(auth)/AccountLogin';

  const handleNavigation = (screen: ValidRoutes): void => {
    console.log(`Navegando a: ${screen}`);
    router.push(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      
      <View style={styles.menuContainer}>
        {/* Notificaciones */}
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => handleNavigation('/(Menu)/(Ajustes)/Notifications')}
        >
          <Text style={styles.menuButtonText}>Notificaciones</Text>
        </TouchableOpacity>

        {/* Privacidad y Seguridad */}
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => handleNavigation('/(Menu)/(Ajustes)/Privacy')}
        >
          <Text style={styles.menuButtonText}>Privacidad y Seguridad</Text>
        </TouchableOpacity>

        {/* Ayuda y Soporte */}
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => handleNavigation('/(Menu)/(Ajustes)/Help')}
        >
          <Text style={styles.menuButtonText}>Ayuda y Soporte</Text>
        </TouchableOpacity>

        {/* Términos y Condiciones */}
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => handleNavigation('/(Menu)/(Ajustes)/Terms')}
        >
          <Text style={styles.menuButtonText}>Términos y Condiciones</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  );
};

export default Opciones;