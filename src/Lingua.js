import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';

const App = () => {

    return (

    <View>
        <Text>Selecione a linguagem que pretende utilizar:</Text>
        <Button title="Português" onPress={() => Alert.alert('Selecionou o Português')} />
        <Button title="Inglês" onPress={() => Alert.alert('Selecionou o Inglês')} />
        <Button title="Francês" onPress={() => Alert.alert('Selecionou o Francês')} />
        <Button title="Alemão" onPress={() => Alert.alert('Selecionou o Alemão')} />
    </View>

  );
};

export default App;