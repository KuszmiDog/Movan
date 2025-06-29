import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { router } from 'expo-router';
import { useAuth } from '../../../utils/AuthContext';

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  
  const [userInfo, setUserInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!userInfo.name.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }

    if (!userInfo.email.trim()) {
      Alert.alert('Error', 'El correo electrónico es obligatorio');
      return;
    }

    setIsLoading(true);
    
    try {
      await updateUser({
        name: userInfo.name.trim(),
        email: userInfo.email.trim(),
        phone: userInfo.phone.trim() || undefined,
      });
      
      Alert.alert('Éxito', 'Perfil actualizado correctamente', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Perfil</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            style={styles.input}
            value={userInfo.name}
            onChangeText={(text) => setUserInfo({...userInfo, name: text})}
            placeholder="Nombre completo"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            value={userInfo.email}
            onChangeText={(text) => setUserInfo({...userInfo, email: text})}
            placeholder="Correo electrónico"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={userInfo.phone}
            onChangeText={(text) => setUserInfo({...userInfo, phone: text})}
            placeholder="Teléfono"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]} 
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  backButton: {
    marginRight: moderateScale(10),
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  form: {
    padding: moderateScale(20),
  },
  inputGroup: {
    marginBottom: verticalScale(20),
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: verticalScale(5),
  },
  input: {
    backgroundColor: '#262E93',
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    color: 'white',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  saveButtonDisabled: {
    backgroundColor: '#999',
    opacity: 0.6,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfile;