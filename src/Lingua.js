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
        <Button title="Português" onPress={() => changeLanguage('pt')} />
        <Button title="Inglês" onPress={() => changeLanguage('en')} />
        <Button title="Francês" onPress={() => Alert.alert('Selecionou o Francês')} />
        <Button title="Alemão" onPress={() => Alert.alert('Selecionou o Alemão')} />
    </View>

  );
};

export default App;