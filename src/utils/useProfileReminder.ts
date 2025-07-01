import { useAuth } from './AuthContext';
import { Alert } from 'react-native';

interface ProfileReminderOptions {
  showReminder?: boolean;
  reminderTitle?: string;
  reminderMessage?: string;
  navigateToProfile?: () => void;
}

export const useProfileReminder = (options: ProfileReminderOptions = {}) => {
  const { user } = useAuth();
  const {
    showReminder = true,
    reminderTitle = 'Completa tu perfil',
    reminderMessage = 'Para una mejor experiencia, te recomendamos completar tu información de perfil.',
    navigateToProfile
  } = options;

  const shouldShowReminder = () => {
    return user && 
           user.isOnboardingComplete && 
           user.hasCompletedProfile === false &&
           showReminder;
  };

  const showProfileReminder = () => {
    if (shouldShowReminder()) {
      const message = user?.role === 'Particular' 
        ? 'Te recomendamos completar tu información personal para una mejor experiencia en Movan.'
        : 'Te recomendamos completar la información de tu vehículo y licencia para recibir más ofertas de trabajo.';
      
      Alert.alert(
        reminderTitle,
        message,
        [
          {
            text: 'Más tarde',
            style: 'cancel'
          },
          {
            text: 'Completar ahora',
            onPress: navigateToProfile || (() => {
              // Navegar a configuración por defecto
              console.log('Navegar a configuración de perfil');
            })
          }
        ]
      );
    }
  };

  return {
    shouldShowReminder: shouldShowReminder(),
    showProfileReminder,
    isProfileIncomplete: user?.hasCompletedProfile === false,
    userRole: user?.role
  };
};
