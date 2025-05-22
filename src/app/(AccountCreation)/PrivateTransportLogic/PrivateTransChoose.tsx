import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { verticalScale } from 'react-native-size-matters';


const PrivateTransChoose = () => {
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoText, setInfoText] = useState('');
  const router = useRouter();

  const owners = [
    { label: 'Vehiculo Propio', value: 'own_truck', description: 'Un Vehiculo propio, adquirido por el transportista privado de manera completa, NO perteneciente a una flota de camiones.' },
    { label: 'Vehiculo de Flota', value: 'ship_truck', description: 'Un Vehiculo de flota se trata de uno perteneciente a un Transporte, el cual solo es utilizado por usted pero no es de su propiedad.' },
  ];

  const handleNext = () => {
    console.log('Rol seleccionado:', selectedOwner);

    if (selectedOwner === 'own_truck') {
      router.push('/(AccountCreation)/PrivateTransportLogic/PTC_OwnOptions');
      } else if (selectedOwner === 'ship_truck') {
      router.push('/(AccountCreation)/PrivateTransportLogic/PTC_ShipTruck');
    }
  };

  const showInfo = (description) => {
    setInfoText(description);
    setInfoVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>A que propietario corresponde el vehiculo que usaras?</Text>

      <View style={styles.optionsContainer}>
        {owners.map((owner) => (
          <View key={owner.value} style={styles.option}>
            <TouchableOpacity onPress={() => setSelectedOwner(owner.value)} style={styles.roleContainer}>
              <MaterialCommunityIcons
                name={selectedOwner === owner.value ? 'radiobox-marked' : 'radiobox-blank'}
                size={24}
                color="white"
              />
              <Text style={styles.optionText}>{owner.label}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showInfo(owner.description)}>
              <MaterialCommunityIcons name="information-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, !selectedOwner && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={!selectedOwner}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
          <Text style={styles.footerText}>from mApache</Text>
      </View>

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
  footer: {
    bottom: 14,
    justifyContent: 'center',
    alignItems: 'center',
    top: 250,
        },
  footerText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
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
});

export default PrivateTransChoose;