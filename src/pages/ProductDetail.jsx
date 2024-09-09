import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';

export const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState('');

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=ec9e0f68699c576a9904e295326db236`)
            .then((res) => {
                setMovie(res.data);
                console.log(res.data);
            });
    }, [id]);


    return (
        <Fragment>
            <Header />
            <div className="p-5">
                <h1 className="text-3xl font-bold mb-4">{movie.original_title}</h1>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-48 h-auto rounded-t-xl mb-4" />
                <p className="text-lg text-gray-700 mb-4">{movie.overview}</p>
                <p className="text-sm text-gray-500 mb-2">Release: {movie.release_date}</p>
                <p className="text-lg font-semibold text-blue-600">Vote: {movie.vote_average}</p>
                <p className="text-yellow-500 font-medium">Popularity: {movie.popularity} ⭐</p>
            </div>
        </Fragment>
    ); 
};