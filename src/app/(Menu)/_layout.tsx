import { Stack } from 'expo-router';
import { PedidoProvider } from '@/src/utils/PedidoContext';

export default function Layout() {
  return (
    <PedidoProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PedidoProvider>
  );
}
