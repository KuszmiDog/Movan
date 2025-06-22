import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import imagePath from "@/src/constants/imagePaths"
import { moderateScale } from "react-native-size-matters"
import TermsAndCon from '@/src/components/atoms/TermsAndCon'
import { colors } from '@/src/constants/colors'

const TermsAndC = () => {

  const roles = [
    { label: 'Transportista Privado', value: 'private', description: 'Un transportista privado realiza envíos de manera independiente.' },
    { label: 'Transporte', value: 'transport', description: 'Un transporte es una empresa que ofrece servicios de envío.' },
    { label: 'Particular', value: 'individual', description: 'Un particular utiliza la aplicación para envíos personales.' },
  ];

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
        </View>

        <View>
          <TermsAndCon/>
        </View>

        <View style={styles.mApacheLogo}>
          <Image source={imagePath.iconMApache} style={styles.mApacheLogoImage}/>
          <Text style={styles.mApacheFont}>from mApache</Text>
        </View>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "space-between"
  },

  movanlogo:{
    justifyContent: "center",
    top: 70,
  },

  logoimage:{
    width: 220,
    height: 220,
    left: 8,
    top: 29
  },

  textLogo: {
    fontSize: 20,
    color: "white",
    fontWeight: "600"
  },

  mApacheLogo: {
    justifyContent: "center",
    alignItems: "center",
    gap: 25
  },

  mApacheLogoImage: {
    width: 55,
    height: 40,
    top: 8
  },  

  mApacheFont: {
    textShadowRadius: 10,
    fontSize: 15,
    color: colors.white,
    fontWeight: "500",
    bottom: 20
  },

  header:{
    alignItems: "center",
    gap: moderateScale(30)
  },

})

export default TermsAndC