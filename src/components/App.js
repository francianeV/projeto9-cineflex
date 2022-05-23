import { useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Top from "./Top";
import FilmsList from "./FilmsList";
import SessaoPage from "./SessaoPage";
import AssentosPage  from "./AssentosPage";
import Finalizacao from "./Finalizacao";

export default function App() {
  const [info, setInfo] = useState(null);
  const [nome, setNome] = useState("");
  const [CPF, setCPF] = useState("");
  const [seats, setSeats] = useState([]);
  const [selecionado, setSelecionado] = useState([])
  const [assentos, setAssentos] = useState([])
  const [chosenMovie, setChosenMovie] = useState({});
  const [movie, setMovie] = useState({});
  const [infos, setInfos] = useState({});
  

  return (
    <BrowserRouter>
      <Top />
      <Routes>
        <Route path="/" element={<FilmsList />} />
        <Route path="/sessoes/:idFilme" element={<SessaoPage />} />
        <Route path="/assentos/:idSessao" element={
                      <AssentosPage 
                        nome={nome}
                        setNome={setNome}
                        CPF={CPF}
                        setCPF={setCPF}
                        setInfo={setInfo}
                        info={info}
                        seats={seats}
                        setSeats={setSeats}
                        setSelecionado={setSelecionado}
                        selecionado={selecionado}
                        setChosenMovie={setChosenMovie}
                        chosenMovie={chosenMovie}
                        assentos={assentos}
                        setAssentos={setAssentos}
                        movie={movie}
                        setMovie={setMovie}
                        setInfos={setInfos}
                        infos={infos}
                        />}/>

        <Route path="/sucesso" element={
                      <Finalizacao 
                        nome={nome}
                        setNome={setNome}
                        CPF={CPF}
                        setCPF={setCPF}
                        setSelecionado={setSelecionado}
                        selecionado={selecionado}
                        assento={assentos}
                        setAssentos={setAssentos}
                        chosenMovie={chosenMovie}
                        setChosenMovie={setChosenMovie}
                        setSeats={setSeats}
                        setInfo={setInfo}
                        movie={movie}
                        setMovie={setMovie}
                        setInfos={setInfos}
                        infos={infos}
                      />} />
      </Routes>
    </BrowserRouter>
  );
}
