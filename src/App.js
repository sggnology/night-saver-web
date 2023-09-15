import './App.css';
import Header from "./page/layout/Header";
import {Route, Routes} from "react-router-dom";
import NotFound from "./page/exception/NotFound";
import NightSaver from "./page/view/nightSaver/NightSaver";

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<NightSaver/>}></Route>
        {/*<Route path="/nightSaver" element={<NightSaver/>}></Route>*/}
        {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
