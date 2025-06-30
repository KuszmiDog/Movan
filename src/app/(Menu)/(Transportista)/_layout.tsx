import { Stack } from 'expo-router';
import { useAuth } from '../../../utils/AuthContext';
import { Redirect } from 'expo-router';

export default function TransportistaLayout() {
  const { user } = useAuth();

  // Redirigir si no es transportista
  if (user?.role !== 'Private') {
    return <Redirect href="/(Menu)/(tabs)/Inicio" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreditHistory" />
      <Stack.Screen name="CreditRecharge" />
    </Stack>
  );
}
