import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


export default function Movie(){
    const {idMovie} = useParams();
    const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`
    const [sessions, setSessions] = useState([])
    useEffect( ()=>{
        const promise = axios.get(URL)
        promise.then(response => setSessions(response.data))
    },[]);
    const {days, posterURL, title} = sessions;
    if(sessions !== []){return(
        <MovieMain>
            <h1>Selecione o horário</h1>
            <SessionTimes days={days}></SessionTimes>
            <Footer>
                <Poster>
                    <img src={posterURL} alt="poster"/>
                </Poster>
                <h2>{title}</h2>
            </Footer>
        </MovieMain>
    )}
}

function SessionTimes({days}){
    if (days === undefined){
        return(
            <h1>CARREGANDO...</h1>
        )
    }
    else{
        return(
            <Sessions>
                {days.map((day, index)=> 
                <>
                    <h3 key={index}>{`${day.weekday} - ${day.date}`}</h3>
                    <DaySessions showtimes={day.showtimes}></DaySessions>
                </>
                )}
            </Sessions>
    )}
}

function DaySessions({showtimes}){
    return(
        <DaySessionsDiv>
            {showtimes.map((time, index)=>
            <Link to={`/assentos/${time.id}`} key={index}>
                <Time>
                    <h5 >{time.name}</h5>
                </Time>
            </Link>  
            )}
        </DaySessionsDiv> 
    )
}

const MovieMain = styled.div`
    margin-top: 67px;
    h1{
        height: 110px;
        font-weight: 400;
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #293845;
    }
`
const Sessions = styled.div`


    h3{
        font-weight: 400;
        font-size: 20px;
        color: #293845;
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
const DaySessionsDiv = styled.div`
    display: flex;
`
const Time = styled.div`
    width: 83px;
    height: 43px;
    background: #E8833A;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;

    h5{
    font-weight: 400;
    font-size: 18px;
    color: #FFFFFF;
    }
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