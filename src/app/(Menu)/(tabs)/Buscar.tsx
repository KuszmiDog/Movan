import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import MapView, { Marker } from 'react-native-maps';

const GOOGLE_MAPS_API_KEY = 'API_KEY'; // reemplazar con APIKEY (hay que ver si es rentable o no :C)

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

const Buscar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [noResults, setNoResults] = React.useState(false);


  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchQuery
        )}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const firstResult = data.results[0];
        const { lat, lng } = firstResult.geometry.location;

        setUserLocation({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        setSearchResults([
          {
            geometry: { location: { lat, lng } },
            name: firstResult.formatted_address,
            vicinity: firstResult.formatted_address,
          },
        ]);
        setNoResults(false);
      } else {
        setSearchResults([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      setNoResults(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar particulares en ubicación determinada</Text>
      <View style={styles.menuContainer}>
        <MapView
          style={{ width: '100%', height: verticalScale(350), borderRadius: moderateScale(10), marginBottom: verticalScale(20) }}
          showsUserLocation
          followsUserLocation
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          {...(userLocation ? { region: userLocation } : {})}
        >
          {searchResults.map((result, idx) => (
            <Marker
              key={idx}
              coordinate={{
                latitude: result.geometry.location.lat,
                longitude: result.geometry.location.lng,
              }}
              title={result.name}
              description={result.vicinity}
            />
          ))}
        </MapView>
        <TextInput
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 10,
            width: '100%',
            marginBottom: verticalScale(10),
          }}
          placeholder="Buscar particulares en ubicación determinada"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.menuButton} onPress={handleSearch}>
          <Text style={styles.menuButtonText}>Buscar</Text>
        </TouchableOpacity>
        {noResults && (
          <Text style={{ color: 'white', marginTop: 10 }}>
            No se encontraron resultados para tu búsqueda.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: verticalScale(20),
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(30),
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    fontSize: 16,
    color: '#000',
  },
  menuContainer: {
    width: '100%',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: '#262E93',
    width: '80%',
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    marginBottom: verticalScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Buscar;