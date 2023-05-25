import {PermissionsAndroid, Platform} from 'react-native';

type PermissionCallback = (result: boolean) => void;

interface BluetoothLowEnergyApi {
  requestPermissions(callback: PermissionCallback): Promise<void>;

}

export default function useBLE(): BluetoothLowEnergyApi {
  const requestPermissions = async (callback: PermissionCallback) => {
    if (Platform.OS === 'android') {
        const grantedSatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonNeutral: 'Ask Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
          callback(grantedSatus === PermissionsAndroid.RESULTS.granted);
    }else{
        callback(true);
    }
    };

    return{
        requestPermissions,
    };
}


  