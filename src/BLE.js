import { BleManager } from 'react-native-ble-plx';
import { displayNotification } from './Notification';
import RNFetchBlob from 'rn-fetch-blob';
import {stringToBytes} from 'convert-string';

const bleManager = new BleManager();

// Scan for BLE devices (beacons) and listen for advertisements
function startBeaconScan() {
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
      const major = advertisingData[21]; // => this is major data
      const minor = advertisingData[23]; // this is minor data

      //console.log('major: ', major);
      //console.log('minor: ', minor);

    //console.log('Found BLE device:', device.name, device.id);

    // Check if the detected device is a beacon based on its properties
    if (major == 0 && minor == 70) {
      console.log('Encontrei o beacon do Rui, com o major:', major, 'e o minor:', minor);
      displayNotification();
    }

    if (major == 0 && minor == 8) {
        console.log('Encontrei o beacon do Rafael, com o major:', major, 'e o minor:', minor);
        displayNotification();
      }

  });
}

export { startBeaconScan };
