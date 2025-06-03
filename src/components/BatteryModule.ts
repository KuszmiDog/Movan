import { NativeModules } from 'react-native';

const { BatteryModule } = NativeModules;

export const getBatteryLevel = async (): Promise<number> => {
  try {
    const level = await BatteryModule.getBatteryLevel();
    return level;
  } catch (e) {
    console.error('Error obteniendo batería', e);
    return -1;
  }
};

export default getBatteryLevel;