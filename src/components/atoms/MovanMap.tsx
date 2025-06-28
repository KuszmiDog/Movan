import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import styles from '@/src/constants/MovanMap_styles/MovanMapScreen_styles';
import * as Location from 'expo-location';
import { markers } from '@/src/assets/markers/marker';
import MapViewDirections from 'react-native-maps-directions';
import Constants from 'expo-constants';

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;

const INITIAL_REGION = {
  latitude: -27.472167,
  longitude: -58.973207,
  latitudeDelta: 0.010,
  longitudeDelta: 0.010,
};
const PROVIDER = 'google';

export const unstable_settings = {
  headerShown: false,
};

export default function MovanMap() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<any>(null); // Nuevo estado

  // permiso para la ubicacion
  useEffect(() => {
    (async () => { 
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      const usercurrentlocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.010,
        longitudeDelta: 0.010,
      };
    })();
  }, []); 

  //

  const mapRef = useRef<any>();
  const onRegionChangeComplete = (region: any) => {
    console.log('Region changed:', region);
  }
  
  const animateMapToUserLocation = () => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: INITIAL_REGION.latitudeDelta,
        longitudeDelta: INITIAL_REGION.longitudeDelta,
      }, 500);
    }
  };

  useEffect(() => {
    animateMapToUserLocation();
  }, [location]);


  // mostrar en la consola la ubicacion del usuario
  console.log('User location:', location);
  // llamada a la API de Google Maps

  const onMarkerSelect = (marker: any) => {
    setSelectedMarker(marker); // Guardar el marcador seleccionado
    // alert(`Marker selected: ${marker.nombre}`); // Puedes quitar el alert si no lo necesitas
  };

  // Define usercurrentlocation based on location state
  const usercurrentlocation = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
      }
    : null;

  return (
    <View style={{flex: 1}}> 
      
      <MapView
        style={styles.map}
        provider={PROVIDER}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        ref={mapRef}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitud,
              longitude: marker.longitud,
            }}
            onPress={() => onMarkerSelect(marker)}
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.markertext}> {marker.nombre}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {usercurrentlocation && selectedMarker && (
          <MapViewDirections
            origin={usercurrentlocation}
            destination={{
              latitude: selectedMarker.latitud,
              longitude: selectedMarker.longitud,
            }}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeColor="#565EB3"
            strokeWidth={5}
          />
        )}
      </MapView>
    </View>
  );
}
