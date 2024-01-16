/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import liraries
import React, {Component, useEffect, useState} from 'react';

import Home from './components/home';
import NoInternetComponent from './components/noInternet';
import WebViewComponent from './components/webView';
import { Alert, BackHandler, Text, PermissionsAndroid } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();
import TouchID from 'react-native-touch-id';

// create a component
const App = () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  useEffect(() => {
    getDiviceToken();
    messaging().subscribeToTopic('new_topic').then(() => console.log('Subscribed to topic!'));
  }, []);

  const getDiviceToken = async () => {
    let token = await messaging().getToken();
    console.log(token);
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="/webView" component={WebViewComponent} />
        <Stack.Screen name="/noInternet" component={NoInternetComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//make this component available to the app
export default App;
