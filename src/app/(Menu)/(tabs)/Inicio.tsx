import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const MovanMenu = () => {
  // Manejar el botón atrás para mostrar alerta de cerrar app
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Salir de la aplicación',
        '¿Estás seguro de que quieres cerrar la aplicación?',
        [
          {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Salir',
            onPress: () => BackHandler.exitApp(),
          },
        ]
      );
      return true; // Previene el comportamiento por defecto
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // Datos de ejemplo
  const stats = {
    enviosCompletados: 24,
    enviosEnProceso: 3,
    calificacionPromedio: 4.8,
    gananciasSemanales: '$15,400'
  };

  const handleNavigation = (screen: string) => {
    console.log(`Navegando a: ${screen}`);
    router.push(screen as any);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>¡Bienvenido de nuevo!</Text>
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="truck-delivery" size={30} color="white" />
          <Text style={styles.statNumber}>{stats.enviosCompletados}</Text>
          <Text style={styles.statLabel}>Envíos Completados</Text>
        </View>

        <View style={styles.statCard}>
          <MaterialCommunityIcons name="progress-clock" size={30} color="white" />
          <Text style={styles.statNumber}>{stats.enviosEnProceso}</Text>
          <Text style={styles.statLabel}>En Proceso</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="star" size={30} color="white" />
          <Text style={styles.statNumber}>{stats.calificacionPromedio}</Text>
          <Text style={styles.statLabel}>Calificación</Text>
        </View>

        <View style={styles.statCard}>
          <MaterialCommunityIcons name="cash" size={30} color="white" />
          <Text style={styles.statNumber}>{stats.gananciasSemanales}</Text>
          <Text style={styles.statLabel}>Ganancias Semanales</Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleNavigation('/AccountScreen')}>
          <MaterialCommunityIcons name="plus-circle" size={24} color="white" />
          <Text style={styles.actionButtonText}>Nuevo Envío</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => handleNavigation('/Settings')}>
          <MaterialCommunityIcons name="map-marker" size={24} color="white" />
          <Text style={styles.actionButtonText}>Seguir Envío</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
  },
  header: {
    padding: verticalScale(20),
    paddingTop: verticalScale(40),
  },
  welcomeText: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    marginTop: verticalScale(5),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    marginBottom: verticalScale(15),
  },
  statCard: {
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: verticalScale(5),
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
  actionContainer: {
    padding: moderateScale(20),
  },
  actionButton: {
    backgroundColor: '#262E93',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: moderateScale(10),
  },
});

export default MovanMenu;