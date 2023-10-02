import { BleManager } from 'react-native-ble-plx';
import { displayNotification } from './Notification';

const bleManager = new BleManager();

// Scan for BLE devices (beacons) and listen for advertisements
function startBeaconScan() {
  bleManager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.error('BLE scan error:', error);
      console.error('Error message:', error.message);
      return;
    }

    //console.log('Found BLE device:', device.name, device.id);

    // Check if the detected device is a beacon based on its properties
    if (device.id == 'C4:F3:12:19:CF:5E') {
      console.log('Encontrei o beacon do Rui, com o MAC:', device.id);
      displayNotification();
    }

    if (device.id == 'C4:F3:12:19:CF:0F') {
        console.log('Encontrei o beacon do Rafael, com o MAC:', device.id);
        displayNotification();
      }

  });
}

export { startBeaconScan };
