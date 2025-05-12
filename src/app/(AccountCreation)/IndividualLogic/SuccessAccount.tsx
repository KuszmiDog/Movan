import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useRouter } from 'expo-router';

const SuccessAccount = () => {
  const router = useRouter();

  const handleGoToMenu = () => {
    router.push('/(Menu)/MovanMenu'); // Navegar al menú principal
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: verticalScale(20),
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  button: {
    backgroundColor: '#262E93',
    paddingVertical: verticalScale(10),
    paddingHorizontal: verticalScale(50),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10), // Espaciado entre el subtítulo y el botón
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
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SuccessAccount;