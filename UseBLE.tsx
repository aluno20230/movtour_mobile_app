const App = () => {
    useEffect(() => {
      checkBluetoothStatus();
    }, []);
  
    const checkBluetoothStatus = async () => {
      try {
        const enabled = await BluetoothStateManager.getState();
        
        if (enabled !== BluetoothStateManager.BluetoothState.POWERED_ON) {
          Alert.alert(
            'Bluetooth Required',
            'Please enable Bluetooth to use this app.',
            [
              {
                text: 'OK',
                onPress: () => {
                  BluetoothStateManager.requestToEnable();
                }
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
      <View>
        {/* Your app UI */}
        <Button title="Check Bluetooth" onPress={checkBluetoothStatus} />
      </View>
    );
  };
  
  export default App;