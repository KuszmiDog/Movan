import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import imagePaths from '@/src/constants/imagePaths';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
    
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}> </CameraView>
      <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
        <Image
          source={imagePaths.flip}
          style={styles.flipbutton}
        />
        
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 120,
    marginHorizontal: 20 
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
    margin: 40,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});
