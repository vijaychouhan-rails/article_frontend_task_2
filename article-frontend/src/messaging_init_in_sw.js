import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage} from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyB-QEQLFWcsIiINpwKetSa4f5B14iaNO5A",
  authDomain: "node-crud-fe483.firebaseapp.com",
  projectId: "node-crud-fe483",
  storageBucket: "node-crud-fe483.appspot.com",
  messagingSenderId: "745400723509",
  appId: "1:745400723509:web:56fc2364a5b98104fce97c",
  measurementId: "G-6EKTQ8CNJG"
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

// onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   // const notificationTitle = 'Background Message Title';
//   // const notificationOptions = {
//   //   body: 'Background Message body.',
//   //   icon: '/firebase-logo.png'
//   // };

//   // self.registration.showNotification(notificationTitle,
//   //   notificationOptions);
// });


function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");

      getToken(messaging, {
        vapidKey:
          "BC1dfhc15-Uy4Me8LbwEw0MNnI-xCGKPAxkEJ4cdOm_FuYyDFWfcYU72jkqxXzLlbNNPZAVSSyqUGeto_ixxSzg",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();