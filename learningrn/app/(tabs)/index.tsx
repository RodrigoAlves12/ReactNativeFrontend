import React, { useRef, useState } from 'react';
import MapView, { Region, Marker } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons'; 
import { restaurants } from './restaurantes';

function Index() {
  const mapRef = useRef<MapView>(null);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [searchText, setSearchText] = useState('');

  const initialRegion: Region = {
    latitude: 39.3999,
    longitude: -8.2245,
    latitudeDelta: 5.1,
    longitudeDelta: 5.0,
  };

  const goToCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const newRegion: Region = {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setCurrentLocation({ latitude, longitude });
    mapRef.current?.animateToRegion(newRegion, 1000);
  };

  const onRegionChangeComplete = (region: Region) => {
    if (region.latitudeDelta < 0.05 && region.longitudeDelta < 0.05) {
      setShowRestaurants(true);
    } else {
      setShowRestaurants(false);
    }
  };

  const handleSearch = () => {
    const restaurant = restaurants.find(r => r.name.toLowerCase() === searchText.toLowerCase());
    if (restaurant) {
      const newRegion: Region = {
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current?.animateToRegion(newRegion, 1000);
    } else {
      Alert.alert('Not Found', 'Restaurant not found');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a restaurant"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} title="You are here" />
        )}
        {showRestaurants && restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: restaurant.latitude, longitude: restaurant.longitude }}
            onPress={() => Alert.alert('Restaurant', restaurant.name)}
          >
            <View style={styles.marker}>
              <Image source={{ uri: restaurant.image }} style={styles.markerImage} />
            </View>
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity style={styles.locationButton} onPress={goToCurrentLocation}>
        <Ionicons name="locate" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchBar: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  marker: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    overflow: 'hidden',
  },
  markerImage: {
    width: 40,
    height: 40,
  },
});

export default Index;