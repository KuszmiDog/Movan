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
import { Picker } from '@react-native-picker/picker';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserService } from '../../../utils/UserService';
import { TransportistaService, DatosVehiculo } from '../../../utils/TransportistaService';

// Opciones para el tipo de carga
const tiposCarga = [
  { label: 'Selecciona el tipo de carga', value: '' },
  { label: 'Carga General', value: 'general' },
  { label: 'Refrigerada', value: 'refrigerada' },
  { label: 'Peligrosa', value: 'peligrosa' },
  { label: 'Líquidos', value: 'liquidos' },
  { label: 'Materiales de Construcción', value: 'construccion' },
  { label: 'Muebles/Mudanzas', value: 'muebles' },
  { label: 'Productos Frágiles', value: 'fragiles' },
  { label: 'Granos/Productos Agrícolas', value: 'agricolas' },
];

interface DatosVehiculoForm {
  marca: string;
  modelo: string;
  año: string;
  placa: string;
  tipoCarga: string;
  capacidadToneladas: string;
  dimensiones: {
    largo: string;
    ancho: string;
    alto: string;
  };
}

const DatosCamionComponent = () => {
  const [datosVehiculo, setDatosVehiculo] = useState<DatosVehiculoForm>({
    marca: '',
    modelo: '',
    año: '',
    placa: '',
    tipoCarga: '',
    capacidadToneladas: '',
    dimensiones: {
      largo: '',
      ancho: '',
      alto: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const actualizarDato = (campo: keyof DatosVehiculoForm, valor: string) => {
    setDatosVehiculo(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const actualizarDimension = (dimension: keyof DatosVehiculoForm['dimensiones'], valor: string) => {
    setDatosVehiculo(prev => ({
      ...prev,
      dimensiones: {
        ...prev.dimensiones,
        [dimension]: valor
      }
    }));
  };

  const validarFormulario = (): boolean => {
    const { marca, modelo, año, placa, tipoCarga, capacidadToneladas } = datosVehiculo;
    
    if (!marca.trim()) {
      Alert.alert('Error', 'Por favor ingresa la marca del vehículo');
      return false;
    }
    
    if (!modelo.trim()) {
      Alert.alert('Error', 'Por favor ingresa el modelo del vehículo');
      return false;
    }
    
    if (!año.trim()) {
      Alert.alert('Error', 'Por favor ingresa el año del vehículo');
      return false;
    }
    
    const añoNum = parseInt(año);
    if (isNaN(añoNum) || añoNum < 1990 || añoNum > new Date().getFullYear() + 1) {
      Alert.alert('Error', 'Por favor ingresa un año válido (1990 - presente)');
      return false;
    }
    
    if (!placa.trim()) {
      Alert.alert('Error', 'Por favor ingresa la placa del vehículo');
      return false;
    }
    
    if (!tipoCarga) {
      Alert.alert('Error', 'Por favor selecciona el tipo de carga');
      return false;
    }
    
    if (!capacidadToneladas.trim()) {
      Alert.alert('Error', 'Por favor ingresa la capacidad de carga');
      return false;
    }
    
    const capacidad = parseFloat(capacidadToneladas);
    if (isNaN(capacidad) || capacidad <= 0) {
      Alert.alert('Error', 'Por favor ingresa una capacidad válida');
      return false;
    }
    
    return true;
  };

  const handleContinuar = async () => {
    if (isLoading) return;
    
    if (!validarFormulario()) return;
    
    setIsLoading(true);
    
    try {
      // Obtener el usuario actual
      const currentUser = await UserService.getCurrentUser();
      
      if (!currentUser) {
        Alert.alert('Error', 'No se encontró información del usuario');
        return;
      }

      // Convertir los datos al formato del servicio
      const datosVehiculoParaGuardar: DatosVehiculo = {
        marca: datosVehiculo.marca,
        modelo: datosVehiculo.modelo,
        año: datosVehiculo.año,
        placa: datosVehiculo.placa,
        tipoCarga: datosVehiculo.tipoCarga,
        capacidadToneladas: datosVehiculo.capacidadToneladas,
        dimensiones: datosVehiculo.dimensiones
      };

      // Guardar los datos del vehículo
      const result = await TransportistaService.guardarDatosVehiculo(currentUser.id, datosVehiculoParaGuardar);
      
      if (result.success) {
        console.log('Datos del camión guardados:', datosVehiculoParaGuardar);
        
        Alert.alert(
          'Datos Guardados',
          'Información del vehículo registrada correctamente. Ahora ingresa tus datos de licencia de conducir.',
          [
            {
              text: 'Continuar',
              onPress: () => {
                // Navegar a la vista de datos de licencia  
                router.push('/(AccountCreation)/PrivateTransportLogic/DatosLicencia' as any);
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', result.message);
      }
      
    } catch (error) {
      console.error('Error guardando datos del camión:', error);
      Alert.alert('Error', 'Ocurrió un error al guardar los datos. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="truck" size={48} color="#FFFFFF" />
          <Text style={styles.title}>Datos del Vehículo</Text>
          <Text style={styles.subtitle}>
            Ingresa la información de tu camión para completar tu perfil de transportista
          </Text>
        </View>

        <View style={styles.form}>
          {/* Marca */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Marca del Vehículo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Volvo, Scania, Mercedes-Benz"
              value={datosVehiculo.marca}
              onChangeText={(text) => actualizarDato('marca', text)}
              editable={!isLoading}
            />
          </View>

          {/* Modelo */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Modelo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: FH16, R450, Actros"
              value={datosVehiculo.modelo}
              onChangeText={(text) => actualizarDato('modelo', text)}
              editable={!isLoading}
            />
          </View>

          {/* Año y Placa en fila */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Año *</Text>
              <TextInput
                style={styles.input}
                placeholder="2020"
                value={datosVehiculo.año}
                onChangeText={(text) => actualizarDato('año', text)}
                keyboardType="numeric"
                maxLength={4}
                editable={!isLoading}
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Placa *</Text>
              <TextInput
                style={styles.input}
                placeholder="ABC-123"
                value={datosVehiculo.placa}
                onChangeText={(text) => actualizarDato('placa', text.toUpperCase())}
                autoCapitalize="characters"
                editable={!isLoading}
              />
            </View>
          </View>

          {/* Tipo de Carga */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Carga Especializada *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={datosVehiculo.tipoCarga}
                onValueChange={(value) => actualizarDato('tipoCarga', value)}
                style={styles.picker}
                enabled={!isLoading}
              >
                {tiposCarga.map((tipo) => (
                  <Picker.Item 
                    key={tipo.value} 
                    label={tipo.label} 
                    value={tipo.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Capacidad de Carga */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Capacidad de Carga (Toneladas) *</Text>
            <TextInput
              style={styles.input}
              placeholder="5.5"
              value={datosVehiculo.capacidadToneladas}
              onChangeText={(text) => actualizarDato('capacidadToneladas', text)}
              keyboardType="decimal-pad"
              editable={!isLoading}
            />
          </View>

          {/* Dimensiones del área de carga */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dimensiones del área de carga (metros)</Text>
            <Text style={styles.subLabel}>Opcional - Ayuda a los clientes a saber si su carga cabe</Text>
            
            <View style={styles.dimensionesRow}>
              <View style={styles.dimensionInput}>
                <Text style={styles.dimensionLabel}>Largo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="6.0"
                  value={datosVehiculo.dimensiones.largo}
                  onChangeText={(text) => actualizarDimension('largo', text)}
                  keyboardType="decimal-pad"
                  editable={!isLoading}
                />
              </View>

              <View style={styles.dimensionInput}>
                <Text style={styles.dimensionLabel}>Ancho</Text>
                <TextInput
                  style={styles.input}
                  placeholder="2.5"
                  value={datosVehiculo.dimensiones.ancho}
                  onChangeText={(text) => actualizarDimension('ancho', text)}
                  keyboardType="decimal-pad"
                  editable={!isLoading}
                />
              </View>

              <View style={styles.dimensionInput}>
                <Text style={styles.dimensionLabel}>Alto</Text>
                <TextInput
                  style={styles.input}
                  placeholder="2.8"
                  value={datosVehiculo.dimensiones.alto}
                  onChangeText={(text) => actualizarDimension('alto', text)}
                  keyboardType="decimal-pad"
                  editable={!isLoading}
                />
              </View>
            </View>
          </View>

          {/* Botón Continuar */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleContinuar}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.buttonText}>Continuar</Text>
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
  dimensionesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dimensionInput: {
    width: '31%',
  },
  dimensionLabel: {
    fontSize: moderateScale(14),
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: verticalScale(4),
    textAlign: 'center',
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

export default DatosCamionComponent;
