/* eslint-disable prettier/prettier */
//import liraries
import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, Image, BackHandler} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
// create a component
const NoInternetComponent = ({navigation}) => {
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('/');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/no-wifi.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.message}>
        Please check your connection and try again.
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

//make this component available to the app
export default NoInternetComponent;
