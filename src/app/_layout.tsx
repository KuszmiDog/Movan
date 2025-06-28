import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect, Stack } from "expo-router";
import { AuthProvider, useAuth } from '../utils/AuthContext';

const AuthenticatedApp = () => {
  const { user, isLoading, isAuthenticated } = useAuth();

  // Mostrar loading mientras verificamos la autenticación
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#565EB3' }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  // Si está autenticado y completó el onboarding, ir al menú principal
  if (isAuthenticated && user?.isOnboardingComplete) {
    return <Redirect href="/(Menu)/(tabs)/Inicio" />;
  }

  // Si está autenticado pero no completó el onboarding, ir a selección de rol
  if (isAuthenticated && !user?.isOnboardingComplete) {
    if (!user?.role) {
      return <Redirect href="/(AccountCreation)/RolSelection" />;
    } else if (user.role === 'Private') {
      // Verificar si ya completó el flujo de transportista
      // Por ahora asumimos que si tiene rol pero no completó onboarding, 
      // necesita completar los formularios
      return <Redirect href="/(AccountCreation)/PrivateTransportLogic/DatosCamion" />;
    } else if (user.role === 'Particular') {
      return <Redirect href="/(AccountCreation)/IndividualLogic/IndividualID" />;
    }
  }

  // Si no está autenticado, ir a la pantalla de introducción
  return <Redirect href="/(auth)/movan_introduction" />;
};

const RootNavigation = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <AuthenticatedApp />
    </AuthProvider>
  );
};

export default RootNavigation;

