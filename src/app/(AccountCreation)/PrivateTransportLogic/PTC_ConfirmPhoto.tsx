import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'
import BottomComponents from '@/src/components/atoms/BottomComponents';
import { router } from 'expo-router';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const PTC_ConfirmPhoto = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleNext = () => {
      router.push('/(Menu)/(tabs)/Inicio'); 
    };

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        const uri = await AsyncStorage.getItem('lastPhoto');
        if (uri) {
          setPhotoUri(uri);
        } else {
          console.warn('No photo found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error loading photo from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPhoto();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Cargando foto...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.background}>
      <LinearGradient colors={['#565EB3', '#00299147']}> </LinearGradient>
      <View style={styles.container}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.image} />
      ) : (
        <Text style={styles.warning}>No hay ninguna foto disponible.</Text>
      )}

      <Text style={styles.text}> Confirmar foto de perfil? </Text>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Confirmar!</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
    
  );
};

export default PTC_ConfirmPhoto;

const styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: '#565EB3'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  button: {
      backgroundColor: '#262E93',
      paddingVertical: verticalScale(10),
      paddingHorizontal: verticalScale(50),
      borderRadius: moderateScale(5),
      alignItems: 'center',
      justifyContent: 'center',
    },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text:{
    color: 'white',
    fontSize: 20,
    textShadowColor: 'black',
    textShadowOffset: { width: 3, height: 4 },
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'center',
    borderRadius: 16,
    borderWidth: 5,
    borderColor: '#262E93',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning: {
    fontSize: 16,
    color: 'gray',
  }
});
