import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image } from 'react-native';
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

  function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radio de la tierra en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

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
            <Image
              source={marker.imagen ? marker.imagen : require('../../assets/images/not-found/Image-not-found.png')}
              style={{
                width: 40, // tamaño personalizado
                height: 40,
                borderRadius: 20, // si quieres que sea circular
                borderWidth: 2,
                borderColor: '#fff',
                backgroundColor: '#fff',
                resizeMode: 'cover', // o 'contain'
              }}
            />
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.markertext}>{marker.nombre}</Text>
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

      {selectedMarker && usercurrentlocation && (
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            left: 20,
            backgroundColor: 'rgba(255,255,255,0.95)',
            padding: 12,
            borderRadius: 10,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            minWidth: 200,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#565EB3' }}>
            Destino:
          </Text>
          <Text style={{ fontSize: 14, color: '#222', marginBottom: 4 }}>
            {selectedMarker.nombre}
          </Text>
          <Text style={{ fontSize: 13, color: '#444' }}>
            Distancia: {(
              getDistanceFromLatLonInKm(
                usercurrentlocation.latitude,
                usercurrentlocation.longitude,
                selectedMarker.latitud,
                selectedMarker.longitud
              )
            ).toFixed(2)} km
          </Text>
        </View>
      )}
    </View>
  );
}
