import { createDrawerNavigator } from '@react-navigation/drawer';
import About from './src/About';
import Mapa from './src/Mapa';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Mapa">
      <Drawer.Screen name="Mapa" component={Mapa} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  </NavigationContainer>
  );
}

export default App;