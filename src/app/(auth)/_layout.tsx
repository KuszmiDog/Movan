import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false}}>
      <Text>Pantalla Autenticacion</Text>
    </Stack>
  )
}

export default AuthLayout