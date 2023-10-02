import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import DetalhesMonumento from './DetalhesMonumento';
import {WebView} from 'react-native-webview'; 

const App = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [selectedDescriptionType, setSelectedDescriptionType] = useState('');

  const handleContentTypeSelection = (contentType) => {
    console.log(`Button clicked: ${contentType}`);
    setSelectedDescriptionType(contentType);
    
  };
  

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <WebView source={{uri: 'https://www.educative.io/'}} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
});

export default App;