import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./Top";
import FilmsList from "./FilmsList";

export default function App() {
  return (
    <BrowserRouter>
      <Top />
      <Routes>
        <Route path="/" element={<FilmsList />} />
      </Routes>
    </BrowserRouter>
  );
}
