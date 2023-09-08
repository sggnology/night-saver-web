import axios from "axios";
import {useState} from "react";
import {getMessaging, getToken, onMessage} from "firebase/messaging";
import {initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCHeIKYOoBwRWg8-TK-U7cK-zRX90DG05A",
  authDomain: "night-saver.firebaseapp.com",
  projectId: "night-saver",
  storageBucket: "night-saver.appspot.com",
  messagingSenderId: "1020784651851",
  appId: "1:1020784651851:web:fef32def2547c69577a7ce",
  measurementId: "G-ZFYRQ6J660"
}

function NightSaver(props) {

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  const [isAlertPermissionGranted, setIsAlertPermissionGranted] = useState(false)
  const [token, setToken] = useState(null)

  const issueToken = async () => {
    await requestAlertPermission()
    await requestToken()
    await saveToken()
  }

  const requestAlertPermission = async () => {

    const permission = await Notification.requestPermission()
    const isPermissionGranted = permission === 'granted'
    setIsAlertPermissionGranted(isPermissionGranted)

    if (!isPermissionGranted) {
      console.warn("알림을 허용하지 않았습니다.")
      alert("알림을 허용하지 않아 정상적으로 동작하지 않습니다.")
    }
  }

  const requestToken = async () => {
    if (isAlertPermissionGranted) {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
      });

      console.log("토큰을 발행하였습니다. : ", token)

      setToken(token)
    }
  }

  const saveToken = () => {
    if(token !== null) {
      const url = "http://localhost:8080/api/v1/token"
      const body = {
        token: token
      }

      axios
        .post(url, body)
        .then((response) => {
          console.log("토큰을 저장하였습니다.")
        })
        .catch((error) => {
          console.error("토큰 저장에 실패하였습니다.")
          alert("토큰 저장에 실패하여 서비스 이용이 어려울듯 싶습니다..")
        })
    }
  }

  return (
    <>
      <h2>Night Saver</h2>
      <p>토큰 발행시 알림을 허용해주셔야 동작합니다.</p>

      <button onClick={issueToken}>
        토큰 발행
      </button>
    </>
  )
}

export default NightSaver;