import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

function Footer({filme, url, sessao}){
    return(
        <>
       
        </>
        
    );
}

export default function AssentosPage(){
    const {idSessao} = useParams();
    const [seats, setSeats] = useState([]);
    const [movie, setMovie] = useState({});
    const [erro, setErro] = useState(false);
    const [infos, setInfos] = useState({});
    const [chosenMovie, setChosenMovie] = useState({});
 
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`)

        promise.then((response) => {
            setMovie(response.data)
            setSeats(response.data.seats)
            setInfos(response.data.day)
            setChosenMovie(response.data.movie)
        })
        .catch(res => {
            setErro(true);
        })
    },[])



    return(<>
            <INSTRUCAO>
                <span>Selecione o(s) assento(s)</span>
            </INSTRUCAO>
            
            
            <FOOTER>
                <FILME>
                    <img src={chosenMovie.posterURL} alt={chosenMovie.title} /> 
                </FILME>
                <INFO_SESSAO>
                    <span>{chosenMovie.title}</span>
                    <span>{infos.weekday} - {movie.name}</span>
                </INFO_SESSAO>
            </FOOTER>
           </>);
}

const INSTRUCAO = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;
    color: #293845;
  }
`;

const FOOTER = styled.div`
    width: 100%;
    height: 117px;
    bottom: 0px;
    background: #DFE6ED;
    border: 2px solid #9EADBA;
    display: flex;
    align-items: center;


    img{
        width: 48px;
        height: 72px;
    }

    span{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #293845;
        margin-left: 15px;
    }
`;

const FILME = styled.div`
    width: 64px;
    height: 89px;
    left: 10px;
    bottom: 14px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    display: flex;
    align-items:center;
    justify-content: center;
    margin-left: 15px;
`;

const INFO_SESSAO = styled.div`
    display: flex;
    flex-direction: column;
    
`;