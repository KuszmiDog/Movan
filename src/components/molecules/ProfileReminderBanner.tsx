import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useProfileReminder } from '../../utils/useProfileReminder';

interface ProfileReminderBannerProps {
  onNavigateToProfile?: () => void;
  style?: any;
}

export const ProfileReminderBanner: React.FC<ProfileReminderBannerProps> = ({
  onNavigateToProfile,
  style
}) => {
  const { shouldShowReminder, userRole } = useProfileReminder();

  if (!shouldShowReminder) {
    return null;
  }

  const getMessage = () => {
    if (userRole === 'Particular') {
      return 'Completa tu información personal para una mejor experiencia';
    }
    return 'Completa los datos de tu vehículo y licencia para recibir más ofertas';
  };

  const getIcon = () => {
    if (userRole === 'Particular') {
      return 'account-edit';
    }
    return 'truck-plus';
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <MaterialCommunityIcons 
          name={getIcon()} 
          size={24} 
          color="#FF9500" 
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Perfil Incompleto</Text>
          <Text style={styles.message}>{getMessage()}</Text>
        </View>
        <TouchableOpacity 
          style={styles.button}
          onPress={onNavigateToProfile}
        >
          <Text style={styles.buttonText}>Completar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF3E0',
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(16),
    marginVertical: verticalScale(8),
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
  },
  icon: {
    marginRight: moderateScale(12),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: verticalScale(4),
  },
  message: {
    fontSize: moderateScale(14),
    color: '#BF360C',
    lineHeight: moderateScale(18),
  },
  button: {
    backgroundColor: '#FF9500',
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(8),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
});
