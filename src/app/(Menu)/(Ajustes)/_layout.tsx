import { Stack } from 'expo-router';

export default function AjustesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="EditProfile" />
      <Stack.Screen name="Help" />
      <Stack.Screen name="Notifications" />
      <Stack.Screen name="Privacy" />
      <Stack.Screen name="Terms" />
    </Stack>
  );
}
