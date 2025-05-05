import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import imagePath from "@/src/constants/imagePaths"
import { moderateScale } from "react-native-size-matters"
import BottomComponents from '@/src/components/atoms/BottomComponents'


const movan_introduction = () => {

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
        <View style={styles.mApacheLogo}>
          {isLoading ? (
            <>
              <BottomComponents tittle="Siguiente" navigateTo='TermsAndConPage'></BottomComponents>
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

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#565EB3",
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
    width: 65,
    height: 40,
  },  

  mApacheFont: {
    fontSize: 15,
    color: "white",
    fontWeight: "500",
    bottom: 20,

    textShadowColor: 'black', 
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 10,
  },

  header:{
    alignItems: "center",
    gap: moderateScale(30)
  }
})

export default movan_introduction