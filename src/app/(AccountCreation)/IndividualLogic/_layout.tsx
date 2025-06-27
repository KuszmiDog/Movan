import { Stack } from 'expo-router';

export default function IndividualLogicLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="IndividualID" />
    </Stack>
  );
}
