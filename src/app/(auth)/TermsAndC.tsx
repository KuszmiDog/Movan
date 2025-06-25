import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import imagePath from "@/src/constants/imagePaths"
import { moderateScale } from "react-native-size-matters"
import styles from '@/src/constants/Movan_introduction_styles/TermsAndC_style'

const TermsAndC = () => {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 3000);
  })
  
  return (
    
    <SafeAreaView style={styles.container} >
        <View style={styles.movanlogo}>
            <Image source={imagePath.iconMovan} style={styles.logoimage}/>
            <Text style={styles.textLogo}>Transportá. Conectá. Mové.</Text>
            <Text style={styles.textLogo}>Transportá. Conectá. Mové.</Text>
            <Text style={styles.textLogo}>Transportá. Conectá. Mové.</Text>
            <Text style={styles.textLogo}>Transportá. Conectá. Mové.</Text>
        </View>positories
        <View style={styles.mApacheLogo}>
          {isLoading ? (
            <>
              <Image source={imagePath.iconMApache} style={styles.mApacheLogoImage}/>
              <Text style={styles.mApacheFont}>from mApache</Text> 
            </>
          ) : 
          (
            <>
              <ActivityIndicator size={moderateScale(48)} color={"white"}/>
              <Text style={styles.mApacheFont}>Loading...</Text>
            </>
          )}

          
        </View>
        
    </SafeAreaView>
  )
}

export default TermsAndC