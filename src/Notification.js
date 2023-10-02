import notifee, { AndroidImportance } from '@notifee/react-native';


async function displayNotification() {

    await notifee.requestPermission();
  
    const channelId = await notifee.createChannel({
      id: 'test',
      name: 'sales',
      vibration: true,
      importance: AndroidImportance.HIGH,
      
    });
  
    await notifee.displayNotification({
      id: '7',
      title: 'MovTour',
      body: 'You are near a monument!',
      android: { channelId, smallIcon: 'iconbk' }
    });
  
  }

  export { displayNotification };