importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');


var firebaseConfig  = {
    apiKey: "AIzaSyB5QUa1GeYlf-Cc3nC_xJ90r_jjVUFQ5es",
authDomain: "wasl-6b9a3.firebaseapp.com",
projectId: "wasl-6b9a3",
storageBucket: "wasl-6b9a3.appspot.com",
messagingSenderId: "152174617194",
appId: "1:152174617194:web:b3c85bda071599f068e013"
};

const app = initializeFirebaseApp(firebaseConfig);
const messaging = getFirebaseMessaging(app);

const onBackgroundMessageHandler = async (payload) => {
    console.log('onBackgroundMessage', payload);
    // Customize how to handle the notification payload when the app is in the background.
};

onBackgroundMessage(messaging, onBackgroundMessageHandler);
