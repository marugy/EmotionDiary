import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

//Components
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

function App() {
  const env = process.env; // Process url이 작동안하면 작업
  env.PUBLIC_URL = env.PUBLIC_URL || ""; //존재하면 담고 아님 비워라

  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText={"APP"}
          leftChild={
            <MyButton text={"왼쪽버튼"} onClick={() => alert("왼쪽 클릭")} />
          }
          rightChild={
            <MyButton
              text={"오른쪽 버튼"}
              onClick={() => alert("오른쪽 클릭")}
            />
          }
        />
        <h2>App.js</h2>
        {/* 어떤 위치에 있던 public dir를 향하게 됌
        <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />*/}

        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼클릭")}
          type={"positive"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼클릭")}
          type={"negative"}
        />
        <MyButton text={"버튼"} onClick={() => alert("버튼클릭")} />
        <Routes>
          {/* path가 /이면 Home컴포넌트를 보여라 */}
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
          {/* id의 값에 따라 다른 diary를 보여주겠다. */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
