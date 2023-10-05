import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import './config/I18N/i18n';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const [poi, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const navigation = useNavigation(); // Use the useNavigation hook to obtain the navigation object

  useEffect(() => {
    // Fetch the JSON data from your API or file
    fetch('https://movtour.ipt.pt/monuments.json')
      .then((response) => response.json())
      .then((jsonData) => {
      // Flatten the data array to get all POIs
       const allPois = jsonData.monuments.flatMap((monument) => monument.pois);
       setData(allPois);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const createMarkersScript = () => {
    const markers = poi.map((poi) => {
      return `
      L.marker([${poi.latitude}, ${poi.longitude}])
        .bindPopup('${poi[`name_${i18n.language}`]}')
        .addTo(map)
        .on('popupopen', function () {
          // Navigate to DetalhesMonumento screen with the selected POI
          const poiData = ${JSON.stringify(poi)};
          window.ReactNativeWebView.postMessage(JSON.stringify(poiData));
        });
      `;
    });

    return markers.join('');
  };

  const htmlScript = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Leaflet Map</title>
      <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7/leaflet.css">
      <style>
        body { padding: 0; margin: 0; }
        html, body, #map { height: 100%; width: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="http://cdn.leafletjs.com/leaflet-0.7/leaflet.js"></script>
      <script>
        const map = L.map('map').setView([39.6054, -8.4133], 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        ${createMarkersScript()} // Create markers for each monument location
      </script>
    </body>
    </html>
  `;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.Container}>
      <WebView
  source={{ html: htmlScript }}
  style={styles.Webview}
  onMessage={(event) => {
    const poiData = JSON.parse(event.nativeEvent.data);
    if (poiData) {
      // Navigate to DetalhesMonumento screen with the selected POI
      navigation.navigate('DetalhesMonumento', { poi: poiData });
    }
  }}
/>
        <View style={styles.ButtonArea}></View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 3,
    backgroundColor: 'grey',
  },
  Webview: {
    flex: 2,
  },
});

export default App;