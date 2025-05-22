import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Redirect, Stack } from "expo-router";



const RootNavigation = () => { 
  const [isLogin, setIslogin] = useState(false); //logica hardcode para detectar si el usuario esta logueado

  return (
    <>
        <Stack screenOptions={{ headerShown: false}}></Stack>
        {isLogin ? <Redirect href="/(main)"/> : <Redirect href="/(auth)/movan_introduction"/>} 
    </>
  ) //ternaria para ver a donde se redirige al usuario si esta logueado o no
    
  
}               


export default RootNavigation

