import { Text } from 'react-native'
import React from 'react'
import CameraComponent from '@/src/components/atoms/inputs/CameraComponent'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '@/src/constants/PrivateTransportist_styles/PrivateTransCameraTake_styles'

const PrivateTransCameraTake = () => {
    
  return (
          <SafeAreaView style={styles.background}>
            <Text style={styles.text}>Toma una foto de tu rostro, sonrie!</Text>
            <CameraComponent></CameraComponent>
          </SafeAreaView>
  )
}
export default PrivateTransCameraTake