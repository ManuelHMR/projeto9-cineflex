import styled from "styled-components";

export default function Confirmation({ userData, movieData }){
    console.log(userData)
    console.log(movieData)
    return(
        <ConfirmationMain>
            <h1>Pedido feito <br/> com sucesso!</h1>
            <h2>Filme e sessão</h2>
            {/* <h3>{movieData.title}</h3>
            <h3>`${movieData.date} - ${movieData.weekday}</h3> */}
            <h2>Ingressos</h2>
            <h2>Comprador(a)</h2>
            <h3>{`Nome: ${userData.userName}`}</h3>
            <h3>{`CPF: ${userData.cpf}`}</h3>
            <button>Voltar para a home</button>
        </ConfirmationMain>
    )
}

const ConfirmationMain = styled.div`
    margin-top: 67px;
    h1{
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        color: #247A6B;
        padding: 30px;
    }
    h2{
        font-weight: 700;
        font-size: 24px;
        color: #293845;
    }
    h3{
        font-weight: 400;
        font-size: 22px;
        line-height: 26px;
        color: #293845;
    }
    button{
        width: 225px;
        height: 42px;
        font-weight: 400;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        background-color: #E8833A;
        border: none;
        border-radius: 3px;
        margin: 100px 20vw;
    }
`