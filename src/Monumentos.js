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
        <Text>Lista dos monumentos</Text>
    </View>

  );
};

export default App;