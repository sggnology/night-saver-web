import './App.css';
import Header from "./page/layout/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import NotFound from "./page/exception/NotFound";
import NightSaver from "./page/view/nightSaver/NightSaver";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import SignIn from "./page/view/signin/SignIn";
import SignUp from "./page/view/signup/SignUp";
import {useDispatch, useSelector} from "react-redux";
import MyPage from "./page/view/mypage/MyPage";
import LandingRoot from "./page/view/landing/LandingRoot";
import {useEffect} from "react";
import axiosInstance from "./config/api/AxiosInstance";
import {SET_TOKEN} from "./store/Auth";

const theme = createTheme({
  typography: {
    fontFamily: [
      'Pretendard'
    ]
  }
});

function App() {

  const dispatch = useDispatch();
  const {authenticated} = useSelector((state) => state.token);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh-token");

    if (refreshToken !== null && refreshToken !== undefined && refreshToken !== "") {
      const path = "/api/v1/reissue/access-token";
      const body = {
        refreshToken: refreshToken
      }

      axiosInstance.post(path, body)
        .then((response) => {
          if (response.code === 200) {
            dispatch(SET_TOKEN(response.data.accessToken));
            localStorage.setItem("refresh-token", response.data.refreshToken);
          } else if (400 <= response.code) {
            alert("로그인이 필요합니다.");
            localStorage.removeItem("refresh-token");
            window.location.replace("/signin");
          }
        });
    }
    else{
      localStorage.removeItem("refresh-token");
    }
  }, []);

  return (
    <div className="App">
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        <Header/>
        <Routes>
          <Route path="/" element={<LandingRoot/>}></Route>
          <Route path="/nightSaver" element={<NightSaver/>}></Route>
          <Route
            path="/signin"
            element={authenticated ? <Navigate to={"/"}/> : <SignIn/>}
          />
          <Route
            path="/signup"
            element={authenticated ? <Navigate to={"/"}/> : <SignUp/>}
          />
          <Route
            path="/myPage"
            element={authenticated ? <MyPage/> : <Navigate to={"/signin"}/>}/>
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
