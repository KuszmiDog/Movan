import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import styles from '@/src/constants/MovanMap_styles/MovanMapScreen_styles';
import * as Location from 'expo-location';
import { markers } from '@/src/assets/markers/marker';
import MapViewDirections from 'react-native-maps-directions';
import Constants from 'expo-constants';
import { usePedido } from '@/src/utils/PedidoContext';

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
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  
  // Usar el contexto de pedidos
  const { destinoNavegacion, pedidoActivo, estadoPedido } = usePedido();

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

  // Animar hacia el destino cuando hay navegación activa
  const animateMapToDestination = () => {
    if (mapRef.current && destinoNavegacion) {
      mapRef.current.animateToRegion({
        latitude: destinoNavegacion.latitude,
        longitude: destinoNavegacion.longitude,
        latitudeDelta: INITIAL_REGION.latitudeDelta,
        longitudeDelta: INITIAL_REGION.longitudeDelta,
      }, 500);
    }
  };

  // Función para mostrar tanto origen como destino en el mapa
  const fitToRoute = () => {
    if (mapRef.current && location && destinoNavegacion) {
      const coordinates = [
        {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        {
          latitude: destinoNavegacion.latitude,
          longitude: destinoNavegacion.longitude,
        }
      ];
      
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  useEffect(() => {
    if (destinoNavegacion && location) {
      // Si hay destino y ubicación, mostrar la ruta completa
      setTimeout(() => fitToRoute(), 1000); // Pequeño delay para asegurar que el mapa esté listo
    } else if (location) {
      // Si solo hay ubicación, centrar en el usuario
      animateMapToUserLocation();
    }
  }, [location, destinoNavegacion]);


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

        {/* Mostrar rutas hacia destino de pedido activo si existe */}
        {usercurrentlocation && destinoNavegacion && (
          <MapViewDirections
            origin={usercurrentlocation}
            destination={{
              latitude: destinoNavegacion.latitude,
              longitude: destinoNavegacion.longitude,
            }}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeColor={estadoPedido === 'recogiendo' ? "#FF6B35" : "#4CAF50"}
            strokeWidth={6}
            onReady={(result) => {
              // Ajustar la vista para mostrar toda la ruta
              if (mapRef.current) {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: { top: 80, right: 80, bottom: 120, left: 80 },
                  animated: true,
                });
              }
            }}
            onError={(errorMessage) => {
              console.log('Error en MapViewDirections:', errorMessage);
              // En caso de error, al menos centrar en el destino
              animateMapToDestination();
            }}
          />
        )}

        {/* Marcador del destino del pedido activo */}
        {destinoNavegacion && (
          <Marker
            coordinate={{
              latitude: destinoNavegacion.latitude,
              longitude: destinoNavegacion.longitude,
            }}
            title={estadoPedido === 'recogiendo' ? "Punto de Recogida" : "Punto de Entrega"}
            description={destinoNavegacion.address}
            pinColor={estadoPedido === 'recogiendo' ? "orange" : "green"}
          />
        )}

        {/* Rutas hacia marcadores seleccionados (funcionalidad original) */}
        {usercurrentlocation && selectedMarker && !destinoNavegacion && (
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

      {/* Información del destino del pedido activo */}
      {destinoNavegacion && usercurrentlocation && (
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            left: 20,
            right: 20,
            backgroundColor: estadoPedido === 'recogiendo' ? 'rgba(255, 107, 53, 0.95)' : 'rgba(76, 175, 80, 0.95)',
            padding: 15,
            borderRadius: 12,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', marginBottom: 5 }}>
            {estadoPedido === 'recogiendo' ? "🚚 Dirigiéndose a Recoger" : "📦 Dirigiéndose a Entregar"}
          </Text>
          <Text style={{ fontSize: 14, color: 'white', marginBottom: 4 }}>
            {destinoNavegacion.address}
          </Text>
          <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>
            Distancia: {(
              getDistanceFromLatLonInKm(
                usercurrentlocation.latitude,
                usercurrentlocation.longitude,
                destinoNavegacion.latitude,
                destinoNavegacion.longitude
              )
            ).toFixed(2)} km
          </Text>
          {pedidoActivo && (
            <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 2 }}>
              Cliente: {pedidoActivo.cliente.nombre} • ${pedidoActivo.precio}
            </Text>
          )}
        </View>
      )}

      {/* Información del marcador seleccionado (funcionalidad original) */}
      {selectedMarker && usercurrentlocation && !destinoNavegacion && (
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
