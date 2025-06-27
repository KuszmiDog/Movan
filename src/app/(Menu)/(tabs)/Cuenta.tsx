import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import imagePaths from '@/src/constants/imagePaths';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { router } from 'expo-router';

export default function AccountScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [userMail, setUserMail] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadUserData = async () => {
        try {
          // Intenta obtener el usuario actual guardado
          const userData = await AsyncStorage.getItem('@movan_current_user');
          if (userData) {
            const user = JSON.parse(userData);
            setUserMail(user.email);
          } else {
            // Si no hay usuario actual, intenta obtener el mail suelto
            const mail = await AsyncStorage.getItem('mail');
            setUserMail(mail);
          }
        } catch (error) {
          setUserMail(null);
        }
      };
      loadUserData();
    }, [])
  );

  // Datos de ejemplo del usuario
  const userInfo = {
    name: "Juan Pérez",
    email: userMail || "error",
    role: "Transportista Privado",
    phone: "+52 123 456 7890",
    joinDate: "Enero 2024",
    rating: 4.8,
    completedDeliveries: 156
  };

  useFocusEffect(
    useCallback(() => {
      const loadPhoto = async () => {
        try {
          const uri = await AsyncStorage.getItem('lastPhoto');
          if (uri) setPhotoUri(uri);
        } catch (error) {
          console.error('Error loading photo from AsyncStorage', error);
        }
      };

      loadPhoto();
    }, [])
  );

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.textabove}>Tu Cuenta</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.profileSection}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholder}>
              <MaterialCommunityIcons name="account" size={80} color="#666" />
            </View>
          )}
          
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
            <Text style={styles.infoText}>{userInfo.phone}</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background:{
    backgroundColor: '#262E93',
    flex: 1
  },
  userdetails:{
    alignItems: 'center',
    bottom: 150
  },
  header:{
    height: 90,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileSection: {
    alignItems: 'center',
    padding: moderateScale(20),
  },
  avatar: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
    borderColor: '#262E93',
    borderWidth: 3,
  },
  placeholder: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  userName: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: moderateScale(20),
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    width: '45%',
  },
  statNumber: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  infoSection: {
    padding: moderateScale(20),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
  },
  infoText: {
    color: 'white',
    marginLeft: moderateScale(10),
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#262E93',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    margin: moderateScale(20),
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: moderateScale(10),
  },
  textabove:{
    fontSize: 20,
    color: 'white',
    padding: 30,
    top: 20
  },
  text:{
    fontSize: 20,
    marginBottom: 20,
    color: 'white'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold'
  },
});

