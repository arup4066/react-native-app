/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, BackHandler} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const Home = ({navigation}) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ]);
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

  const checkInternetConnection = async () => {
    try {
      const netState = await NetInfo.fetch();
      console.log('@SN ', netState.isConnected);

      if (netState.isConnected) {
        // If there is internet, navigate to the WebViewComponent
        navigation.navigate('/webView');
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
    checkInternetConnection1();
  }, [navigation]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={checkInternetConnection}>
        <Text style={{fontSize: 20, color: '#000'}}>WebView</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
