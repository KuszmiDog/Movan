import React, { useState } from 'react';
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
  const { user, completeOnboarding } = useAuth();
  const router = useRouter();

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

      // Aquí podrías guardar los datos adicionales del usuario particular
      // Por ahora simplemente mostraremos un mensaje de éxito
      
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
              // Navegar al panel principal del usuario particular
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
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>from mApache</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
  },
  header: {
    alignItems: 'center',
    paddingTop: verticalScale(40),
    paddingHorizontal: moderateScale(20),
    marginBottom: verticalScale(30),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: verticalScale(16),
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: moderateScale(22),
  },
  form: {
    paddingHorizontal: moderateScale(20),
  },
  inputGroup: {
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: moderateScale(16),
    color: '#FFFFFF',
    marginBottom: verticalScale(8),
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(16),
    color: '#333333',
  },
  button: {
    backgroundColor: '#262E93',
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
  },
  buttonDisabled: {
    backgroundColor: '#8A8FB0',
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: verticalScale(30),
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: moderateScale(14),
  },
});

export default IndividualIDComponent;
