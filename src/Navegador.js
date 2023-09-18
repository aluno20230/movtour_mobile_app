import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaMonumentos from './Monumentos'; // Importe sua tela de lista de monumentos
import DetalhesMonumento from './DetalhesMonumento'; // Importe sua tela de detalhes de monumentos

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
          <Stack.Navigator>
        <Stack.Screen name="ListaMonumentos" component={ListaMonumentos} />
        <Stack.Screen name="DetalhesMonumento" component={DetalhesMonumento} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;