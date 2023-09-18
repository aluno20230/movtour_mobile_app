import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Button,
  View,
  FlatList,
  SafeAreaView,
  Text,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity 

} from 'react-native';

import './config/I18N/i18n';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

 

const ListaMonumentos = () => {

    const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [data, setData] = useState([]);

    useEffect(() => {
      // Coloque a lógica de busca de dados aqui
      fetch('https://movtour.ipt.pt/monuments.json')
        .then((response) => response.json())
        .then((jsonData) => {
          setData(jsonData.monuments);
        })
        .catch((error) => {
          console.error('Erro ao buscar os dados:', error);
        });
    }, []);

    const handleImageClick = (item) => {
      // Navega para a tela de detalhes e passa os dados do monumento como parâmetro
      navigation.navigate('DetalhesMonumento', { monument: item });
    };
  
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Define 2 colunas por linha
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleImageClick(item)}>
            <View>
              <Image
                source={{ uri: item.cover_image }}
                style={{ width: 200, height: 150 }}
              />
              <Text>{item.name}</Text>

              {/* Aqui você pode renderizar as descrições adicionais, beacons, filmes, etc., se necessário */}
            </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    itemContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      position: 'relative', // Permite que o texto seja posicionado sobre a imagem
    },
    image: {
      width: width / 2 - 16, // Divide a largura da tela por 2 e subtrai o espaçamento
      height: 150,
      resizeMode: 'cover',
    },
    imageText: {
      position: 'absolute',
      top: '50%', // Centraliza verticalmente
      left: '50%', // Centraliza horizontalmente
      transform: [{ translateX: -width / 4 }, { translateY: -8 }], // Ajusta o posicionamento do texto
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: '#fff',
      padding: 4,
      borderRadius: 4,
    },
  });
  
  export default ListaMonumentos;