import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import imagePath from "@/src/constants/imagePaths"
import { moderateScale } from "react-native-size-matters"
import { useRouter } from 'expo-router'


const movan_introduction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
      router.push('/(auth)/TermsAndConPage');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.movanlogo}>
        <Image source={imagePath.iconMovan} style={styles.logoimage}/>
        <Text style={styles.textLogo}>Transportá. Conectá. Mové.</Text>
      </View>
      <View style={styles.mApacheLogo}>
        <ActivityIndicator size={moderateScale(48)} color={"white"}/>
        <Text style={styles.mApacheFont}>Loading...</Text>
        <Image source={imagePath.iconMApache} style={styles.mApacheLogoImage}/>
        <Text style={styles.mApacheFont}>from mApache</Text>
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
    textShadowRadius: 10,
  },

  header:{
    alignItems: "center",
    gap: moderateScale(30)
  }
})

export default movan_introduction