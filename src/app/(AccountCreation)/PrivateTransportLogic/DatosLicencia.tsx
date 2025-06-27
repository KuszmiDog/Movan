import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../../utils/AuthContext';
import { TransportistaService, DatosLicencia as DatosLicenciaInterface } from '../../../utils/TransportistaService';

// Tipos de licencia
const tiposLicencia = [
  { label: 'Selecciona el tipo de licencia', value: '' },
  { label: 'Licencia Clase B (Particular)', value: 'B' },
  { label: 'Licencia Clase C (Profesional)', value: 'C' },
  { label: 'Licencia Clase D (Transporte Público)', value: 'D' },
  { label: 'Licencia Clase E (Especial)', value: 'E' },
];

interface DatosLicencia {
  numeroLicencia: string;
  tipoLicencia: string;
  fechaVencimiento: string;
  fechaEmision: string;
  autoridad: string;
  restricciones: string;
  fotoLicencia?: string;
}

const DatosLicenciaComponent = () => {
  const [datosLicencia, setDatosLicencia] = useState<DatosLicencia>({
    numeroLicencia: '',
    tipoLicencia: '',
    fechaVencimiento: '',
    fechaEmision: '',
    autoridad: '',
    restricciones: '',
    fotoLicencia: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user, completeOnboarding } = useAuth();
  const router = useRouter();

  const actualizarDato = (campo: keyof DatosLicencia, valor: string) => {
    setDatosLicencia(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const validarFecha = (fecha: string): boolean => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(fecha)) return false;
    
    const [dia, mes, año] = fecha.split('/').map(Number);
    const fechaObj = new Date(año, mes - 1, dia);
    
    return fechaObj.getDate() === dia && 
           fechaObj.getMonth() === mes - 1 && 
           fechaObj.getFullYear() === año;
  };

  const validarFormulario = (): boolean => {
    const { numeroLicencia, tipoLicencia, fechaVencimiento, fechaEmision, autoridad } = datosLicencia;
    
    if (!numeroLicencia.trim()) {
      Alert.alert('Error', 'Por favor ingresa el número de licencia');
      return false;
    }
    
    if (!tipoLicencia) {
      Alert.alert('Error', 'Por favor selecciona el tipo de licencia');
      return false;
    }
    
    if (!fechaEmision.trim()) {
      Alert.alert('Error', 'Por favor ingresa la fecha de emisión');
      return false;
    }
    
    if (!validarFecha(fechaEmision)) {
      Alert.alert('Error', 'Por favor ingresa una fecha de emisión válida (DD/MM/AAAA)');
      return false;
    }
    
    if (!fechaVencimiento.trim()) {
      Alert.alert('Error', 'Por favor ingresa la fecha de vencimiento');
      return false;
    }
    
    if (!validarFecha(fechaVencimiento)) {
      Alert.alert('Error', 'Por favor ingresa una fecha de vencimiento válida (DD/MM/AAAA)');
      return false;
    }
    
    // Validar que la fecha de vencimiento sea posterior a la fecha actual
    const hoy = new Date();
    const [dia, mes, año] = fechaVencimiento.split('/').map(Number);
    const fechaVenc = new Date(año, mes - 1, dia);
    
    if (fechaVenc <= hoy) {
      Alert.alert('Error', 'La licencia debe estar vigente (fecha de vencimiento futura)');
      return false;
    }
    
    if (!autoridad.trim()) {
      Alert.alert('Error', 'Por favor ingresa la autoridad emisora');
      return false;
    }
    
    return true;
  };

  const formatearFecha = (texto: string, campo: keyof DatosLicencia) => {
    // Eliminar caracteres no numéricos
    const numeros = texto.replace(/\D/g, '');
    
    // Formatear como DD/MM/AAAA
    let fechaFormateada = numeros;
    if (numeros.length >= 3) {
      fechaFormateada = `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
    }
    if (numeros.length >= 5) {
      fechaFormateada = `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`;
    }
    
    actualizarDato(campo, fechaFormateada);
  };

  const seleccionarImagen = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permisos necesarios',
          'Necesitamos acceso a tu galería para subir la foto de la licencia.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        actualizarDato('fotoLicencia', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error seleccionando imagen:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
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

      // Convertir los datos al formato del servicio
      const datosLicenciaParaGuardar: DatosLicenciaInterface = {
        numeroLicencia: datosLicencia.numeroLicencia,
        tipoLicencia: datosLicencia.tipoLicencia,
        fechaVencimiento: datosLicencia.fechaVencimiento,
        fechaEmision: datosLicencia.fechaEmision,
        autoridad: datosLicencia.autoridad,
        restricciones: datosLicencia.restricciones,
        fotoLicencia: datosLicencia.fotoLicencia
      };

      // Guardar los datos de la licencia
      const result = await TransportistaService.guardarDatosLicencia(user.id, datosLicenciaParaGuardar);
      
      if (result.success) {
        console.log('Datos de licencia guardados:', datosLicenciaParaGuardar);
        
        // Marcar el onboarding como completado
        await completeOnboarding();
        
        Alert.alert(
          '¡Registro Completado!',
          'Tu perfil de transportista ha sido completado exitosamente. Ya puedes comenzar a recibir solicitudes de carga.',
          [
            {
              text: 'Ir al Panel Principal',
              onPress: () => {
                // Navegar al panel principal del transportista
                router.replace('/(Menu)/(tabs)/Inicio');
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', result.message);
      }
      
    } catch (error) {
      console.error('Error guardando datos de licencia:', error);
      Alert.alert('Error', 'Ocurrió un error al guardar los datos. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="card-account-details" size={48} color="#FFFFFF" />
          <Text style={styles.title}>Licencia de Conducir</Text>
          <Text style={styles.subtitle}>
            Ingresa los datos de tu licencia para verificar tu habilitación profesional
          </Text>
        </View>

        <View style={styles.form}>
          {/* Número de Licencia */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número de Licencia *</Text>
            <TextInput
              style={styles.input}
              placeholder="123456789"
              value={datosLicencia.numeroLicencia}
              onChangeText={(text) => actualizarDato('numeroLicencia', text)}
              editable={!isLoading}
            />
          </View>

          {/* Tipo de Licencia */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Licencia *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={datosLicencia.tipoLicencia}
                onValueChange={(value) => actualizarDato('tipoLicencia', value)}
                style={styles.picker}
                enabled={!isLoading}
              >
                {tiposLicencia.map((tipo) => (
                  <Picker.Item 
                    key={tipo.value} 
                    label={tipo.label} 
                    value={tipo.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Fechas en fila */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Fecha de Emisión *</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                value={datosLicencia.fechaEmision}
                onChangeText={(text) => formatearFecha(text, 'fechaEmision')}
                keyboardType="numeric"
                maxLength={10}
                editable={!isLoading}
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Fecha de Vencimiento *</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                value={datosLicencia.fechaVencimiento}
                onChangeText={(text) => formatearFecha(text, 'fechaVencimiento')}
                keyboardType="numeric"
                maxLength={10}
                editable={!isLoading}
              />
            </View>
          </View>

          {/* Autoridad Emisora */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Autoridad Emisora *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Municipalidad de Lima, SUTRAN, etc."
              value={datosLicencia.autoridad}
              onChangeText={(text) => actualizarDato('autoridad', text)}
              editable={!isLoading}
            />
          </View>

          {/* Restricciones */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Restricciones</Text>
            <Text style={styles.subLabel}>
              Indica si tienes alguna restricción (ej: lentes, audífono, etc.)
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ninguna o especifica las restricciones..."
              value={datosLicencia.restricciones}
              onChangeText={(text) => actualizarDato('restricciones', text)}
              multiline
              numberOfLines={3}
              editable={!isLoading}
            />
          </View>

          {/* Foto de Licencia */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Foto de la Licencia</Text>
            <Text style={styles.subLabel}>
              Opcional: Sube una foto clara de tu licencia para verificación
            </Text>
            
            <TouchableOpacity
              style={styles.imageButton}
              onPress={seleccionarImagen}
              disabled={isLoading}
            >
              {datosLicencia.fotoLicencia ? (
                <View style={styles.imagePreview}>
                  <Image 
                    source={{ uri: datosLicencia.fotoLicencia }} 
                    style={styles.imagePreviewImg}
                  />
                  <Text style={styles.imageButtonText}>Cambiar Foto</Text>
                </View>
              ) : (
                <View style={styles.imageButtonContent}>
                  <MaterialCommunityIcons name="camera-plus" size={32} color="#666" />
                  <Text style={styles.imageButtonText}>Seleccionar Foto</Text>
                </View>
              )}
            </TouchableOpacity>
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
  subLabel: {
    fontSize: moderateScale(14),
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: verticalScale(12),
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(16),
    color: '#333333',
  },
  textArea: {
    height: verticalScale(80),
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  picker: {
    color: '#333333',
  },
  imageButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(8),
    padding: moderateScale(20),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  imageButtonContent: {
    alignItems: 'center',
  },
  imageButtonText: {
    fontSize: moderateScale(16),
    color: '#666',
    marginTop: verticalScale(8),
  },
  imagePreview: {
    alignItems: 'center',
  },
  imagePreviewImg: {
    width: moderateScale(120),
    height: moderateScale(80),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(8),
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

export default DatosLicenciaComponent;
