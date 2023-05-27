import {View, Text} from 'react-native';
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';


export default function About() {

  const { t, i18n } = useTranslation();

    return (

        <SafeAreaView>
        <ScrollView>

        <View style={styles.container}>
            <Text style={styles.title}>{t('Sobre nós')}</Text>
            <View style={styles.aboutUsContainer}>
              <Text style={styles.text}>
              {t("Sistema desenvolvido no âmbito do Projeto 'MovTour - Turismo e Cultura com e para a Sociedade'.")}
              </Text>

              <Text style={[styles.text, {marginTop: 10}]}>
              {t('Desenvolvido em parceria entre o Instituto Politécnico de Tomar, o Instituito Politécnico de Santarém e o Centro de Estudos Sociais da Universidade de Coimbra e cofinanciado pelo Programa Operacional Competitividade e Internacionalização, Portugal 2020 e União Europeia através do Fundo Europeu de Desenvolvimento Regional.')}
              </Text>
          </View>
        
        <View style={styles.imagesContainer}>
            <View style={styles.imageWrapper}>
              <Image
                resizeMode={'contain'}
                style={styles.images}
                source={require('./config/pictures/movtour.png')}
              />
            </View>

            <View style={styles.imageWrapper}>
              <Image
                resizeMode={'contain'}
                style={styles.images}
                source={require('./config/pictures/ipt.png')}
              />
            </View>

            <View style={styles.imageWrapper}>
              <Image
                resizeMode={'contain'}
                style={styles.images}
                source={require('./config/pictures/ipsantarem.png')}
              />
            </View>

            <View style={styles.imageWrapper}>
              <Image
                resizeMode={'contain'}
                style={styles.images}
                source={require('./config/pictures/Ltour.png')}
              />
            </View>

            <View style={styles.imageWrapper}>
              <Image
                resizeMode={'contain'}
                style={styles.images}
                source={require('./config/pictures/ces.png')}
              />
            </View>

            <View style={styles.imageWrapper}>
              <Image
                resizeMode={'contain'}
                style={styles.images}
                source={require('./config/pictures/portugal2020.png')}
              />
            </View>

            <View style={styles.imageWrapper}>
              <Image
                resizeMode={'contain'}
                style={styles.images}
                source={require('./config/pictures/compete2020.png')}
              />
            </View>

            <View style={styles.imageWrapper}>
              <Image
                resizeMode={'contain'}
                style={styles.images}
                source={require('./config/pictures/fundoEuropeu.png')}
              />
            </View>
        </View>
        </View>
        </ScrollView>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    safeArea:{
      flex: 1,
    },
    container:{
      flex: 1,
      padding: 30,
    },
    title:{
      fontSize: 24,
      marginBottom:20,
      textAlign: 'center',
      color: 'black'
    },
    aboutUsContainer:{
      padding: 10,
      // backgroundColor:'#eee',
      // borderRadius:5,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
    text:{
      fontSize: 16,
          color: 'black',
          lineHeight: 25,
    },
    imagesContainer:{
      flex:1,
      marginTop:20,
      paddingVertical:10,
      alignItems:'center',
      backgroundColor:'#eee',
      borderRadius:5,
    },
    imageWrapper:{
      width:'75%',
      height: 100,
      paddingVertical:10,
      borderBottomWidth: 0.5,
      borderColor: '#ddd',
    },
    images:{
      flex:1,
      width:null,
    }
  })