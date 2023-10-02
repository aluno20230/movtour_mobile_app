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

    //const [currentLanguage, setCurrentLanguage] = useState('pt');
    const { t, i18n } = useTranslation();

    const changeLanguage = value => {
        i18n.changeLanguage(value)
        .then(() => {
            console.log('Mudou para: ' + value);
            //setCurrentLanguage(value);
        })
        .catch(error => {
            console.log('Erro: ' + error);
        })
    }


    return (

    <View>
        <Text style={styles.title}>{t('Língua')}</Text>
        <Button title={t('Português')} onPress={() => changeLanguage('pt')} />
        <Button title={t('Inglês')} onPress={() => changeLanguage('en')} />
        <Button title={t('Francês')} onPress={() => changeLanguage('fr')} />
        <Button title={t('Alemão')} onPress={() => changeLanguage('de')} />
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