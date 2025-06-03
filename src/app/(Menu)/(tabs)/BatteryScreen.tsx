import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getBatteryLevel } from '../../../components/BatteryModule';

const BatteryScreen = () => {
  const [battery, setBattery] = useState<number | null>(null);

  const fetchBattery = async () => {
    const level = await getBatteryLevel();
    setBattery(level);
  };

  useEffect(() => {
    fetchBattery();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nivel de batería</Text>
      <Text style={styles.level}>
        {battery !== null ? `${battery}%` : 'Cargando...'}
      </Text>
      <Button title="Actualizar batería" onPress={fetchBattery} />
    </View>
  );
};

export default BatteryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  level: { fontSize: 40, marginBottom: 20 },
});
