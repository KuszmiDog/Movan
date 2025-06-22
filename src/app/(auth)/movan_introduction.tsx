import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import imagePath from "@/src/constants/imagePaths"
import { moderateScale } from "react-native-size-matters"
import { useRouter } from 'expo-router'
import { colors } from '@/src/constants/colors'
import movan_introduction_styles from '@/src/constants/introduction_styles/movan_introduction_styles'


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
    <SafeAreaView style={movan_introduction_styles.container} >
      <View style={movan_introduction_styles.movanlogo}>
        <Image source={imagePath.iconMovan} style={movan_introduction_styles.logoimage}/>
        <Text style={movan_introduction_styles.textLogo}>Transportá. Conectá. Mové.</Text>
      </View>
      <View style={movan_introduction_styles.mApacheLogo}>
        <ActivityIndicator size={moderateScale(48)} color={"white"}/>
        <Text style={movan_introduction_styles.mApacheFont}>Loading...</Text>
        <Image source={imagePath.iconMApache} style={movan_introduction_styles.mApacheLogoImage}/>
        <Text style={movan_introduction_styles.mApacheFont}>from mApache</Text>
      </View>
    </SafeAreaView>
  );
};

export default movan_introduction