import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";


function Sessao({weekday, date, showtimes, id}){
    return(
        <>
        <SESSAO>
            <h3>{weekday}-{date}</h3>
        </SESSAO>
        {showtimes.map((showtime, index) => (
            <Showtime 
                key={index} 
                showtime={showtime.name}
                id={showtime.id}
                index={index} 
            />

        ))}
        </>
    );
}

function Showtime({showtime, id}){
    return(
        <Link to={`/assentos/${id}`}>
        <HORARIOS>
            <span>{showtime}</span>
        </HORARIOS>
        </Link> 
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

    return(
        <>
        <INSTRUCAO>
            <span>Selecione o horario</span>
        </INSTRUCAO>
        <SESSOES>
            {days.map((data) => {
                return (
                    <Sessao 
                    key={data.id} 
                    weekday={data.weekday} 
                    date={data.date} 
                    id={data.id}
                    showtimes={data.showtimes}/>
                     
                )
            })}
        </SESSOES>
        <FOOTER>
            <FILME>
                <img src={sessao.posterURL} alt={sessao.title} />
            </FILME>
            <span>{sessao.title}</span>
        </FOOTER>
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
    height: 50px;

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

const HORARIOS = styled.button` 
    width: 83px;
    height: 43px;
    background: #E8833A;
    border-radius: 3px;
    margin-right: 10px;
    margin-bottom: 30px;
    border: none;

    span{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        letter-spacing: 0.02em;
        color: #FFFFFF;
    }

    &:hover{
        cursor: pointer;
    }
`;

