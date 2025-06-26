import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from '@/src/constants/CreateAccount_styles/RolSelection_style';

const roles = [
  {
    value: 'Private',
    label: 'Transportista Privado',
    description: 'Para personas que desean registrar y administrar su propio vehículo privado en la aplicación.',
  },
  {
    value: 'Particular',
    label: 'Particular',
    description: 'Para usuarios que desean utilizar los servicios de transporte como pasajeros.',
  },
];

const RolSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoText, setInfoText] = useState('');
  const router = useRouter();

  const handleNext = () => {2
    console.log('Rol seleccionado:', selectedRole);

    if (selectedRole === 'Private') {
      router.push('/(AccountCreation)/PrivateTransportLogic/PrivateTransID');
      } else if (selectedRole === 'Particular') {
      router.push('/(AccountCreation)/IndividualLogic/IndividualID');
      }
  };

  const showInfo = (description: React.SetStateAction<string>) => {
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

export default RolSelection;