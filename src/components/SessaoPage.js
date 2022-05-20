import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

function Sessao({weekday, date}){
    return(
        <SESSAO>
            <h3>{weekday}-{date}</h3>
        </SESSAO>
    );
}

export default function SessaoPage(){
    const {idFilme} = useParams();
    const [sessao, setSessao] = useState({})
    const [days, setDays] = useState([]);
    const [erro, setErro] = useState(false);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`)

        promise.then((response) => {
            setSessao(response.data)
            setDays(response.data.days)
        })
        .catch(res => {
            setErro(true);
        })
    },[])

    console.log(sessao);
    console.log(sessao.days);

    return(
        <>
        <INSTRUCAO>
            <span>Selecione o horario</span>
        </INSTRUCAO>
        <SESSOES>
            {days.map((data, index) => {
                return (
                    <Sessao key={index} weekday={data.weekday} date={data.date} />
                )
            })}
        </SESSOES>
        </>
    );
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

const SESSAO = styled.div`
    width: 100%;
    height: 100px;

    h3{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        display: flex;
        align-items: center;
        letter-spacing: 0.02em;
        color: #293845;

    }

`;

const SESSOES = styled.div` 
    width: 100%;
    height: auto;
    padding: 20px;
`;