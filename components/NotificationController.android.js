/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import PushNotification from 'react-native-push-notification';
import {useEffect} from 'react';

const PushController = () => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification here

        // required on iOS only
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only
      senderID: '698384892639',
      // iOS only
      //   permissions: {
      //     alert: true,
      //     badge: true,
      //     sound: true,
      //   },
      popInitialNotification: true,
      requestPermissions: true,
    });
  });

  return;
};

export default PushController;
