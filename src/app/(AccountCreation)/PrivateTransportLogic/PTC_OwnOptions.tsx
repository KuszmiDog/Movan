import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const PTC_OwnOptions = () => {
  const [Model, setModel] = useState('');
  const [Branch, setBranch] = useState('');
  const [Year, setYear] = useState('');

  const handleNext = () => {
    console.log('Datos ingresados:', {
        Model,
        Branch,
        Year,
    });
    router.push('/SuccessAccount'); // Navegar a Success
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.text}>Completa con la informacion de tu vehiculo</Text>
        <Text style={styles.label}>Marca</Text>
        <Picker
          selectedValue={Model}
          onValueChange={(itemValue) => setModel(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Seleccione Marca..." value="" />
          <Picker.Item label="Volvo" value="Volvo" />
          <Picker.Item label="Iveco" value="Iveco" />
          <Picker.Item label="Scania" value="Scania" />
          <Picker.Item label="Mercedes-Benz" value="Mercedes-Benz" />
          <Picker.Item label="DAF" value="DAF" />
          <Picker.Item label="MAN" value="MAN" />
          <Picker.Item label="Renault Trucks" value="Renault Trucks" />
          {/* Agrega más países aquí */}
        </Picker>

        <Text style={styles.label}>Modelo</Text>
        <Picker
          selectedValue={Branch}
          onValueChange={(itemValue) => setBranch(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Seleccione Modelo..." value="" />
          <Picker.Item label="DAF XF" value="DAF XF" /> 
          <Picker.Item label="DAF CF" value="DAF CF" />
          <Picker.Item label="Kenworth T680" value="Kenworth T680" />
          <Picker.Item label="Renault T High" value="Renault T High" />
          <Picker.Item label="International LT Series" value="International LT Series" />
          <Picker.Item label="Hino 500 Series" value="Hino 500 Series" />
          {/* Agrega más tipos de documentos aquí */}
        </Picker>

        <Text style={styles.label}>Anio</Text>
        <Picker
          selectedValue={Year}
          onValueChange={(itemValue) => setYear(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Seleccione Anio..." value="" />
          <Picker.Item label="2021" value="2021" />
          <Picker.Item label="2020" value="2020" />
          <Picker.Item label="2019" value="2019" />
          <Picker.Item label="2018" value="2018" />
          <Picker.Item label="2017" value="2017" />
          <Picker.Item label="2016" value="2016" />
          <Picker.Item label="2015" value="2015" />
          <Picker.Item label="2014" value="2014" />
          <Picker.Item label="2013" value="2013" />
          {/* Agrega más tipos de documentos aquí */}
        </Picker>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  text: {
    color: 'white',
    fontSize: 26,
    textShadowColor: 'black',
    textShadowOffset: { width: 3, height: 4 },
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(30),
  },
  label: {
    left: 8,
    fontSize: 16,
    color: 'white',
    alignSelf: 'flex-start',
    marginBottom: verticalScale(5),
  },
  input: {
    width: moderateScale(310),
    height: verticalScale(50),
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    padding: verticalScale(10),
    marginBottom: verticalScale(15),
    fontSize: 16
  },
  button: {
    backgroundColor: '#262E93',
    paddingVertical: verticalScale(10),
    paddingHorizontal: verticalScale(50),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
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
    marginTop: verticalScale(20),
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default PTC_OwnOptions;