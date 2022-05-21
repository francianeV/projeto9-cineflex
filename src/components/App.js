import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./Top";
import FilmsList from "./FilmsList";
import SessaoPage from "./SessaoPage";
import AssentosPage  from "./AssentosPage";

export default function App() {
  return (
    <BrowserRouter>
      <Top />
      <Routes>
        <Route path="/" element={<FilmsList />} />
        <Route path="/sessoes/:idFilme" element={<SessaoPage />} />
        <Route path="/assentos/:idSessao" element={<AssentosPage />} />
      </Routes>
    </BrowserRouter>
  );
}
