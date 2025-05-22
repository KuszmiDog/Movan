import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imagePaths from '@/src/constants/imagePaths';

export default function AccountScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

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
            <Text style={styles.textabove}> Tu Cuenta </Text>
            <TouchableOpacity>
                <Image 
                    source={imagePaths.settings}
                    style={styles.setting}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.avatar} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Sin foto</Text>
        </View>
      )}
            <View style={styles.userdetails} >
                <Text style={styles.title}>*Correo del Usuario*</Text>
                <Text style={styles.text}>*Rol del usuario*</Text>
            </View>
      </View>
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
        gap: 135,
        flexDirection: 'row'
    },
    setting:{
        resizeMode: 'center',
        top: 20
    },
    container: {
      flex: 1,
      top: 12,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#565EB3',
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
    avatar: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderColor: '#262E93',
      borderWidth: 3,
        bottom: 180
    },
    placeholder: {
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeholderText: {
      color: '#666',
      fontSize: 14,
    },
  });
  
