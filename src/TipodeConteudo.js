import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';

import './config/I18N/i18n';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';



const App = () => {

    const { t, i18n } = useTranslation();

    return (

    <View>
      <Text style={styles.title}>{t('Tipo de conteúdo')}</Text>
        <Button title={t('Iniciação')} onPress={() => Alert.alert('Tipo de conteúdo selecionado: Iniciação')} />
        <Button title={t('Divulgação')} onPress={() => Alert.alert('Tipo de conteúdo selecionado: Divulgação')} />
        <Button title={t('Aprofundamento')} onPress={() => Alert.alert('Tipo de conteúdo selecionado: Aprofundamento')} />
        <Button title={t('Investigação')} onPress={() => Alert.alert('Tipo de conteúdo selecionado: Investigação')} />
    </View>

  );
};

const styles = StyleSheet.create({
    
  title:{
    fontSize: 24,
    marginBottom:20,
    textAlign: 'center',
    color: 'black'
  }

})

export default App;