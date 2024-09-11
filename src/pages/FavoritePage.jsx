import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { AiFillStar } from 'react-icons/ai'

export const FavoritePage = () => {
    const [favorite, setFavorite] = useState([])
    const favorites = JSON.parse(localStorage.getItem('Favorites')) || {};
    const favoriteIds = Object.values(favorites);

    useEffect(() => {
        const fetchMovies = async () => {
            const movieRequests = favoriteIds.map((movieId) =>
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ec9e0f68699c576a9904e295326db236`)
            );
            const movieResponses = await Promise.all(movieRequests);
            const movies = movieResponses.map((response) => response.data);
            setFavorite(movies);
        };
        fetchMovies();
    }, []);

    return (
        <Fragment>
            <Header />
            <div className='flex justify-between items-center'>
                <p className='text-6xl text-[#1E2A5E] p-3 font-black text-center'>
                    Favorites Movies
                </p>
            </div>
            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
                {favorite.map((item) => (
                    <div
                        key={item.id}
                        className="relative flex flex-col m-5 p-6 border border-gray-200 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer"
                    >
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} className="w-full h-48 object-cover rounded-t-xl mb-4" />
                        <ul className="list-none px-4">
                            <li className="font-bold text-xl text-[#1e2a5e] mb-2">{item.original_title}</li>
                            <li className="text-gray-600 mb-4">{item.overview}</li>
                            <li className="text-lg font-semibold text-[#a2acc9] mb-2">Release: {item.release_date}</li>
                        </ul>
                        <div className="absolute bottom-9 right-5 w-fit">
                            <AiFillStar color="gold" size={30} />
                        </div>
                    </div>
                ))}
            </main>
            <div className='flex justify-evenly'>
            </div>
        </Fragment>)
}