import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import imagePath from "@/src/constants/imagePaths"
import { moderateScale, verticalScale } from "react-native-size-matters"

const PrivateTransDoneView = () => {
      
  return (
    <SafeAreaView style={styles.container} >
        
       <View style={styles.footer}>
               <Text style={styles.footerText}>from mApache</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#565EB3',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
      },
      text: {
        color: 'white',
        fontSize: 26,
        textShadowColor: 'black',
        textShadowOffset: { width: 3, height: 4 },
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: verticalScale(30),
      },
      label: {
        left: 8,
        fontSize: 16,
        color: 'white',
        alignSelf: 'flex-start',
        marginBottom: verticalScale(5),
      },
      input: {
        width: moderateScale(310),
        height: verticalScale(50),
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        padding: verticalScale(10),
        marginBottom: verticalScale(15),
        fontSize: 16
      },
      button: {
        backgroundColor: '#262E93',
        paddingVertical: verticalScale(10),
        paddingHorizontal: verticalScale(50),
        borderRadius: moderateScale(5),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(20),
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      footer: {
        bottom: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(20),
      },
      footerText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
      },
  
  })

export default PrivateTransDoneView