import { createDrawerNavigator } from '@react-navigation/drawer';
import About from './src/About';
import Mapa from './src/Mapa';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image } from 'react-native';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Mapa">
      <Drawer.Screen name="Mapa" component={Mapa} />
      <Drawer.Screen name="Sobre nós" component={About} />
    </Drawer.Navigator>
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