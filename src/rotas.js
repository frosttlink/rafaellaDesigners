import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/App";
import Adm from "./pages/admin";
import Sobre from "./pages/sobre";

export default function Navegacao() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/adm" element={ <Adm/> }/>
        <Route path="/sobre" element={ <Sobre/> }/>
        <Route path="/estoque" element={ <Sobre/> }/>
      </Routes>
    </BrowserRouter>
  );
}