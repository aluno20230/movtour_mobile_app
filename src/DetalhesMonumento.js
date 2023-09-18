
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetalhesMonumento = ({ route }) => {
  const { monument } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: monument.cover_image }}
        style={styles.image}
      />
      <Text>{monument.name}</Text>
      <Text>{monument.category}</Text>
      <Text>{monument.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
});

export default DetalhesMonumento;