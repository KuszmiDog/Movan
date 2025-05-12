import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const MovanMenu = () => {
  const handleNavigation = (screen) => {
    console.log(`Navegando a: ${screen}`);
    // Aquí puedes agregar la lógica de navegación, por ejemplo:
    // router.push(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido al Menú!</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={() => handleNavigation('/Profile')}>
          <Text style={styles.menuButtonText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => handleNavigation('/Settings')}>
          <Text style={styles.menuButtonText}>Configuración</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => handleNavigation('/Help')}>
          <Text style={styles.menuButtonText}>Ayuda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => handleNavigation('/Logout')}>
          <Text style={styles.menuButtonText}>Cerrar Sesión</Text>
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
});

export default MovanMenu;