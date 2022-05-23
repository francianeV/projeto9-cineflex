import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Finalizacao({chosenMovie, setChosenMovie, movie, setMovie, days, setDays, infos, setInfos, setInfo, setSelecionado, setAssentos, assento, setSeats, nome, setNome, CPF, setCPF}){
    const navigate = useNavigate();

    function Resetar(){
        setSeats([]);
        setNome('');
        setCPF('');
        setInfo(null);
        setSelecionado([]);
        setAssentos([])
        setMovie({});
        //setDays('');
        setChosenMovie({});
        navigate("/", {replace: true})
        setInfos({})
    }

    return(

        <>
            <INSTRUCAO><span>Pedido feito com sucesso!</span></INSTRUCAO>
            <ESCOPO>
                <h2>Filme e sessão</h2>
                <h3>{chosenMovie.title}</h3>
                <h3>{infos.date} - {movie.name}</h3>
            </ESCOPO>
            <ESCOPO>
                <h2>Ingressos</h2>
                {assento.map((assento, index) => <h3 key={index}>Assento {assento}</h3>)}
            </ESCOPO>
            <ESCOPO>
                <h2>Comprador</h2>
                <h3>Nome: {nome}</h3>
                <h3>CPF : {CPF}</h3>
            </ESCOPO>
            <VOLTAR_HOME>
                    <BOTAO onClick={Resetar}><span>Voltar para home</span></BOTAO>
            </VOLTAR_HOME>
            
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
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;
    color: #247A6B;

  }
`;

const ESCOPO = styled.div`
    width: 500px;
    height: auto;
    margin: 0 auto;
    margin-bottom: 40px;

    h2 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        letter-spacing: 0.04em;
        color: #293845;
        margin-bottom: 15px;
    }

    h3 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 26px;
        display: flex;
        align-items: center;
        letter-spacing: 0.04em;
        color: #293845;

    }

`;

const VOLTAR_HOME = styled.div`
    width: 500px;
    height: auto;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
   
`;

const BOTAO = styled.button`
    width: 225px;
    height: 42px;
    left: 74px;
    top: 622px;
    border: none;
    background: #E8833A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover{
        cursor: pointer;
    }
    
    
    span{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.04em;
        color: #FFFFFF;
    }
`;