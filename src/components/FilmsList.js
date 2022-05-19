//import React from "react";
import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Filme({ source }) {
  return (
    <FILME>
      <img src={source} alt="filme" />
    </FILME>
  );
}

export default function FilmsList() {
  const [film, setFilm] = useState([]);

  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );

    promise.then((response) => {
      setFilm([...response.data]);
    });
  }, []);

  return (
    <>
      <INSTRUCAO>
        <span>Selecione o filme</span>
      </INSTRUCAO>
      <LISTA_FILMES>
        {film.map((film) => (
          <Filme source={film.posterURL} />
        ))}
      </LISTA_FILMES>
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

const LISTA_FILMES = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
`;

const FILME = styled.div`
  width: 145px;
  height: 209px;
  background: #ffffff;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  img {
    width: 129px;
    height: 193px;
  }
`;
