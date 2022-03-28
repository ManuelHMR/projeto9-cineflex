import reactDom from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import styled from "styled-components";
import { useState } from "react";

import AllMovies from "./components/AllMovies";
import Movie from "./components/Movie";
import Session from "./components/Session";
import Confirmation from "./components/Confirmation";

import "./css/reset.css"
import "./css/style.css"

function App(){
    const [userData, setUserData] = useState({
        ids: [],
        userName: ``,
        cpf: ``
    })
    const [movieData, setMovieData] = useState({
        seats: [],
        title: '',
        weekday: ``,
        name: ``
    })
    return(
        <>
            <Header>
                <h1>CINEFLEX</h1>
            </Header>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AllMovies />}></Route>
                    <Route path="/filme/:idMovie" element={<Movie />}></Route>
                    <Route path="/assentos/:idSessao" element={<Session 
                    userData={userData}
                    setUserData={setUserData}
                    setMovieData={setMovieData}
                    movieData={movieData}
                    />}></Route>
                    <Route path="/sucesso" element={<Confirmation 
                    userData={userData}
                    movieData={movieData}/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

const Header = styled.div`

    width: 100%;
    height: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #C3CFD9;
    top: 0px;
    left: 0px;
    position: absolute;
    h1{
        color: #E8833A;

    }
`




reactDom.render(<App/>, document.querySelector(".root"));


