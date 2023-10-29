import {Box, Button, Typography} from "@mui/material";
import {initializeApp} from "firebase/app";
import {getMessaging, getToken} from "firebase/messaging";
import {useState} from "react";
import axiosInstance from "../../../../config/api/AxiosInstance";
import {useSelector} from "react-redux";
import Loading from "../../../util/loading/Loading";

function MyPagePush() {

  const firebaseConfig = {
    apiKey: "AIzaSyCHeIKYOoBwRWg8-TK-U7cK-zRX90DG05A",
    authDomain: "night-saver.firebaseapp.com",
    projectId: "night-saver",
    storageBucket: "night-saver.appspot.com",
    messagingSenderId: "1020784651851",
    appId: "1:1020784651851:web:fef32def2547c69577a7ce",
    measurementId: "G-ZFYRQ6J660"
  }

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  const {token} = useSelector((state) => state.token);

  const [fcmTokenIssueLoading, setFcmTokenIssueLoading] = useState(false);

  const issueFcmToken = async () => {

    try {
      setFcmTokenIssueLoading(true);
      await requestAlertPermission();
      const fcmToken = await requestToken();
      await saveFcmToken(fcmToken);
    } catch (e) {
      setFcmTokenIssueLoading(false);
      console.error("토큰 발행 과정에서 오류가 발생하였습니다.");
      if(e.message){
        alert(e.message);
      }
      else{
        alert("알림을 받게끔 하는 과정에서 오류가 발생하였습니다. 잠시후 시도하여주세요.")
      }
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
        throw new Error("알림을 받기 위한 토큰 발급에 실패하였습니다.");
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

  const saveFcmToken = async (fcmToken) => {

    const path = `/api/v1/token`;
    const body = {
      fcmToken: fcmToken
    };
    const config = {
      headers: {
        Authorization: `${token}`
      }
    }

    try{
      axiosInstance.post(path, body, config)
        .then((response) => {
            setFcmTokenIssueLoading(false);

            if(response.code === 200){
              console.log("토큰을 저장하였습니다.");
              alert("알림을 허용하였습니다. 신고가 들어오면 알려드릴게요 ㅎㅎ");
            }
            else if(400 <= response.code){
              console.log("토큰을 서버에 저장하는 과정에서 오류가 발생하였습니다.");
              alert("알림 정보를 저장하는 과정에서 오류가 발생하였습니다.");
            }
        })
    }
    catch (e){
      console.error("토큰 저장에 실패하였습니다.");
      throw new Error("알림 정보를 저장하는 과정에서 실패하였습니다.");
    }
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Typography variant="subtitle1" align={"left"} gutterBottom={true}>
          Push
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={issueFcmToken}
            disabled={fcmTokenIssueLoading}
          >
            {fcmTokenIssueLoading ? <Loading isLoading={fcmTokenIssueLoading}/> : "신고 알림 허용"}
          </Button>
          <div style={{width: '10px'}}></div>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: '#9f9f9f'
            }}
          >
            신고 알림 취소
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default MyPagePush;