import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from 'expo-router'

type Props = {
    tittle: string;
    navigateTo: string;
}

const HyperLink = ({tittle, navigateTo}: Props) => {

    const navigation = useNavigation<NativeStackNavigationProp<any>>(); //variable de navegacion

  return (
    <TouchableOpacity style={style.bottomContainer} onPress={() => navigation.navigate(navigateTo) }>
      <Text style={style.bottomText}>{tittle}</Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
        bottomContainer:{
        alignItems: "center",
        justifyContent: "center",
    },

    bottomText:{
      alignSelf: "center",
      color: "#FFF783",
      fontSize: 20,
      fontWeight: 800,
      fontStyle: "normal",
      textDecorationLine: "underline"
      
    }
    
})


export default HyperLink