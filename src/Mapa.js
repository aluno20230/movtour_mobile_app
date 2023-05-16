import {View, Text} from 'react-native';
import React from 'react';
import {
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    StatusBar,
  } from 'react-native';

  import{
    WebView
  } from 'react-native-webview';

  import html_script from './html_script'

  const App = () => {

    
  
        return (

        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.Container}>
            <WebView source={{html: html_script }} style={styles.Webview} />
            <View style={styles.ButtonArea}>
              
            </View>
          </SafeAreaView>
        </>
      );
    };
    
  
  const styles = StyleSheet.create({
    Container: {
      flex:1,
      padding: 3,
      backgroundColor: 'grey'
    
    },
    Webview: {
      flex: 2,
      
    },

  });
  
  export default App;