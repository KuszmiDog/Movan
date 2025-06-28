import { Stack } from 'expo-router';

export default function PrivateTransportLogicLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DatosCamion" />
      <Stack.Screen name="DatosLicencia" />
    </Stack>
  );
}
