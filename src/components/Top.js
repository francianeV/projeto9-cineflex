import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Top() {
  const navigate = useNavigate();

  return (
    <TOP>
      <h1 onClick={() => navigate('/')}>CINEFLEX</h1>
    </TOP>
  );
}

const TOP = styled.div`
  width: 100%;
  height: 80px;
  background-color: #c3cfd9;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    display: flex;
    align-items: center;
    text-align: center;
    color: orange;

    :hover{
      cursor: pointer;
    }
  }
`;
