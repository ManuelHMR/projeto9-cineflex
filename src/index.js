import reactDom from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import styled from "styled-components";

import AllMovies from "./components/AllMovies";
import Movie from "./components/Movie";
import Session from "./components/Session";
import Confirmation from "./components/Confirmation";

import "./css/reset.css"
import "./css/style.css"

function App(){
    return(
        <>
            <Header>
                <h1>CINEFLEX</h1>
            </Header>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AllMovies />}></Route>
                    <Route path="/filme/:idMovie" element={<Movie />}></Route>
                    <Route path="/sessao" element={<Session />}></Route>
                    <Route path="/sucesso" element={<Confirmation />}></Route>
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


