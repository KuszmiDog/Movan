import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import styles from '@/src/constants/Privacidad_styles/Privacidad_style';

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
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/(Menu)/(Ajustes)/ChangePassword')}
        >
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

export default Privacy;