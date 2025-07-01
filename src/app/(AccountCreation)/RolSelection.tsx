import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../utils/AuthContext';
import styles from '@/src/constants/CreateAccount_styles/RolSelection_style';

const roles = [
  {
    value: 'Private' as const,
    label: 'Transportista Privado',
    description: 'Para personas que desean registrar y administrar su propio vehículo privado en la aplicación.',
  },
  {
    value: 'Particular' as const,
    label: 'Particular',
    description: 'Para usuarios que desean utilizar los servicios para enviar cargas.',
  },
];

const RolSelection = () => {
  const [selectedRole, setSelectedRole] = useState<'Private' | 'Particular' | null>(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoText, setInfoText] = useState('');
  const { updateUser, user, isLoading } = useAuth();
  const router = useRouter();

  const handleNext = async () => {
    if (!selectedRole || isLoading) return;

    try {
      // Verificar que hay un usuario autenticado
      if (!user) {
        Alert.alert('Error', 'No se encontró información del usuario. Por favor, inicia sesión nuevamente.');
        router.push('/(AccountCreation)/CreateAccount');
        return;
      }

      // Actualizar el rol del usuario usando el contexto
      await updateUser({ role: selectedRole });

      console.log('Rol seleccionado y guardado:', selectedRole);
      
      // Mostrar mensaje de éxito
      Alert.alert(
        'Éxito',
        `Rol "${selectedRole === 'Private' ? 'Transportista Privado' : 'Particular'}" seleccionado correctamente`,
        [
          {
            text: 'Continuar',
            onPress: () => {
              if (selectedRole === 'Private') {
                router.push('/(AccountCreation)/PrivateTransportLogic/DatosCamion');
              } else if (selectedRole === 'Particular') {
                router.push('/(AccountCreation)/IndividualLogic/IndividualID');
              }
            }
          }
        ]
      );

    } catch (error) {
      console.error('Error guardando rol:', error);
      Alert.alert('Error', 'Ocurrió un error inesperado. Intenta nuevamente.');
    }
  };

  const showInfo = (description: string) => {
    setInfoText(description);
    setInfoVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué Rol te gustaría adoptar en la aplicación?</Text>

      <View style={styles.optionsContainer}>
        {roles.map((role) => (
          <View key={role.value} style={styles.option}>
            <TouchableOpacity 
              onPress={() => setSelectedRole(role.value)} 
              style={styles.roleContainer}
              disabled={isLoading}
            >
              <MaterialCommunityIcons
                name={selectedRole === role.value ? 'radiobox-marked' : 'radiobox-blank'}
                size={24}
                color="white"
              />
              <Text style={styles.optionText}>{role.label}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => showInfo(role.description)}
              disabled={isLoading}
            >
              <MaterialCommunityIcons name="information-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.button, 
          (!selectedRole || isLoading) && styles.buttonDisabled
        ]}
        onPress={handleNext}
        disabled={!selectedRole || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={styles.buttonText}>Siguiente</Text>
        )}
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