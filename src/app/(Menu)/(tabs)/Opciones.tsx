import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: verticalScale(20),
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(30),
  },
  menuContainer: {
    width: '100%',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: '#262E93',
    width: '80%',
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    marginBottom: verticalScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF4B4B', // Color rojo para el botón de cerrar sesión
    marginTop: verticalScale(20), // Espacio adicional arriba del botón
  },
});

export default Opciones;