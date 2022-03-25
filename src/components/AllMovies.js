import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies`;

export default function AllMovies(){
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const promise = axios.get(URL);
        promise.then((response) =>{
            setMovies(response.data)
        })
    },[])

    return(
        <AllMoviesMain>
            {movies.map(movie => 
                <Poster key={movie.posterURL}>
                    <img src={movie.posterURL} alt="poster" /> 
                </Poster>    
            )}
        </AllMoviesMain>
    )
}

const AllMoviesMain =  styled.div`
    margin-top: 67px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`

const Poster = styled.div`
    width: 145px;
    height: 209px;
    background: #FFFFFF;
    margin-top: 19px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 129px;
        height: 193px;
    }
`