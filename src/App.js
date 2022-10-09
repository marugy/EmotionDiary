import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RouteTest from "./components/RouteTest";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          {/* path가 /이면 Home컴포넌트를 보여라 */}
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
          {/* id의 값에 따라 다른 diary를 보여주겠다. */}
        </Routes>
        <RouteTest />
      </div>
    </BrowserRouter>
  );
}

export default App;
