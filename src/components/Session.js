import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./../css/style.css"

export default function Session({userData, setUserData, setMovieData}){
    const {idSessao} = useParams();
    const URLGET = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    const URLPOST = `https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`
    const [session, setSession] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState(``);
    function changeStyle(){
        setBackgroundColor(`selected`)
    }
    useEffect( ()=>{
        const promise = axios.get(URLGET);
        promise.then(response => setSession(response.data))
    },[]);
    console.log(session)
    function requestSeats(event){
        // event.preventDefault()
        console.log(userData)
        axios.post(URLPOST, userData)
    }

    if(session.length === 0){
        return (
        <SeatsMain>
            <h1>CARREGANDO...</h1>
        </SeatsMain>)
    }
    if(session.length !== 0){
        return (
            <SeatsMain>
                <h1>Selecione o(s) assento(s)</h1>
                <SeatsDisplay 
                session={session} 
                setUserData={setUserData}
                userData = {userData}
                backgroundColor= {backgroundColor}
                changeStyle = {changeStyle}
                ></SeatsDisplay>
                <Legend>
                    <div className="legend1">
                        <p></p>
                        <h5>Selecionado</h5>
                    </div>
                    <div className="legend2">
                        <p></p>
                        <h5>Disponível</h5>
                    </div>
                    <div className="legend3">
                        <p></p>
                        <h5>Indisponível</h5>
                    </div>       
                </Legend>
                <form>
                    <Form>
                        <label htmlFor="userName">Nome do comprador:</label>
                        <input 
                        type="text" 
                        id="userName"  
                        placeholder="Digite seu nome..." 
                        value={userData.userName}
                        onChange={e => setUserData({...userData, userName: e.target.value})}></input>
                    </Form>
                    <Form>
                        <label htmlFor="CPF">CPF do comprador:</label>
                        <input 
                        type="text" 
                        id="CPF"  
                        placeholder="Digite seu CPF..." 
                        value={userData.cpf}
                        onChange={e => setUserData({...userData, cpf: e.target.value})}></input>
                    </Form>
                    <Link to={`/sucesso`}>
                        <Button onClick ={requestSeats} type="submit">Reservar assento(s)</Button>
                    </Link>    
                 </form> 
                <Footer>
                    <Poster>
                        <img src={session.movie.posterURL} alt="poster"/>
                    </Poster>
                    <div className="footer-right">
                        <h2>{session.movie.title}</h2>
                        <h2>{`${session.day.weekday} - ${session.name}`}</h2>
                    </div>
                </Footer>
            </SeatsMain>)
    }    
}

function SeatsDisplay({session, setUserData, userData, changeStyle, backgroundColor}){
    const {seats} = session;
    return(
        <AllSeats>
            {seats.map((seat, index)=> 
            <p 
            key={index} 
            className={backgroundColor}
            onClick={()=>{
                changeStyle()
                setUserData({...userData, ids: [...userData.ids, seat.id]})
            }}
            style={seat.isAvailable ? {background: '#7B8B99'} : {background: '#F7C52B'}}>{seat.name}</p>)}
        </AllSeats>          
    )
}

const SeatsMain = styled.div`
    margin: 67px 0px 150px 0px;
    h1{
            height: 80px;
            font-weight: 400;
            font-size: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #293845;
        }
`
const AllSeats = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: -20px;
    p{
        width: 26px;
        height: 26px;   
        border: 1px solid #808F9D;
        box-sizing: border-box;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 400;
        font-size: 11px;
        margin: 3px;
    }
    .selected{
        p{
            background-color: #1AAE9E;
        }
}
`
const Legend = styled.div`
    display: flex; 
    justify-content: space-around;

    p{

        width: 26px;
        height: 26px;   
        border: 1px solid #808F9D;
        box-sizing: border-box;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 400;
        font-size: 11px;
    }
    h5{
        margin-top: -3px;
        font-weight: 400;
        font-size: 13px;
    }
    .legend1{
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
            background-color: #1AAE9E;
        }
    }
    .legend2{
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
            background-color: #7B8B99;
        }
    }
    .legend3{
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
            background-color: #F7C52B;
        }
    }
`
const Form = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 7px;
    align-items: center;
    padding: 0px 5px;
    label{
        font-weight: 400;
        font-size: 18px;
        width: 100%;
    }
    input{
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 3px;
        width: 100%;
        height: 51px;
        font-style: italic;
        font-weight: 400;
        font-size: 18px;
    }
`
const Button = styled.button`
    width: 225px;
    height: 42px;
    margin: 20px 0 70px 20vw;
    background-color: #E8833A;
    border-radius: 3px;
    color: #ffffff;
    border: none;
`
const Footer = styled.div`
    position: fixed;
    width: 100%;
    height: 117px;
    left: 0px;
    bottom: 0px;
    background-color: #DFE6ED;
    border: 1px solid #9EADBA;
    padding: 14px;
    display: flex;
    align-items: center;

    h2{
        margin-left: 14px;
        font-weight: 400;
        font-size: 26px;
    }
`
const Poster = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    width: 64px;
    height: 89px;
    display: flex;
    justify-content: center;
    align-items: center;

    img{
        width: 48px;
        height: 72px;
    }
`