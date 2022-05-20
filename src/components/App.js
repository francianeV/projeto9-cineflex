import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./Top";
import FilmsList from "./FilmsList";
import SessaoPage from "./SessaoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Top />
      <Routes>
        <Route path="/" element={<FilmsList />} />
        <Route path="/sessoes/:idFilme" element={<SessaoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
