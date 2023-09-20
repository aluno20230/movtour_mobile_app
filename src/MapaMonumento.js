
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import './config/I18N/i18n';
import { useTranslation } from 'react-i18next';
import he from 'he';
import MapView from 'react-native-maps';
import{ WebView } from 'react-native-webview';
import html_script from './html_script'

const MapaMonumento = ({ route }) => {
    const { monument } = route.params;
    const { t, i18n } = useTranslation();
    const { htmlScript } = route.params;


  return (
    <>
    
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.container}>
      
      <WebView source={{html: htmlScript }} style={styles.Webview} />
      <View style={styles.ButtonArea}>
        
      </View>
    </SafeAreaView>
  </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E8E8E8',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
});

  export default MapaMonumento;