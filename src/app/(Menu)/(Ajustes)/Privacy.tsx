import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Privacy = () => {
  const [settings, setSettings] = useState({
    biometric: false,
    location: true,
    dataCollection: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Privacidad y Seguridad</Text>
      </View>

      <View style={styles.optionsContainer}>
        {/* Autenticación Biométrica */}
        <View style={styles.option}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Autenticación Biométrica</Text>
            <Text style={styles.optionDescription}>Usar huella digital o Face ID</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#262E93' }}
            thumbColor={settings.biometric ? '#fff' : '#f4f3f4'}
            onValueChange={() => toggleSetting('biometric')}
            value={settings.biometric}
          />
        </View>

        {/* Ubicación */}
        <View style={styles.option}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Compartir Ubicación</Text>
            <Text style={styles.optionDescription}>Permitir acceso a la ubicación</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#262E93' }}
            thumbColor={settings.location ? '#fff' : '#f4f3f4'}
            onValueChange={() => toggleSetting('location')}
            value={settings.location}
          />
        </View>

        {/* Recopilación de Datos */}
        <View style={styles.option}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Recopilación de Datos</Text>
            <Text style={styles.optionDescription}>Ayúdanos a mejorar la app</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#262E93' }}
            thumbColor={settings.dataCollection ? '#fff' : '#f4f3f4'}
            onValueChange={() => toggleSetting('dataCollection')}
            value={settings.dataCollection}
          />
        </View>

        {/* Cambiar Contraseña */}
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Cambiar Contraseña</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
        </TouchableOpacity>

        {/* Eliminar Cuenta */}
        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
          <Text style={styles.actionButtonText}>Eliminar Cuenta</Text>
          <MaterialCommunityIcons name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
  },
  header: {
    padding: verticalScale(20),
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  optionsContainer: {
    padding: moderateScale(20),
  },
  option: {
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTextContainer: {
    flex: 1,
    marginRight: moderateScale(10),
  },
  optionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionDescription: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
  },
  actionButton: {
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF4B4B',
    marginTop: verticalScale(20),
  },
});

export default Privacy;