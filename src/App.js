import './App.css';
import Header from "./page/layout/Header";
import {Route, Routes} from "react-router-dom";
import NotFound from "./page/exception/NotFound";
import NightSaver from "./page/view/nightSaver/NightSaver";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import SignIn from "./page/view/signin/SignIn";
import Landing from "./page/view/landing/Landing";
import SignUp from "./page/view/signup/SignUp";

const theme = createTheme({
  typography: {
    fontFamily: [
      'Pretendard'
    ]
  }
});

function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        <Header/>
        <Routes>
          <Route path="/" element={<Landing/>}></Route>
          <Route path="/nightSaver" element={<NightSaver/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
