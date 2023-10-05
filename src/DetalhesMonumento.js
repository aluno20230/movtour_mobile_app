import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import './config/I18N/i18n';
import { useTranslation } from 'react-i18next';
import he from 'he';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';

const DetalhesMonumento = ({ route }) => {
  const { poi } = route.params;
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [selectedContentType, setSelectedContentType] = useState('Iniciação'); // Initialize selectedContentType with a default value
  const [showIMDbPage, setShowIMDbPage] = useState(false);
  const [imdbUrl, setImdbUrl] = useState(''); 



  const contentTypes = [
    'Iniciação',
    'Divulgação',
    'Aprofundamento',
    'Investigação',
  ].map((contentType) => contentType); // Translate content types

  const handleMovieIconPress = (imdbUrl) => {
    if (imdbUrl) {
      setImdbUrl(imdbUrl);
      setShowIMDbPage(true); // Set showIMDbPage to true to display the WebView
    } else {
      console.error('Invalid IMDb URL');
    }
  };

  const handleGoBack = () => {
    setShowIMDbPage(false);
    setImdbUrl(''); // Clear the IMDb URL
  };
  
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
      const map = L.map('map').setView([${poi.latitude}, ${poi.longitude}], 15);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      L.marker([${poi.latitude}, ${poi.longitude}]).addTo(map)
        .bindPopup('${poi[`name_${i18n.language}`]}').openPopup();

    </script>
  </body>
  </html>
`;
const [decodedDescription, setDecodedDescription] = useState(''); // Initialize decodedDescription

const handleContentTypeChange = (contentType) => {
  setSelectedContentType(contentType);
};
useEffect(() => {
  console.log('selectedContentType:', selectedContentType);
  // Access the description of the selected POI based on selectedDescriptionType
  const descriptionObject = poi.poi_descriptions.find(
    (description) => description.description_type_name === selectedContentType
  );

  // Get the description based on the selected language
  const selectedLanguageDescription = descriptionObject
    ? descriptionObject[`description_${i18n.language}`]
    : 'Description not found';

  const plainTextDescription = selectedLanguageDescription.replace(/<[^>]*>/g, '');
  const decodedDescription = he.decode(plainTextDescription);
  

  // Update the decodedDescription when selectedDescriptionType changes
  setDecodedDescription(decodedDescription);
}, [selectedContentType]);

  return (
    <View style={styles.container}>
    {showIMDbPage ? (
      // Display only the WebView when showIMDbPage is true
      <WebView source={{ uri: imdbUrl }} onError={(syntheticEvent) => console.error('WebView error:', syntheticEvent.nativeEvent)} />
    ) : (
      // Display the rest of the content when showIMDbPage is false
      <ScrollView>
        <Image source={{ uri: poi.cover_image }} style={styles.image} />
        <Text style={styles.monumentName}>{t(poi[`name_${i18n.language}`])}</Text>
        <TouchableOpacity onPress={handleButtonPress} style={styles.iconButton}>
          <FontAwesomeIcon name="map-pin" size={30} color="#E36509" /><FontAwesomeIcon  />
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          {contentTypes.map((contentType) => (
            <TouchableOpacity
              key={contentType}
              onPress={() => handleContentTypeChange(contentType)}
              style={styles.button}
            >
              <Text>{contentType}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.container}>{decodedDescription}</Text>
        
        {poi.movies.length > 0 && (
          <>
            <Text style={styles.movieHeaderText}>{t('Filmes ou séries gravados neste local:')}</Text>

            <ScrollView horizontal={true}>
            <View style={styles.movieList}>
              {poi.movies.map((movie, index) => (
                 <View key={`${movie.id}-${index}`} style={styles.movieItem}>
                  <TouchableOpacity onPress={() => handleMovieIconPress(movie.imdb)}>
                    <Image source={{ uri: movie.poster }} style={styles.poster} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            </ScrollView>
          </>
        )}
      </ScrollView>
    )}
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
    position: 'relative',
  }, 
  poster: {
    width: '100%', // Take the full width of the parent container
    height: 100,   // Set a fixed height of 100
    aspectRatio: 16 / 9, // Maintain a 16:9 aspect ratio (adjust as needed)
    resizeMode: 'cover',
    borderWidth: 2, // Adjust the border width as needed
    borderColor: '#CB7C05', // Change to your desired border color
  },
  button: {
    backgroundColor: '#E36509', // Background color of the button
    padding: 5, // Adjust padding as needed
    borderRadius: 10, // Add rounded corners
    marginTop: 2, 
    alignItems: 'center', // Center align text horizontally
  },
  movieList: {
    flexDirection: 'row', // Ensure horizontal layout
    alignItems: 'center',  // Center items horizontally if needed
  },
  buttonsContainer: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Distribute items evenly along the row
    marginBottom: 10, // Optional spacing between the buttons and other content
  },
  iconButton: {
    position: 'absolute',
    top: 260, 
    left: 350,
    backgroundColor: 'transparent',
    alignItems: 'center', // Center align text horizontall
    padding: 2,
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
  movieHeaderText: {
    fontSize: 15, // Customize the font size
    fontWeight: 'bold', // Customize the font weight
    color: '#D75307', // Customize the text color
    borderBottomWidth: 1, // You can adjust the border width as needed
    borderBottomColor: 'gray', // You can change the color to your desired color
    marginBottom: 5, // Optional: Add some space below the line
  },
});

export default DetalhesMonumento;