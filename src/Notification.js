import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';




async function displayNotification(poi) {

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
    body: 'Está perto de um monumento!',
    android: { 
      channelId, 
      smallIcon: 'iconbk',
      pressAction: {
        id: 'default',
        launchActivity: 'default',
      },
    },
    data: { poi }, // Add the POI data to the notification      
  });

  



}
export { displayNotification };

