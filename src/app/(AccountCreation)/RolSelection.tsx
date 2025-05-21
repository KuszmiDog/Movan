import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { verticalScale } from 'react-native-size-matters';

const RolSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoText, setInfoText] = useState('');
  const router = useRouter();

  const roles = [
    { label: 'Transportista Privado', value: 'private', description: 'Un transportista privado realiza envíos de manera independiente.' },
    { label: 'Transporte', value: 'transport', description: 'Un transporte es una empresa que ofrece servicios de envío.' },
    { label: 'Particular', value: 'individual', description: 'Un particular utiliza la aplicación para envíos personales.' },
  ];

  const handleNext = () => {
    console.log('Rol seleccionado:', selectedRole);

    if (selectedRole === 'private') {
      router.push('/(AccountCreation)/PrivateTransportLogic/PrivateTransID');
      } else if (selectedRole === 'transport') {
      router.push('/(AccountCreation)/TransportLogic/TransportID');
    } else if (selectedRole === 'individual') {
      router.push('/(AccountCreation)/IndividualLogic/IndividualID');
      }
  };

  const showInfo = (description) => {
    setInfoText(description);
    setInfoVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué Rol te gustaría adoptar en la aplicación?</Text>

      <View style={styles.optionsContainer}>
        {roles.map((role) => (
          <View key={role.value} style={styles.option}>
            <TouchableOpacity onPress={() => setSelectedRole(role.value)} style={styles.roleContainer}>
              <MaterialCommunityIcons
                name={selectedRole === role.value ? 'radiobox-marked' : 'radiobox-blank'}
                size={24}
                color="white"
              />
              <Text style={styles.optionText}>{role.label}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showInfo(role.description)}>
              <MaterialCommunityIcons name="information-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, !selectedRole && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={!selectedRole}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>from mApache</Text>
      </View>
      {/* Modal para mostrar información */}
      <Modal
        visible={infoVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setInfoVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{infoText}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setInfoVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#262E93',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  footer: {
    bottom: 14,
    justifyContent: 'center',
    alignItems: 'center',
    top: 230,
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  }
});

export default RolSelection;