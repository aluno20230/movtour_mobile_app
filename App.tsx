import { createDrawerNavigator } from '@react-navigation/drawer';
import About from './src/About';
import Mapa from './src/Mapa';
import Lingua from './src/Lingua';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image } from 'react-native';
import './src/config/I18N/i18n';
import { useTranslation } from 'react-i18next';
import TipodeConteudo from './src/TipodeConteudo';
import { createStackNavigator } from '@react-navigation/stack';
import ListaMonumentos from './src/Monumentos'; // Importa a lista de monumentos
import DetalhesMonumento from './src/DetalhesMonumento'; // Importea os detalhes de monumentos
import MapaMonumento  from './src/MapaMonumento';// Importa o mapa com a localização de monumentos
import { PermissionsAndroid } from 'react-native';
import React, { useEffect } from 'react';
import { startBeaconScan } from './src/BLE';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function StackNavigator() {
  const { t, i18n } = useTranslation();
  return (
          <Stack.Navigator>
        <Stack.Screen name={t(' Monumentos')}  component={ListaMonumentos} options={{ 
          headerTitleAlign: 'center', // Center align the header title
          headerTitleStyle: {
            color: '#CC6600', // Set the color of the header title text
            fontSize: 30, 
          },
          headerStyle: {backgroundColor: '#E8E8E8', 
              }
            }} />  
        <Stack.Screen name={t('DetalhesMonumento')} component={DetalhesMonumento} options={{
          title: '',
          headerStyle: {backgroundColor: '#E8E8E8', // Make the header background transparent
              }, 
            }} />  
        <Stack.Screen name="MapaMonumento" component={MapaMonumento} options={{
          title: '', 
          headerStyle: {backgroundColor: '#E8E8E8', // Make the header background transparent
        },
            }} /> 
      </Stack.Navigator>
    
  );
}

function DrawerNavigator() {
  const { t, i18n } = useTranslation();
  return (
      <Drawer.Navigator initialRouteName="Monumentos">
      <Drawer.Screen name={t('Monumentos')} component={StackNavigator} 
      options={{
        headerTitleAlign: 'center', // Center align the header title
          headerStyle: {
            backgroundColor: '#E8E8E8', // Make the header background transparent
              },
              headerTitle: () => (
                  <Image
                    source={require('./src/config/pictures/movtour_logo.png')}
                    style={{
                    width: 50, 
                    height: 50,
                  }}
                />
               ),
            }} /> 
    
      <Drawer.Screen name={t('Mapa')} component={Mapa} 
      options={{
        headerTitleAlign: 'center', // Center align the header title
          headerStyle: {
            backgroundColor: '#E8E8E8', // Make the header background transparent
              },
              headerTitle: () => (
                  <Image
                    source={require('./src/config/pictures/movtour_logo.png')}
                    style={{
                    width: 50, 
                    height: 50,
                  }}
                />
               ),
            }}/>
      <Drawer.Screen name={t('Sobre nós')} component={About} 
      options={{
        headerTitleAlign: 'center', // Center align the header title
          headerStyle: {
            backgroundColor: '#E8E8E8', // Make the header background transparent
              },
              headerTitle: () => (
                  <Image
                    source={require('./src/config/pictures/movtour_logo.png')}
                    style={{
                    width: 50, 
                    height: 50,
                  }}
                />
               ),
            }}/>
      <Drawer.Screen name={t('Língua')} component={Lingua} 
      options={{
        headerTitleAlign: 'center', // Center align the header title
          headerStyle: {
            backgroundColor: '#E8E8E8', // Make the header background transparent
              },
              headerTitle: () => (
                  <Image
                    source={require('./src/config/pictures/movtour_logo.png')}
                    style={{
                    width: 50, 
                    height: 50,
                  }}
                />
               ),
            }}/>
      <Drawer.Screen name={t('Tipo de conteúdo')} component={TipodeConteudo} 
      options={{
        headerTitleAlign: 'center', // Center align the header title
          headerStyle: {
            backgroundColor: '#E8E8E8', // Make the header background transparent
              },
              headerTitle: () => (
                  <Image
                    source={require('./src/config/pictures/movtour_logo.png')}
                    style={{
                    width: 50, 
                    height: 50,
                  }}
                />
               ),
            }}/>
    </Drawer.Navigator>
  );
}

function App() {
  
  const changeLanguage = value => {
    console.log(value);
  }

  useEffect(() => {

    async function requestPermissions() {

      //Localização
      try {
        
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to location to detect beacons.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
    
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location Permission granted.');
          
        } else {
          console.log('Location Permission denied.');
        }
      } catch (err) {
        console.warn(err);
        console.error('Location Permission error:', err);
      }

      //Bluetooth scan
      try {
        
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          {
            title: 'Bluetooth scan Permission',
            message: 'App needs access to Bluetooth scan to detect beacons.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
    
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Bluetooth scan Permission granted.');
          
        } else {
          console.log('Bluetooth scan Permission denied.');
        }
      } catch (err) {
        console.warn(err);
        console.error('Bluetooth scan Permission error:', err);
      }

      //Bluetooth connect
      try {
        
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          {
            title: 'Bluetooth connect Permission',
            message: 'App needs access to Bluetooth connect to detect beacons.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
    
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Bluetooth connect Permission granted.');
          // Start beacon detection when the app loads
          startBeaconScan();
          
        } else {
          console.log('Bluetooth connect Permission denied.');
        }
      } catch (err) {
        console.warn(err);
        console.error('Bluetooth connect Permission error:', err);
      }

    }
    
    // Call the function to request permissions when the app starts
    requestPermissions();


    
    
  }, []);
  
  return (
    <NavigationContainer>
       <DrawerNavigator />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  safeArea:{
    flex: 1
  },
  container:{
    flex: 1,
  },
  header:{
    height:100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  listItemBG:{
    backgroundColor: '#DFDFDF'
  },
  logo:{
    width:75,
    height:75,
  },
  flag:{
    width:20,
    height:20,
  },
})

export default App;