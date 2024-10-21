import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/App";
import Adm from "./pages/admin";
import DicasSection from "./components/dicasSection";


export default function Navegacao() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/adm" element={ <Adm/> }/>
        <Route path="/dicas" element={ <DicasSection/> }/>
      </Routes>
    </BrowserRouter>
  );
}