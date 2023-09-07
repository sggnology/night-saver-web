// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHeIKYOoBwRWg8-TK-U7cK-zRX90DG05A",
  authDomain: "night-saver.firebaseapp.com",
  projectId: "night-saver",
  storageBucket: "night-saver.appspot.com",
  messagingSenderId: "1020784651851",
  appId: "1:1020784651851:web:fef32def2547c69577a7ce",
  measurementId: "G-ZFYRQ6J660"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission() {
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if(permission === "denied"){
    console.log("권한 거부됨");
    return;
  }

  console.log("권한 허용됨");

  try{
    await getTokenAndSave();
  }
  catch (e){
    setTimeout(async () => {
      await getTokenAndSave();
    }, 1000);
  }

  onMessage(messaging, (payload) => {
    console.log("메시지 받음", payload);
  });
}

async function getTokenAndSave() {
  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  });

  if(token) console.log("토큰: ", token);
  else console.log("토큰 없음");
}

requestPermission();
