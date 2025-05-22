import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imagePaths from '@/src/constants/imagePaths';
import { router } from 'expo-router';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos permisos para acceder a tu cámara</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);

      try {
        await AsyncStorage.setItem('lastPhoto', photo.uri);
        console.log('Photo saved to AsyncStorage:', photo.uri);
        
        setTimeout(() => {
          router.push('/PrivateTransportLogic/PTC_ConfirmPhoto');
        }, 100);
        
      } catch (error) {
        console.error('Error saving photo to AsyncStorage:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
      />

      <View style={styles.tabs}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Image source={imagePaths.cameraflash} style={styles.flipbutton} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Image source={imagePaths.takephoto} style={styles.flipbutton} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Image source={imagePaths.flip} style={styles.flipbutton} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
  tabs:{
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 40,
    top: 20
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  button:{
    alignItems: 'center',
    bottom: 90
  },
  camera: {
    flex: 1,
    borderRadius: 300,
    borderColor: 'white',
    borderWidth: 2,
    marginTop: 120,
    marginBottom: 100,
    marginHorizontal: 8,
    width: 368,
    borderCurve:"circular"

    
  },
  flipbutton: {
    alignSelf: "center",
    resizeMode: 'contain',
    width: 60
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 50,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});
