import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect} from "react";
import styled from "styled-components";

function Assentos({name, cor, borda, id, isAvailable,setSelecionado, selecionado, setAssentos, assentos}){

    const [escolhido, setEscolhido] = useState('')


    function selecionarAssento() {
        if(isAvailable && !escolhido) {
            setEscolhido(!escolhido)
            setSelecionado([...selecionado, id])
            setAssentos([...assentos, name])
            
        } else if (escolhido){         
            setSelecionado(selecionado.filter((e) => e !== id ))
            setAssentos(assentos.filter((e) => e !== name ))
            setEscolhido(!escolhido)
            
        } else if(!isAvailable) {
            alert('Esse assento não está disponível')
        }
    }    

    return(
        <ASSENTO cor={cor} borda={borda} isAvailable={isAvailable} onClick={selecionarAssento}><span>{name}</span></ASSENTO>
    );



}

function Legenda(){
    return(
        <>
            <STATUS_ASSENTO>
                <COR_STATUS cor='#8DD7CF' borda='#1AAE9E'></COR_STATUS>
                 <h3>Selecionado</h3>
            </STATUS_ASSENTO>
            <STATUS_ASSENTO>
                <COR_STATUS cor='#C3CFD9' borda='#7B8B99'></COR_STATUS>
                <h3>Disponível</h3>
            </STATUS_ASSENTO>
            <STATUS_ASSENTO>
                <COR_STATUS cor='#FBE192' borda='#F7C52B'></COR_STATUS>
                <h3>Indisponivel</h3>
            </STATUS_ASSENTO>
        </>

    );
    
}

export default function AssentosPage({CPF, setCPF, nome, setNome, setInfo, info, setSeats, setSelecionado, selecionado, setAssentos, assentos, chosenMovie, setChosenMovie, movie, setMovie, setInfos, infos}){
    const navigate = useNavigate();
    const {idSessao} = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`)

        promise.then((response) => {
            setMovie(response.data)
            setSeats([...response.data.seats])
            setInfos(response.data.day)
            setChosenMovie(response.data.movie)
            setInfo(response.data)
        })
    },[])


    function enviarInfos(event){
        event.preventDefault();

        const dados = {
            ids: selecionado,
            name: nome,
            cpf: CPF
        };

        const promise = axios.post(
            "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", dados);

            promise.then((res) => {
                console.log(res.data);
                
              });
            promise.then(navigate("/sucesso", { replace: true }));  
            
    }
    
    return(
        <>
            <ASSENTOS_PAGE>
                <INSTRUCAO>
                    <span>Selecione o(s) assento(s)</span>
                </INSTRUCAO>
                <ASSENTOS>
                    {info?.seats.map((seat, index) => <Assentos
                        key={index}
                        id={seat.id}
                        name={seat.name}
                        cor={!seat.isAvailable ? '#FBE192' : '#C3CFD9'}
                        borda={seat.isAvailable ? '#7B8B99' : '#F7C52B'}
                        isAvailable={seat.isAvailable}
                        setSelecionado={setSelecionado}
                        selecionado={selecionado}
                        setAssentos={setAssentos}
                        assentos={assentos}
                    />) }
                </ASSENTOS>
                <LEGENDA>
                    <Legenda />
                </LEGENDA>
                <FORMULARIO onSubmit={enviarInfos}>
                    <label htmlFor="campoNome">Nome do comprador:</label>
                    <input id="campoNome" type="nome" value={nome} placeholder="Digite seu nome..." required onChange={e => setNome(e.target.value)}></input>
                    <label htmlFor="campoCPF">CPF do comprador:</label>
                    <input id="campoCPF" type="cpf" value={CPF} placeholder="Digite seu CPF..." pattern="([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})" required onChange={e => setCPF(e.target.value)}></input>
                    <button><span>Reservar assentos</span></button>
                </FORMULARIO>
            </ASSENTOS_PAGE>
                <FOOTER> 
                    <FILME>
                        <img src={chosenMovie.posterURL} alt={chosenMovie.title} />
                    </FILME>
                   
                    <INFO_SESSAO>
                        <span>{chosenMovie.title}</span>
                        <span>{infos.weekday} - {movie.name}</span>
                    </INFO_SESSAO>
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

const FOOTER = styled.div`
    width: 100%;
    height: 117px;
    bottom: 0px;
    background: #DFE6ED;
    border: 2px solid #9EADBA;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;

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

const FORMULARIO = styled.form`

    padding: 20px;
    margin-top: 25px;

    input{
        width: 327px;
        height: 51px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 3px;

        ::placeholder{
            font-style: italic;
        }
    }

    label{
        width: 327px;
        height: 25px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        color: #293845;

    }

    button{
        width: 225px;
        height: 42px;
        background: #E8833A;
        border-radius: 3px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        margin-top: 30px;
        margin-left: 44px;

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
    }
`;

const ASSENTO = styled.div`
    width: 26px;
    height: 26px;
    left: 24px;
    top: 158px;
    background: ${props => props.cor};
    border: 1px solid ${props => props.borda};
    border-radius: 12px;
    display: flex;
    align-items:center;
    justify-content: center;
    margin-right: 7px;

    :hover{
        cursor: pointer;
    }

`;

const ASSENTOS = styled.div`
    width: 330px;
    height: 200px;
    display: flex;
    flex-wrap:wrap;
    margin: 20px;
    align-items: center;

    span{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.04em;
        color: #000000;
    }
`;

const ASSENTOS_PAGE = styled.div`
    width: 400px;
    height: auto;
    margin: 0 auto;
`;

const LEGENDA = styled.div`
    width: 400px;
    height: auto;
    margin: 0 auto;
    display: flex;
    justify-content: center; 
`;

const STATUS_ASSENTO = styled.div`
    width: auto;
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-right: 15px;

    h3{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 15px;
        display: flex;
        align-items: center;
        letter-spacing: -0.013em;
        color: #4E5A65;
        margin-top: 10px;
    }
`;

const COR_STATUS = styled.div`
    width: 26px;
    height: 26px;
    background:  ${props => props.cor};
    border: 1px solid ${props => props.borda};
    border-radius: 12px;
    display: flex;
    align-items:center;
    justify-content: center;
    margin-right: 7px;
`;