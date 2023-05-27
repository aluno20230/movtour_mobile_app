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


const Drawer = createDrawerNavigator();

function App() {

  const { t, i18n } = useTranslation();

  const changeLanguage = value => {
    console.log(value);
  }

  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Mapa">
      <Drawer.Screen name={t('Mapa')} component={Mapa} />
      <Drawer.Screen name={t('Sobre nós')} component={About} />
      <Drawer.Screen name={t('Língua')} component={Lingua} />
      <Drawer.Screen name={t('Tipo de conteúdo')} component={TipodeConteudo} />
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