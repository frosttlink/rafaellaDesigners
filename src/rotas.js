import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/App";


export default function Navegacao() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> }/>
      </Routes>
    </BrowserRouter>
  );
}