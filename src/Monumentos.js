import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,

} from 'react-native';

import './config/I18N/i18n';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const MAX_TEXT_LENGTH = 30; 

const TruncatedText = ({ text, style }) => {
  if (text.length <= MAX_TEXT_LENGTH) {
    // If the text is within the limit, display it as is
    return <Text style={style}>{text}</Text>;
  } else {
    // If the text exceeds the limit, truncate it and add an ellipsis
    const truncatedText = text.substring(0, MAX_TEXT_LENGTH) + '...';
    return <Text style={style}>{truncatedText}</Text>;
  }
};

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
          setIsLoading(false); 
        });
    }, []);

    const handleImageClick = (item) => {
      // Navega para a tela de detalhes e passa os dados do monumento como parâmetro
      navigation.navigate('DetalhesMonumento', { monument: item });
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Define 2 colunas por linha
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleImageClick(item)}>
            <View>
              <Image
                source={{ uri: item.cover_image }}
                style={styles.image}
              />
              <TruncatedText text={item.name} style={styles.customText}/>
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
      backgroundColor: '#E8E8E8',
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
      width: 200,
       height: 150,
      borderWidth: 2, 
      borderColor: '#0066CC', 
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
    customText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#CB7C05',
    },
  });
  
  export default ListaMonumentos;