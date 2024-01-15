/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import liraries
import React, {Component, useEffect, useState} from 'react';

import Home from './components/home';
import NoInternetComponent from './components/noInternet';
import WebViewComponent from './components/webView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import TouchID from 'react-native-touch-id';
import {BackHandler} from 'react-native';

// create a component
const App = () => {
  const [auth, setAuth] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    handleBioMatric();
  });
  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false,
  };
  const handleBioMatric = () => {
    TouchID.isSupported(optionalConfigObject).then(biometryType => {
      // Success code
      if (biometryType === 'FaceID') {
        console.log('FaceID is supported.');
      } else {
        if (auth) {
          return null;
        }
        TouchID.authenticate('', optionalConfigObject)
          .then(success => {
            console.log('success', success);
            setAuth(success);
          })
          .catch(error => {
            console.log('error', error);
            BackHandler.exitApp();
          });
      }
    });
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="/" component={Home} />
        <Stack.Screen name="/webView" component={WebViewComponent} />
        <Stack.Screen name="/noInternet" component={NoInternetComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//make this component available to the app
export default App;
