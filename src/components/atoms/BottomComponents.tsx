import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from 'expo-router'

type Props = {
    tittle: string;
    navigateTo: string;
}

const BottomComponents = ({tittle, navigateTo}: Props) => {

    const navigation = useNavigation<NativeStackNavigationProp<any>>(); //variable de navegacion

  return (
    <TouchableOpacity style={style.bottomContainer} onPress={() => navigation.navigate(navigateTo) }>
      <Text style={style.bottomText}>{tittle}</Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
    bottomContainer:{
        backgroundColor: "#262E93",
        width: "100%",

        paddingVertical: verticalScale(10),
        paddingHorizontal: verticalScale(50),
        borderRadius: moderateScale(5),
        bottom:250,
        alignItems: "center",
        justifyContent: "center",
    },

    bottomText:{
        fontFamily: "Roboto",
        color: "white",
        fontSize: 22
    }
    
})


export default BottomComponents