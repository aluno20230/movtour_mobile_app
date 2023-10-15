import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, Image, Dimensions, TouchableOpacity, Button, AppState } from 'react-native';
import './config/I18N/i18n';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeScreen } from 'react-native-screens';
import { BleManager } from 'react-native-ble-plx';
import { displayNotification } from './Notification';
import RNFetchBlob from 'rn-fetch-blob';
import { stringToBytes } from 'convert-string';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { use } from 'i18next';
import { Alert } from 'react-native';




const { width } = Dimensions.get('window');
const bleManager = new BleManager();
const jsonDataUrl = 'https://movtour.ipt.pt/monuments.json';
const navigation = useNavigation();

async function fetchJsonData() {
  try {
    const response = await fetch(jsonDataUrl);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching JSON data:', error);
    return null;
  }
}



// Scan for BLE devices (beacons) and listen for advertisements
async function startBeaconScan() {
  const jsonData = await fetchJsonData();

  if (!jsonData) {
    console.error('Failed to fetch JSON data. Cannot compare beacons.');
    return;
  }

  bleManager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.error('BLE scan error:', error);
      console.error('Error message:', error.message);
      return;
    }


    const base64 = RNFetchBlob.base64;
    const advertisingData = stringToBytes(base64.decode(device.manufacturerData),);
    const rssi = device.rssi;
    const name = device.localName;
    const majorM = advertisingData[21]; // => this is major data
    const minorM = advertisingData[23]; // this is minor data
    const appState = AppState.currentState;

    //console.log('majorM: ', majorM);
    //console.log('minorM: ', minorM);

    //console.log('Found BLE device:', device.name, device.id);

    // Check if the detected device is a beacon based on its properties
    //if (majorM == 0 && minorM == 70) {
    //console.log('Encontrei o beacon do Rui, com o major:', majorM, 'e o minor:', minorM);
    //displayNotification();
    //}

    //if (majorM == 0 && minorM == 8) {
    //console.log('Encontrei o beacon do Rafael, com o major:', majorM, 'e o minor:', minorM);
    //displayNotification();
    //}


    if (Array.isArray(jsonData.monuments)) {
      jsonData.monuments.forEach((monument) => {
        if (Array.isArray(monument.pois)) {
          monument.pois.forEach((poi) => {
            if (Array.isArray(poi.beacons)) {
              poi.beacons.forEach((beaconData) => {
                if (
                  beaconData.major === majorM &&
                  beaconData.minor === minorM
                ) {
                  //console.log('Found matching beacon in JSON data:', beaconData);
                  //console.log('Encontrei o beacon, com o major:', majorM, 'e o minor:', minorM);
                  //console.log('POI Data:', poi);


                  if (appState === 'active') {
                    navigation.navigate('DetalhesMonumento', { poi });
                    console.log('Estado da app', appState);
                  }

                  if (appState === 'background') {
                    //navigation.navigate('DetalhesMonumento', { poi });
                    displayNotification(poi);
                    console.log('Estado da app', appState);
                  }

                  //Hora do Scan
                  const now = new Date();
                  const hours = now.getHours().toString().padStart(2, '0');
                  const minutes = now.getMinutes().toString().padStart(2, '0');
                  const seconds = now.getSeconds().toString().padStart(2, '0');
                  console.log(`Último scan ocorreu às: ${hours}:${minutes}:${seconds}`);




                }
              });
            } else {
              console.error('POI has no beacon data or invalid data:', poi);
            }
          });
        } else {
          console.error('Monument has no POI data or invalid data:', monument);
        }
      });
    } else {
      console.error('No monuments data found in JSON:', jsonData);
    }


  });



}




const ListaMonumentos = () => {
  const { t, i18n } = useTranslation();

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



  useEffect(() => {

    return notifee.onForegroundEvent(({ type, detail }) => {

      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification');
          break;
        case EventType.PRESS:
          console.log('User pressed an action button (Foreground)'/*, detail.notification, detail.notification.data.poi*/);
          const poi = detail.notification.data.poi;
          navigation.navigate('DetalhesMonumento', { poi });
          //console.log('POI****************************************: ', poi);
          break;
      }

    });
  }, []);

  useEffect(() => {
    return notifee.onBackgroundEvent(async ({ type, detail }) => {

      if (type === EventType.PRESS) {
        console.log('User pressed an action button (Background)'/*, detail.notification*/);
        const poi = detail.notification.data.poi;
        navigation.navigate('DetalhesMonumento', { poi });
      }

    });
  }, []);




  const handleImageClick = (poi) => {
    // Navega para a tela de detalhes e passa os dados do monumento como parâmetro
    navigation.navigate('DetalhesMonumento', { poi });
    //console.log('DADOS DO POI -->', poi);
  };

  return (
    <View style={styles.container}>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}

        numColumns={2} // Display 2 POIs per row
        renderItem={({ item }) => (


          <TouchableOpacity
            style={[styles.poiContainer, { marginRight: 3 }, { marginLeft: -1 }]}
            onPress={() => handleImageClick(item)}
          >
            <Image source={{ uri: item.cover_image }} style={styles.image} />
            <Text style={styles.customText}>{getPoiName(item, i18n.language)}</Text>

            {/*}
            {item.beacons.map((beaconData, index) => (

              <View key={index}>
                <Text>Beacon {index + 1}:</Text>
                <Text>UUID: {beaconData.uuid}</Text>
                <Text>Major: {beaconData.major}</Text>
                <Text>Minor: {beaconData.minor}</Text>
              </View>
            ))}
              */}

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

export { ListaMonumentos, startBeaconScan };