import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, Image, Dimensions, TouchableOpacity, Button   } from 'react-native';
import './config/I18N/i18n';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');


const ListaMonumentos = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const getPoiName = (item, selectedLanguage) => {
    switch (selectedLanguage) {
      case 'en':
        return item.name_en;
      case 'fr':
        return item.name_fr;
      case 'de':
        return item.name_de;
      default:
        return item.name_pt; // Default to Portuguese
    }
  };


  useEffect(() => {
    // Attempt to fetch data from local storage
    AsyncStorage.getItem('cachedData')
      .then((cachedData) => {
        if (cachedData) {
          // Use the cached data if available
          setData(JSON.parse(cachedData));
        }
      })
      .catch((error) => {
        console.error('Error fetching cached data:', error);
      });
  
    // Fetch new data from the internet
    fetch('https://movtour.ipt.pt/monuments.json')
      .then((response) => response.json())
      .then((jsonData) => {
        // Flatten the data array to get all POIs
        const allPois = jsonData.monuments.flatMap((monument) => monument.pois);
        setData(allPois);
  
        // Store the fetched data locally for offline use
        AsyncStorage.setItem('cachedData', JSON.stringify(allPois))
          .then(() => {
            console.log('Data cached successfully');
          })
          .catch((error) => {
            console.error('Error caching data:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleImageClick = (poi) => {
    // Navega para a tela de detalhes e passa os dados do monumento como parâmetro
    navigation.navigate('DetalhesMonumento', { poi });
  };

  return (
    <View style={styles.container}>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Display 2 POIs per row
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.poiContainer, { marginRight: 3}, { marginLeft: -1}]}
            onPress={() => handleImageClick(item)}
          >
            <Image source={{ uri: item.cover_image }} style={styles.image} />
            <Text style={styles.customText}>{getPoiName(item, i18n.language)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#E8E8E8',
  },
  image: {
    width: '100%', // Adjust image width to occupy the entire container
    height: 150,
    borderWidth: 2,
    borderColor: '#0066CC',
  },
  customText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#CB7C05',
    width: '100%', // Adjust text width to occupy the entire container
    overflow: 'hidden', // Hide any text that overflows the width
    textAlign: 'center'
  },
  poiContainer: {
    width: '50%', // Each POI takes up 50% of the row width
  },
});

export default ListaMonumentos;