import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import imagePaths from '@/src/constants/imagePaths';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { router } from 'expo-router';
import { useAuth } from '../../../utils/AuthContext';
import { UserService } from '../../../utils/UserService';
import * as ImagePicker from 'expo-image-picker';
import styles from '@/src/constants/Cuenta_styles/Cuenta_styles'; // Importa tus estilos personalizados

export default function AccountScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const { user, logout, updateUser, isLoading } = useAuth();

  // Cargar usuario directamente desde AsyncStorage - Solo una vez al montar
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Intentar obtener desde AuthContext primero
        if (user) {
          setCurrentUser(user);
          console.log('✅ Usando usuario de AuthContext:', user);
          return;
        }

        // Si no hay usuario en AuthContext, obtener directamente desde UserService
        const userData = await UserService.getCurrentUser();
        if (userData) {
          setCurrentUser(userData);
          console.log('✅ Usuario cargado desde UserService:', userData);
        } else {
          console.log('❌ No se pudo cargar el usuario');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    // Solo cargar si no tenemos usuario actual
    if (!currentUser) {
      loadUserData();
    }
  }, [user?.id]); // Solo depender del ID para evitar bucles

  // Debug: verificar datos del usuario - Solo en desarrollo
  useEffect(() => {
    if (__DEV__) {
      console.log('🔍 Usuario actual:', currentUser);
      console.log('🔍 Usuario en AuthContext:', user);
    }
  }, [currentUser?.id, user?.id]); // Solo depender de IDs

  // Cargar foto de perfil guardada - optimizado para evitar re-renders innecesarios
  useFocusEffect(
    useCallback(() => {
      const loadPhoto = async () => {
        try {
          const userToUse = currentUser || user;
          if (!userToUse?.id) return;
          
          const savedPhoto = await AsyncStorage.getItem(`@profile_photo_${userToUse.id}`);
          if (savedPhoto && savedPhoto !== photoUri) {
            setPhotoUri(savedPhoto);
          }
        } catch (error) {
          console.error('Error loading profile photo:', error);
        }
      };
      
      const userToUse = currentUser || user;
      if (userToUse?.id) {
        loadPhoto();
      }
    }, [currentUser?.id, user?.id, photoUri]) // Incluir photoUri para evitar sets innecesarios
  );

  // Función para seleccionar y cambiar la foto de perfil
  const changeProfilePhoto = async () => {
    try {
      // Solicitar permisos
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permisos requeridos', 'Necesitamos acceso a tu galería para cambiar la foto de perfil.');
        return;
      }

      // Mostrar opciones
      Alert.alert(
        'Cambiar foto de perfil',
        'Selecciona una opción',
        [
          {
            text: 'Cámara',
            onPress: () => openCamera(),
          },
          {
            text: 'Galería',
            onPress: () => openGallery(),
          },
          {
            text: 'Cancelar',
            style: 'cancel',
          },
        ]
      );
    } catch (error) {
      console.error('Error requesting permissions:', error);
      Alert.alert('Error', 'No se pudieron solicitar los permisos necesarios.');
    }
  };

  const openCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permisos requeridos', 'Necesitamos acceso a la cámara para tomar una foto.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        await saveProfilePhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error opening camera:', error);
      Alert.alert('Error', 'No se pudo abrir la cámara.');
    }
  };

  const openGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        await saveProfilePhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error opening gallery:', error);
      Alert.alert('Error', 'No se pudo abrir la galería.');
    }
  };

  const saveProfilePhoto = async (uri: string) => {
    try {
      const userToUse = currentUser || user;
      if (userToUse?.id) {
        await AsyncStorage.setItem(`@profile_photo_${userToUse.id}`, uri);
        setPhotoUri(uri);
        Alert.alert('Éxito', 'Foto de perfil actualizada correctamente.');
      }
    } catch (error) {
      console.error('Error saving profile photo:', error);
      Alert.alert('Error', 'No se pudo guardar la foto de perfil.');
    }
  };

  // Función para obtener el nombre completo del usuario
  const getUserDisplayName = () => {
    const userToUse = currentUser || user;
    if (__DEV__) {
      console.log('👤 Getting display name for user:', userToUse?.name, userToUse?.email);
    }
    if (userToUse?.name && userToUse.name.trim()) {
      return userToUse.name;
    }
    // Si no tiene nombre, usar la parte antes del @ del email
    if (userToUse?.email) {
      return userToUse.email.split('@')[0];
    }
    return 'Usuario';
  };

  // Función para obtener el rol en español
  const getUserRole = () => {
    const userToUse = currentUser || user;
    if (__DEV__) {
      console.log('🎭 Getting role for user:', userToUse?.role);
    }
    switch (userToUse?.role) {
      case 'Private':
        return 'Transportista Privado';
      case 'Particular':
        return 'Usuario Particular';
      default:
        return 'Usuario';
    }
  };

  // Función para formatear la fecha de registro
  const getJoinDate = () => {
    try {
      const userToUse = currentUser || user;
      // Si el usuario tiene una fecha de creación, usarla
      if (userToUse && 'createdAt' in userToUse) {
        const date = new Date(userToUse.createdAt as string);
        return date.toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'long' 
        });
      }
      // Si no, usar la fecha actual como ejemplo
      return 'Junio 2025';
    } catch (error) {
      return 'Fecha no disponible';
    }
  };

  // Función para obtener el teléfono del usuario
  const getUserPhone = () => {
    const userToUse = currentUser || user;
    if (userToUse?.phone) {
      return userToUse.phone;
    }
    return 'No registrado (Dirigase a Ajustes para agregar)';
  };

  // Función para forzar la carga de datos si no están disponibles - Removido para evitar bucles
  // const ensureUserHasData = async () => {
  //   if (user && (!user.name || !user.role)) {
  //     console.log('⚠️ Usuario sin datos completos, intentando recargar...');
  //     // Recargar usuario desde storage
  //     const currentUser = await UserService.getCurrentUser();
  //     if (currentUser && (currentUser.name || currentUser.role)) {
  //       console.log('✅ Datos recargados:', currentUser);
  //       updateUser(currentUser);
  //     }
  //   }
  // };

  // Ejecutar al montar el componente - Removido para evitar bucles
  // useEffect(() => {
  //   if (user) {
  //     ensureUserHasData();
  //   }
  // }, [user?.id]);

  // Datos del usuario desde el contexto
  const userInfo = {
    name: getUserDisplayName(),
    email: (currentUser || user)?.email || 'No disponible',
    role: getUserRole(),
    phone: getUserPhone(),
    joinDate: getJoinDate(),
    rating: 'Proximamente', // Estos pueden ser calculados basado en datos reales
    completedDeliveries: 0 // Puede ser calculado desde datos de transportista
  };

  if (__DEV__) {
    console.log('📊 UserInfo final:', userInfo);
  }

  const handleEditProfilePhoto = () => {
    changeProfilePhoto();
  };

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const datos = await AsyncStorage.getItem('datos_personales');
        if (datos) {
          const datosPersonales = JSON.parse(datos);
          setPhone(datosPersonales.telefono || null);
        }
      } catch (error) {
        console.log('Error obteniendo teléfono:', error);
      }
    };
    fetchPhone();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.textabove}>Tu Cuenta</Text>
      </View>

      {(isLoading || (!currentUser && !user)) ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando datos...</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handleEditProfilePhoto} style={styles.avatarContainer}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.avatar} />
            ) : (
              <View style={styles.placeholder}>
                <MaterialCommunityIcons name="account" size={80} color="#666" />
              </View>
            )}
            <View style={styles.editIconContainer}>
              <MaterialCommunityIcons name="camera" size={20} color="white" />
            </View>
          </TouchableOpacity>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userRole}>{userInfo.role}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="star" size={24} color="white" />
            <Text style={styles.statNumber}>{userInfo.rating}</Text>
            <Text style={styles.statLabel}>Calificación</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="truck-delivery" size={24} color="white" />
            <Text style={styles.statNumber}>{userInfo.completedDeliveries}</Text>
            <Text style={styles.statLabel}>Envíos</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="email" size={24} color="white" />
            <Text style={styles.infoText}>{userInfo.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="phone" size={24} color="white" />
            <Text style={styles.infoText}>{phone ? phone : 'No registrado (Dirijase a Ajustes)'}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="calendar" size={24} color="white" />
            <Text style={styles.infoText}>Miembro desde {userInfo.joinDate}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => router.push('/(Menu)/(Ajustes)/EditProfile')}
        >
          <MaterialCommunityIcons name="account-edit" size={24} color="white" />
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => {
            Alert.alert(
              'Cerrar Sesión',
              '¿Estás seguro de que quieres cerrar sesión?',
              [
                {
                  text: 'Cancelar',
                  style: 'cancel',
                },
                {
                  text: 'Cerrar Sesión',
                  style: 'destructive',
                  onPress: async () => {
                    await logout();
                    router.replace('/(auth)/movan_introduction');
                  },
                },
              ]
            );
          }}
        >
          <MaterialCommunityIcons name="logout" size={24} color="white" />
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

