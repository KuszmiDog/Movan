import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
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

// Ubicación por defecto para desarrollo/emulador (Resistencia, Argentina)
const DEFAULT_LOCATION = {
  latitude: -27.4516,
  longitude: -58.9868,
};

const PROVIDER = 'google';

export const unstable_settings = {
  headerShown: false,
};

interface MovanMapProps {
  destination?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

export default function MovanMap({ destination }: MovanMapProps) {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<any>(null); // Nuevo estado
  const [routeError, setRouteError] = useState<string | null>(null);
  const [showStraightLine, setShowStraightLine] = useState<boolean>(false);
  const [usingDefaultLocation, setUsingDefaultLocation] = useState<boolean>(false);

  // permiso para la ubicacion
  useEffect(() => {
    (async () => { 
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          // Usar ubicación por defecto
          setLocation({
            latitude: DEFAULT_LOCATION.latitude,
            longitude: DEFAULT_LOCATION.longitude,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          });
          setUsingDefaultLocation(true);
          return;
        }

        // Intentar obtener ubicación con timeout
        const locationPromise = Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Location timeout')), 5000)
        );

        try {
          const location = await Promise.race([locationPromise, timeoutPromise]) as Location.LocationObject;
          setLocation(location.coords);
          setUsingDefaultLocation(false);
          console.log('✅ Ubicación GPS obtenida:', location.coords);
        } catch (error) {
          console.log('⚠️ No se pudo obtener ubicación GPS, usando ubicación por defecto');
          // Usar ubicación por defecto cuando el emulador no tiene GPS
          setLocation({
            latitude: DEFAULT_LOCATION.latitude,
            longitude: DEFAULT_LOCATION.longitude,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          });
          setUsingDefaultLocation(true);
        }
      } catch (error) {
        console.log('Error al obtener ubicación:', error);
        setLocation({
          latitude: DEFAULT_LOCATION.latitude,
          longitude: DEFAULT_LOCATION.longitude,
          altitude: null,
          accuracy: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        });
        setUsingDefaultLocation(true);
      }
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

  // Efecto para centrar el mapa en el destino cuando se establece
  useEffect(() => {
    if (destination && mapRef.current) {
      // Limpiar estados anteriores
      setRouteError(null);
      setShowStraightLine(false);
      
      // Esperar un poco antes de animar para asegurar que el mapa esté listo
      setTimeout(() => {
        mapRef.current.animateToRegion({
          latitude: destination.latitude,
          longitude: destination.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }, 1000);
      }, 500);
      
      // Limpiar marcador seleccionado para que se muestre la información del destino
      setSelectedMarker(null);
    }
  }, [destination]);

  // Función para validar coordenadas
  const isValidCoordinate = (lat: number, lng: number) => {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 && !isNaN(lat) && !isNaN(lng);
  };

  // Debugging: mostrar información de configuración
  useEffect(() => {
    console.log('🗺️ MovanMap Debug Info:');
    console.log('GOOGLE_MAPS_API_KEY exists:', !!GOOGLE_MAPS_API_KEY);
    console.log('GOOGLE_MAPS_API_KEY length:', GOOGLE_MAPS_API_KEY?.length);
    console.log('Destination:', destination);
    console.log('User location:', location);
  }, [destination, location]);

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

        {/* Direcciones para marcadores seleccionados */}
        {usercurrentlocation && selectedMarker && GOOGLE_MAPS_API_KEY && 
         isValidCoordinate(usercurrentlocation.latitude, usercurrentlocation.longitude) &&
         isValidCoordinate(selectedMarker.latitud, selectedMarker.longitud) && (
          <MapViewDirections
            origin={usercurrentlocation}
            destination={{
              latitude: selectedMarker.latitud,
              longitude: selectedMarker.longitud,
            }}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeColor="#565EB3"
            strokeWidth={5}
            onError={(errorMessage) => {
              console.log('MapViewDirections Error (marker):', errorMessage);
              setRouteError('No se pudo calcular la ruta al marcador seleccionado');
            }}
            onReady={(result) => {
              console.log('Route found (marker):', result.distance, 'km,', result.duration, 'min');
              setRouteError(null);
            }}
          />
        )}

        {/* Direcciones para destino del pedido */}
        {usercurrentlocation && destination && !selectedMarker && GOOGLE_MAPS_API_KEY &&
         isValidCoordinate(usercurrentlocation.latitude, usercurrentlocation.longitude) &&
         isValidCoordinate(destination.latitude, destination.longitude) && (
          <MapViewDirections
            origin={usercurrentlocation}
            destination={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeColor="#FF6B35"
            strokeWidth={6}
            onError={(errorMessage) => {
              console.log('MapViewDirections Error (destination):', errorMessage);
              console.log('Origin:', usercurrentlocation);
              console.log('Destination:', destination);
              setRouteError('No se pudo calcular la ruta al punto de recogida');
              setShowStraightLine(true);
            }}
            onReady={(result) => {
              console.log('Route found (destination):', result.distance, 'km,', result.duration, 'min');
              setRouteError(null);
              setShowStraightLine(false);
            }}
          />
        )}

        {/* Marcador para el destino del pedido */}
        {destination && (
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            title="Punto de Recogida"
            description={destination.address}
            pinColor="#FF6B35"
          />
        )}

        {/* Línea recta como fallback cuando no hay ruta disponible */}
        {usercurrentlocation && destination && showStraightLine && (
          <Polyline
            coordinates={[
              {
                latitude: usercurrentlocation.latitude,
                longitude: usercurrentlocation.longitude,
              },
              {
                latitude: destination.latitude,
                longitude: destination.longitude,
              },
            ]}
            strokeColor="#FF9800"
            strokeWidth={3}
            lineDashPattern={[5, 5]}
          />
        )}
      </MapView>

      {/* Información del marcador seleccionado */}
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

      {/* Información del destino del pedido */}
      {destination && usercurrentlocation && !selectedMarker && (
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            left: 20,
            backgroundColor: 'rgba(255,101,53,0.95)',
            padding: 12,
            borderRadius: 10,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            minWidth: 250,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>
            🚚 Punto de Recogida:
          </Text>
          <Text style={{ fontSize: 14, color: '#fff', marginBottom: 4 }}>
            {destination.address}
          </Text>
          <Text style={{ fontSize: 13, color: '#fff' }}>
            Distancia: {(
              getDistanceFromLatLonInKm(
                usercurrentlocation.latitude,
                usercurrentlocation.longitude,
                destination.latitude,
                destination.longitude
              )
            ).toFixed(2)} km
          </Text>
        </View>
      )}

      {/* Mensaje de error de ruta */}
      {routeError && (
        <View
          style={{
            position: 'absolute',
            top: 50,
            left: 20,
            right: 20,
            backgroundColor: 'rgba(255, 87, 87, 0.9)',
            padding: 10,
            borderRadius: 8,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>
            ⚠️ {routeError}
          </Text>
          <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', marginTop: 4 }}>
            Usando distancia en línea recta
          </Text>
        </View>
      )}

      {/* Mensaje cuando no hay API key */}
      {!GOOGLE_MAPS_API_KEY && (
        <View
          style={{
            position: 'absolute',
            top: 50,
            left: 20,
            right: 20,
            backgroundColor: 'rgba(255, 193, 7, 0.9)',
            padding: 10,
            borderRadius: 8,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>
            🔑 API Key de Google Maps no configurada
          </Text>
          <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', marginTop: 4 }}>
            Las rutas no se mostrarán
          </Text>
        </View>
      )}

      {/* Mensaje cuando se usa ubicación por defecto */}
      {usingDefaultLocation && (
        <View
          style={{
            position: 'absolute',
            top: 50,
            left: 20,
            right: 20,
            backgroundColor: 'rgba(33, 150, 243, 0.9)',
            padding: 10,
            borderRadius: 8,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>
            📍 Usando ubicación simulada (Resistencia, Argentina)
          </Text>
          <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', marginTop: 4 }}>
            Configura GPS en el emulador para ubicación real
          </Text>
        </View>
      )}
    </View>
  );
}
