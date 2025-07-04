import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../../utils/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '@/src/constants/IndividualID_styles/IndividualID_styles';

interface DatosPersonales {
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
  ciudad: string;
}

const IndividualIDComponent = () => {
  const [datosPersonales, setDatosPersonales] = useState<DatosPersonales>({
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
    ciudad: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user, completeOnboarding, skipProfileCompletion } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchDatosPersonales = async () => {
      const datos = await AsyncStorage.getItem('datos_personales');
      const datosPersonales = datos ? JSON.parse(datos) : null;

      if (datosPersonales) {
        setDatosPersonales(datosPersonales);
      }
    };

    fetchDatosPersonales();
  }, []);

  const actualizarDato = (campo: keyof DatosPersonales, valor: string) => {
    setDatosPersonales(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const validarFormulario = (): boolean => {
    const { nombre, apellido, telefono, direccion, ciudad } = datosPersonales;
    
    if (!nombre.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return false;
    }
    
    if (!apellido.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu apellido');
      return false;
    }
    
    if (!telefono.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu teléfono');
      return false;
    }
    
    if (!direccion.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu dirección');
      return false;
    }
    
    if (!ciudad.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu ciudad');
      return false;
    }
    
    return true;
  };

  const handleFinalizar = async () => {
    if (isLoading) return;

    if (!validarFormulario()) return;

    setIsLoading(true);

    try {
      // Verificar que hay un usuario autenticado
      if (!user) {
        Alert.alert('Error', 'No se encontró información del usuario');
        return;
      }

      // Guardar datos personales en AsyncStorage
      await AsyncStorage.setItem('datos_personales', JSON.stringify(datosPersonales));

      console.log('Datos personales del usuario particular:', datosPersonales);

      // Marcar el onboarding como completado
      await completeOnboarding();

      Alert.alert(
        '¡Registro Completado!',
        'Tu perfil de usuario particular ha sido completado exitosamente. Ya puedes comenzar a enviar cargas.',
        [
          {
            text: 'Ir al Panel Principal',
            onPress: () => {
              router.replace('/(Menu)/(tabs)/Inicio');
            }
          }
        ]
      );

    } catch (error) {
      console.error('Error completando registro:', error);
      Alert.alert('Error', 'Ocurrió un error al completar el registro. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOmitir = async () => {
    if (isLoading) return;

    Alert.alert(
      'Omitir completar datos',
      'Podrás completar tu información personal más tarde desde la configuración de tu cuenta.',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Omitir por ahora',
          onPress: async () => {
            setIsLoading(true);
            try {
              // Verificar que hay un usuario autenticado
              if (!user) {
                Alert.alert('Error', 'No se encontró información del usuario');
                return;
              }

              // Marcar el onboarding como completado pero perfil como incompleto
              await skipProfileCompletion();

              // Navegar al panel principal
              router.replace('/(Menu)/(tabs)/Inicio');

            } catch (error) {
              console.error('Error omitiendo registro:', error);
              Alert.alert('Error', 'Ocurrió un error. Intenta nuevamente.');
            } finally {
              setIsLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="account" size={48} color="#FFFFFF" />
          <Text style={styles.title}>Información Personal</Text>
          <Text style={styles.subtitle}>
            Completa tu perfil para comenzar a enviar cargas
          </Text>
        </View>

        <View style={styles.form}>
          {/* Nombre */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu nombre"
              value={datosPersonales.nombre}
              onChangeText={(text) => actualizarDato('nombre', text)}
              editable={!isLoading}
            />
          </View>

          {/* Apellido */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Apellido *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu apellido"
              value={datosPersonales.apellido}
              onChangeText={(text) => actualizarDato('apellido', text)}
              editable={!isLoading}
            />
          </View>

          {/* Teléfono */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono *</Text>
            <TextInput
              style={styles.input}
              placeholder="(123) 456-7890"
              value={datosPersonales.telefono}
              onChangeText={(text) => actualizarDato('telefono', text)}
              keyboardType="phone-pad"
              editable={!isLoading}
            />
          </View>

          {/* Dirección */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dirección *</Text>
            <TextInput
              style={styles.input}
              placeholder="Calle, número, colonia"
              value={datosPersonales.direccion}
              onChangeText={(text) => actualizarDato('direccion', text)}
              multiline={true}
              numberOfLines={2}
              editable={!isLoading}
            />
          </View>

          {/* Ciudad */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ciudad *</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu ciudad"
              value={datosPersonales.ciudad}
              onChangeText={(text) => actualizarDato('ciudad', text)}
              editable={!isLoading}
            />
          </View>

          {/* Botón Finalizar */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleFinalizar}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.buttonText}>Finalizar Registro</Text>
            )}
          </TouchableOpacity>

          {/* Botón Omitir por ahora */}
          <TouchableOpacity
            style={[styles.skipButton, isLoading && styles.buttonDisabled]}
            onPress={handleOmitir}
            disabled={isLoading}
          >
            <Text style={styles.skipButtonText}>Omitir por ahora</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>from mApache</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndividualIDComponent;
