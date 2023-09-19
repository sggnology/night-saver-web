import axios from "axios";
import {useEffect, useState} from "react";
import {getMessaging, getToken} from "firebase/messaging";
import {initializeApp} from "firebase/app";
import Loading from "../../util/loading/Loading";
import environmentProperty from "../../util/environmentProperty";


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

    const [tokenIssueLoading, setTokenIssueLoading] = useState(false);

    const issueToken = async () => {

        try {
            setTokenIssueLoading(true);
            await requestAlertPermission();
            const token = await requestToken();
            await saveToken(token);
        } catch (e) {
            setTokenIssueLoading(false);
            console.error("토큰 발행 과정에서 오류가 발생하였습니다.");
            alert("토큰 발행을 실패하였습니다. 다시 시도하여주세요.");
        }
    }

    const requestAlertPermission = async () => {

        const permission = await Notification.requestPermission();
        const isPermissionGranted = permission === 'granted';

        if (!isPermissionGranted) {
            console.warn("알림을 허용하지 않았습니다.");
            throw new Error("알림을 허용하지 않았습니다.");
        }
    }

    const requestToken = async () => {

        /**
         * 설명
         * - 모종의 이유로 첫번째 getToken 요청은 거의 실패한다.
         * - 따라서, try/catch 로 첫번째 요청의 실패를 두번째 요청으로 보내게끔 처리하였다.
         * */
        try {
            return await tokenProcess();
        } catch (e) {
            try {
                return await tokenProcess();
            } catch (e) {
                console.error("토큰을 발급받던 중 오류 발생");
                throw new Error("토큰 발행 과정에서 오류가 발생하였습니다. 다시 시도하여주세요.");
            }
        }

    }

    /**
     * 설명
     * - getToken 이 첫번째 시도에서 실패할 수 있기 때문에 try/catch 로 감싸주지 않았다.
     * */
    const tokenProcess = async () => {
        const token = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_VAPID_KEY,
        });

        console.log("토큰을 발행하였습니다. : ", token);

        return token;
    }

    const saveToken = async (token) => {

        const url = `${environmentProperty.API_URL}/api/v1/token`;
        const body = {
            token: token
        };

        try{
            await axios.post(url, body);
            setTokenIssueLoading(false);
            console.log("토큰을 저장하였습니다.");
            alert("토큰이 발행되어 서비스를 사용하실 수 있습니다.");
        }
        catch (e){
            console.error("토큰 저장에 실패하였습니다.");
            throw new Error("토큰 저장에 실패하였습니다.");
        }
    }

    return (
        <>
            <p>토큰 발행시 알림을 허용해주셔야 동작합니다.</p>

            <div>
                <Loading isLoading={tokenIssueLoading}/>
            </div>

            <button onClick={issueToken}>
                토큰 발행
            </button>
        </>
    )
}

export default NightSaver;