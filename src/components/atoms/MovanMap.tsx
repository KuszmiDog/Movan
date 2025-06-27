import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '@/src/constants/MovanMap_styles/MovanMapScreen_styles';

import * as Location from 'expo-location';


const GOOGLE_MAPS_API_KEY = 'AIzaSyDGnUE8DrmabYGlQ4tWPC9cy6tmRA-0538'; 

export const unstable_settings = {
  headerShown: false,
};

type SearchResult = {
  geometry: { location: { lat: number; lng: number } };
  name: string;
  vicinity: string; 
};

type UserLocation = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type ManualMarker = {
  latitude: number;
  longitude: number;
};



export default function MovanMap() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    (async () => { 
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: location?.latitude ?? 0,
          longitude: location?.longitude ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >
          {location && (
            <Marker coordinate={location} title='Tu ubicación actual' />
          )}
      </MapView>
    </View>
  );
}


