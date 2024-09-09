import React, { Fragment, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const [movie, setMovie] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ec9e0f68699c576a9904e295326db236&page=${pageNumber}`)
            .then((res) => {
                console.log(res.data.results);
                setMovie(res.data.results);
            });
    }, [pageNumber]);

    useEffect(() => {
        if (search) {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ec9e0f68699c576a9904e295326db236&query=${search}`)
                .then((res) => {
                    setMovie(res.data.results);
                })
                .catch((err) => console.error(err));
        }
    }, [search]);

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    const handleNextPage = () => {
        setPageNumber((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber((prevPage) => prevPage - 1);
        }
    };

    const handleSearch = (e) => {
        const oneMovie = e.target.value;
        setSearch(oneMovie);
    };

    return (
        <Fragment>
            <Header />
            <div className='flex justify-between items-center'>
                <p className='text-6xl text-[#1E2A5E] p-3 font-black text-center'>
                    Our Movies
                </p>
                <input
                    value={search}
                    onChange={handleSearch}
                    className='m-2 p-3 w-full h-24 border-2 rounded-full'
                    type="text"
                    placeholder='Search Movie'
                />
            </div>
            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
                {movie.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col m-5 p-6 border border-gray-200 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer"
                        onClick={() => handleMovieClick(item.id)}
                    >
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} className="w-full h-48 object-cover rounded-t-xl mb-4" />
                        <ul className="list-none px-4">
                            <li className="font-bold text-xl text-[#1e2a5e] mb-2">{item.original_title}</li>
                            <li className="text-gray-600 mb-4">{item.overview}</li>
                            <li className="text-lg font-semibold text-[#a2acc9] mb-2">Release: {item.release_date}</li>
                        </ul>
                    </div>
                ))}
            </main>
            <div className='flex justify-evenly'>
                <button onClick={handlePreviousPage} className='w-28 p-4 m-2 border-2 text-[#1e2a5e] text-xl rounded-xl bg-[#a2acc9] font-bold hover:text-white'>Previous</button>
                <button onClick={handleNextPage} className='w-28 p-4 m-2 border-2 text-[#1e2a5e] text-xl rounded-xl bg-[#a2acc9] font-bold hover:text-white'>Next</button>
            </div>
        </Fragment>
    )
}