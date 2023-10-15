import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';

 

import './config/I18N/i18n';
import { useTranslation } from 'react-i18next';

 

const App = () => {
  const { t, i18n } = useTranslation();

 

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => {
        console.log('Mudou para: ' + value);
      })
      .catch((error) => {
        console.log('Erro: ' + error);
      });
  };

 

  const ButtonWithImage = ({ title, imageSource, onPress }) => (
<TouchableOpacity onPress={onPress} style={styles.button}>
<View style={styles.buttonContent}>
<Text style={styles.buttonText}>{title}</Text>
<Image source={imageSource} style={styles.buttonImage} />
</View>
</TouchableOpacity>
  );

 

  return (
<View>
<Text style={styles.title}>{t('Língua')}</Text>
<ButtonWithImage
        title={t('Português')}
        imageSource={require('./config/pictures/pt.png')}
        onPress={() => changeLanguage('pt')}
      />
<ButtonWithImage
        title={t('Inglês')}
        imageSource={require('./config/pictures/uk.png')}
        onPress={() => changeLanguage('en')}
      />
<ButtonWithImage
        title={t('Francês')}
        imageSource={require('./config/pictures/fr.png')}
        onPress={() => changeLanguage('fr')}
      />
<ButtonWithImage
        title={t('Alemão')}
        imageSource={require('./config/pictures/de.png')}
        onPress={() => changeLanguage('de')}
      />
</View>
  );
};

 

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  button: {
    backgroundColor: '#E36509',
    padding: 10,
    height: 120, 
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 150,
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  buttonContent: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
  },
  buttonText: {
    color: 'white',
    marginLeft:60,
    fontSize: 25,
  },
  buttonImage: {
    width: 70,
    height: 70, 
    marginRight:50,
  },
});

 

export default App;