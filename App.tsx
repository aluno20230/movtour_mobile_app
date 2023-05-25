import { createDrawerNavigator } from '@react-navigation/drawer';
import About from './src/About';
import Mapa from './src/Mapa';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Button, Alert, Linking } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { BleManager as BleManagerPlx } from 'react-native-ble-plx';

const Drawer = createDrawerNavigator();

const bleManager = new BleManagerPlx();

const openBluetoothSettings = () => {
  Linking.openSettings();
};

const App = () => {
  useEffect(() => {
    checkBluetoothStatus();
  }, []);

  const checkBluetoothStatus = async () => {
    try {
      const state = await bleManager.state();

      if (state !== 'PoweredOn') {
        Alert.alert(
          'Bluetooth Required',
          'Please enable Bluetooth to use this app.',
          [
            {
              text: 'Open Settings',
              onPress: openBluetoothSettings
            },
            {
              text: 'Cancel',
              style: 'cancel'
            }
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log('Bluetooth status error:', error);
    }
  };

  
  return (
    
    <NavigationContainer>
      
    <Drawer.Navigator initialRouteName="Mapa">
      <Drawer.Screen name="Mapa" component={Mapa} />
      <Drawer.Screen name="Sobre nós" component={About} />
    </Drawer.Navigator>
  </NavigationContainer>
  
  );
}



export default App;