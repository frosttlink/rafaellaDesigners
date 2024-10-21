import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/App";
import Adm from "./pages/admin";


export default function Navegacao() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/adm" element={ <Adm/> }/>
      </Routes>
    </BrowserRouter>
  );
}