import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PrivateTransport = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Registro para Transportista Privado</Text>
      {/* Aquí puedes agregar los campos específicos para este rol */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#565EB3',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PrivateTransport;