import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/App";
import Adm from "./pages/admin";
import Sobre from "./pages/sobre";
import InterfaceAdm from "./pages/interfaceAdm";
import DetalhesServicos from "./pages/servicos";

export default function Navegacao() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/adm" element={ <Adm/> }/>
        <Route path="/sobre" element={ <Sobre/> }/>
        <Route path="/interfaceAdm" element={ <InterfaceAdm/> }/>
        <Route path="/servicos" element={ <DetalhesServicos/> }/>
      </Routes>
    </BrowserRouter>
  );
}