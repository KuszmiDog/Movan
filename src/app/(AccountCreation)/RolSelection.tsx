import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const RolSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const router = useRouter();

  const roles = [
    { label: 'Transportista Privado', value: 'private' },
    { label: 'Transporte', value: 'transport' },
    { label: 'Particular', value: 'individual' },
  ];

  const handleNext = () => {
    console.log('Rol seleccionado:', selectedRole);

    // Navegar según el rol seleccionado
    if (selectedRole === 'private') {
      router.push('/(AccountCreation)/IndividualLogic/Individual');
    } else if (selectedRole === 'transport') {
      router.push('/(AccountCreation)/TransportLogic/Transport');
    } else if (selectedRole === 'individual') {
      router.push('/(AccountCreation)/PrivateTransportLogic/PrivateTransport');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué Rol te gustaría adoptar en la aplicación?</Text>

      <View style={styles.optionsContainer}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.value}
            style={styles.option}
            onPress={() => setSelectedRole(role.value)}
          >
            <MaterialCommunityIcons
              name={selectedRole === role.value ? 'radiobox-marked' : 'radiobox-blank'}
              size={24}
              color="white"
            />
            <Text style={styles.optionText}>{role.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, !selectedRole && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={!selectedRole}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>from mApache</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#262E93',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#8A8A8A',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default RolSelection;