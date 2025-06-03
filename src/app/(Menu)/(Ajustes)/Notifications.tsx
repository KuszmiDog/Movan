import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    updates: true,
    offers: false,
  });

  const toggleSwitch = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notificaciones</Text>
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.option}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Notificaciones Push</Text>
            <Text style={styles.optionDescription}>Recibe alertas en tiempo real</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#262E93' }}
            thumbColor={notifications.push ? '#fff' : '#f4f3f4'}
            onValueChange={() => toggleSwitch('push')}
            value={notifications.push}
          />
        </View>

        <View style={styles.option}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Notificaciones por Email</Text>
            <Text style={styles.optionDescription}>Recibe actualizaciones por correo</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#262E93' }}
            thumbColor={notifications.email ? '#fff' : '#f4f3f4'}
            onValueChange={() => toggleSwitch('email')}
            value={notifications.email}
          />
        </View>

        <View style={styles.option}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Actualizaciones de la App</Text>
            <Text style={styles.optionDescription}>Notificaciones sobre nuevas funciones</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#262E93' }}
            thumbColor={notifications.updates ? '#fff' : '#f4f3f4'}
            onValueChange={() => toggleSwitch('updates')}
            value={notifications.updates}
          />
        </View>

        <View style={styles.option}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Ofertas y Promociones</Text>
            <Text style={styles.optionDescription}>Recibe ofertas especiales</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#262E93' }}
            thumbColor={notifications.offers ? '#fff' : '#f4f3f4'}
            onValueChange={() => toggleSwitch('offers')}
            value={notifications.offers}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
  },
  header: {
    padding: verticalScale(20),
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  optionsContainer: {
    padding: moderateScale(20),
  },
  option: {
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTextContainer: {
    flex: 1,
    marginRight: moderateScale(10),
  },
  optionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionDescription: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
  },
});

export default Notifications;