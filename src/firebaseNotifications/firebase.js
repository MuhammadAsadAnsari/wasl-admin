// Firebase Cloud Messaging Configuration File. 
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyB5QUa1GeYlf-Cc3nC_xJ90r_jjVUFQ5es",
  authDomain: "wasl-6b9a3.firebaseapp.com",
  projectId: "wasl-6b9a3",
  storageBucket: "wasl-6b9a3.appspot.com",
  messagingSenderId: "152174617194",
  appId: "1:152174617194:web:b3c85bda071599f068e013"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: `BMzXh8kRKjIZ_tIE6yxd717cI392q1wOlmWfhnjl4GOsn87ZYT4NoGhmTeEuW0FMhcv5MotdNiUWfEG3Awf3RvE` })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        localStorage.setItem('wasl_client_token', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {    
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

  
