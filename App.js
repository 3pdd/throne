import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location'

export default function App() {
  //state to hold displayed map region. defaults to times square.
  const [mapRegion, setMapRegion] = useState({
    latitude: 40.7581453341777,
    longitude: -73.98555333108439,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
  })
  const [bathrooms, setBathrooms] = useState([]);

  //change this to ur local ip
  const host = 'http://192.168.1.8:3000'

  async function logJSONData() {
    const response = await fetch(`${host}/NYrestrooms`);
    const jsonData = await response.json();
    setBathrooms(jsonData)
  }

  //function to request location permission and set mapRegion state if allowed.
  const userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05
    })
  }

  //getting bathrooms
  useEffect(() => {
    logJSONData();
  }, [])
  //request location on bootup
  useEffect(() => {userLocation()}, [])

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='Marker' />
        {bathrooms.length && <Marker coordinate={{
          latitude: bathrooms[0].latitude,
          longitude: bathrooms[0].longitude
        }}/>}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
