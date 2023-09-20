
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import './config/I18N/i18n';
import { useTranslation } from 'react-i18next';
import he from 'he';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetalhesMonumento = ({ route }) => {
  const { monument } = route.params;
  const { t, i18n } = useTranslation();
  //Remove as tags existentes da descrição
  const plainTextDescription = monument.description.replace(/<[^>]*>/g, '');
  //Configura o texto para apresentar os caracteres especiais corretamente
  const decodedDescription = he.decode(plainTextDescription);
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('MapaMonumento', { htmlScript });
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
      const map = L.map('map').setView([${monument.latitude}, ${monument.longitude}], 15);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      L.marker([${monument.latitude}, ${monument.longitude}]).addTo(map)
        .bindPopup('${monument.name}').openPopup();
    </script>
  </body>
  </html>
`;
  return (
    <View style={styles.container}>
    <Text style={styles.monumentName}>{t(monument.name)}</Text>
    <Image
      source={{ uri: monument.cover_image }}
      style={styles.image}
    />
    <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
    <Icon name="location-pin" size={24} color="orange" /> 
      </TouchableOpacity>
    <ScrollView>
    <Text>{t(decodedDescription)}</Text>
    </ScrollView>
    
  </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E8E8E8',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderWidth: 2, // Adjust the border width as needed
    borderColor: '#CB7C05', // Change to your desired border color
  },
  
  monumentName: {
    fontSize: 24, // Customize the font size
    fontWeight: 'bold', // Customize the font weight
    color: '#CB7C05', // Customize the text color
    textAlign: 'center',
    borderBottomWidth: 1, // You can adjust the border width as needed
    borderBottomColor: 'gray', // You can change the color to your desired color
    marginBottom: 10, // Optional: Add some space below the line
  },
});

export default DetalhesMonumento;