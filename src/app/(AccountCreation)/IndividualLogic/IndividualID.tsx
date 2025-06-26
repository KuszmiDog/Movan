import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '@/src/constants/IndividualCamera_styles/IndividualID_styles';

const TransportID = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');

  const handleNext = () => {
    console.log('Datos ingresados:', {
      selectedCountry,
      selectedDocumentType,
      documentNumber,
    });
    router.push('/IndividualLogic/IndividualPhone'); // Navegar a la siguiente pantalla
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.text}>Selecciona tu documento de identificación</Text>
        <Text style={styles.label}>Selecciona el país del documento</Text>
        <Picker
          selectedValue={selectedCountry}
          onValueChange={(itemValue) => setSelectedCountry(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Seleccione un país" value="" />
          <Picker.Item label="Argentina" value="Argentina" />
          <Picker.Item label="Paraguay" value="Paraguay" />
          <Picker.Item label="Colombia" value="Colombia" />
          <Picker.Item label="Perú" value="Perú" />
          <Picker.Item label="Ecuador" value="Ecuador" />
          <Picker.Item label="Uruguay" value="Uruguay" />
          <Picker.Item label="Chile" value="Chile" />
          {/* Agrega más países aquí */}
        </Picker>

        <Text style={styles.label}>Tipo de documento</Text>
        <Picker
          selectedValue={selectedDocumentType}
          onValueChange={(itemValue) => setSelectedDocumentType(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Seleccione un tipo de documento" value="" />
          <Picker.Item label="DNI" value="DNI" />
          <Picker.Item label="Pasaporte" value="Pasaporte" />
          <Picker.Item label="Licencia de conducir" value="Licencia" />
          {/* Agrega más tipos de documentos aquí */}
        </Picker>

        <Text style={styles.label}>Ingrese su número de documento</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de documento"
          value={documentNumber}
          onChangeText={setDocumentNumber}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>from mApache</Text>
      </View>
    </View>
  );
};

export default TransportID;