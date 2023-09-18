import { createDrawerNavigator } from '@react-navigation/drawer';
import About from './src/About';
import Mapa from './src/Mapa';
import Lingua from './src/Lingua';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image } from 'react-native';
import './src/config/I18N/i18n';
import { useTranslation } from 'react-i18next';
import React from 'react';
import TipodeConteudo from './src/TipodeConteudo';
import Monumentos from './src/Monumentos';
import { createStackNavigator } from '@react-navigation/stack';
import ListaMonumentos from './src/Monumentos'; // Importe a lista de monumentos
import DetalhesMonumento from './src/DetalhesMonumento'; // Importe os detalhes de monumentos

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function StackNavigator() {
  const { t, i18n } = useTranslation();
  return (
          <Stack.Navigator>
        <Stack.Screen name={t('Monumentos')}  component={ListaMonumentos} />
        <Stack.Screen name={t('DetalhesMonumento')} component={DetalhesMonumento} />
      </Stack.Navigator>
    
  );
}

function DrawerNavigator() {
  const { t, i18n } = useTranslation();
  return (
      <Drawer.Navigator initialRouteName="Monumentos">
      <Drawer.Screen name={t('Monumentos')} component={StackNavigator} />
      <Drawer.Screen name={t('Mapa')} component={Mapa} />
      <Drawer.Screen name={t('Sobre nós')} component={About} />
      <Drawer.Screen name={t('Língua')} component={Lingua} />
      <Drawer.Screen name={t('Tipo de conteúdo')} component={TipodeConteudo} />
    </Drawer.Navigator>
  );
}

function App() {
  const changeLanguage = value => {
    console.log(value);
  }

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