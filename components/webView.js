/* eslint-disable prettier/prettier */
//import liraries
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, BackHandler} from 'react-native';
import {WebView} from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import {SafeAreaView} from 'react-native-safe-area-context';

// create a component
const WebViewComponent = ({navigation}) => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const goBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  const reloadPage = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  useEffect(() => {
    const backAction = () => {
      goBack();

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const checkInternetConnection1 = async () => {
    try {
      const netState = await NetInfo.fetch();
      console.log('@SN ', netState.isConnected);

      if (netState.isConnected) {
        // If there is internet, navigate to the WebViewComponent
        navigation.navigate('/');
      } else {
        // If there is no internet, navigate to the NoInternetComponent
        navigation.navigate('/noInternet');
        // Alert.alert('No internet connection.');
      }
    } catch (error) {
      console.error('Error checking internet connection:', error);
    }
  };

  useEffect(() => {
    // checkInternetConnection1();
  });
  const handleError = () => {
    navigation.navigate('/noInternet');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        ref={webViewRef}
        source={{uri: 'https://google.com'}}
        style={{flex: 1}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
        onError={handleError}
      />
    </SafeAreaView>
  );
};

//make this component available to the app
export default WebViewComponent;
