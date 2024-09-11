import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { decrement, increment } from '../store[NotUsed]/Actions';
import { Header } from '../components/Header';
import { fetchMovies, searchMovies } from '../middleware/dataActions';

export const HomePage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState('');
    const [star, setStar] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { movies, loading, error } = useSelector((state) => state);
    console.log('Movies from Redux Store:', movies);
    console.log('Loading:', loading);
    console.log('Error:', error);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('Favorites')) || {};
        setStar(storedFavorites);
    }, []);

    useEffect(() => {
        if (search.trim()) {
            dispatch(searchMovies(search.trim()));
        } else {
            dispatch(fetchMovies(pageNumber));
        }
    }, [dispatch, search, pageNumber]);

    useEffect(() => {
        if (!search.trim()) {
            dispatch(fetchMovies(pageNumber));
        }
    }, [dispatch, pageNumber]);

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
        setSearch(e.target.value);
    };

    const toggleStar = (id) => {
        setStar((prev) => {
            const updatedStar = { ...prev };

            if (updatedStar[id]) {
                delete updatedStar[id];
                localStorage.setItem('Favorites', JSON.stringify(updatedStar));
                dispatch(decrement());
            } else {
                updatedStar[id] = id;
                localStorage.setItem('Favorites', JSON.stringify(updatedStar));
                dispatch(increment());
            }

            return updatedStar;
        });
    };

    return (
        <Fragment>
            <Header />
            <div className="flex justify-between items-center">
                <p className="text-6xl text-[#1E2A5E] p-3 font-black text-center">
                    Our Movies
                </p>
                <input
                    value={search}
                    onChange={handleSearch}
                    className="m-2 p-3 w-full h-24 border-2 rounded-full"
                    type="text"
                    placeholder="Search Movie"
                />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : movies && movies.length > 0 ? (
                <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
                    {movies.map((item) => (
                        <div
                            key={item.id}
                            className="relative flex flex-col m-5 p-6 border border-gray-200 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                alt={item.title}
                                className="w-full h-48 object-cover rounded-t-xl mb-4"
                            />
                            <ul className="list-none px-4" onClick={() => handleMovieClick(item.id)}>
                                <li className="font-bold text-xl text-[#1e2a5e] mb-2">{item.original_title}</li>
                                <li className="text-gray-600 mb-4">{item.overview}</li>
                                <li className="text-lg font-semibold text-[#a2acc9] mb-2">Release: {item.release_date}</li>
                            </ul>
                            <div
                                onClick={() => toggleStar(item.id)}
                                className="absolute bottom-9 right-5 w-fit"
                            >
                                {star[item.id] ? (
                                    <AiFillStar color="gold" size={30} />
                                ) : (
                                    <AiOutlineStar color="gray" size={30} />
                                )}
                            </div>
                        </div>
                    ))}
                </main>
            ) : (
                <p>No movies found</p>
            )}
            <div className="flex justify-evenly">
                <button
                    onClick={handlePreviousPage}
                    className="w-28 p-4 m-2 border-2 text-[#1e2a5e] text-xl rounded-xl bg-[#a2acc9] font-bold hover:text-white"
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    className="w-28 p-4 m-2 border-2 text-[#1e2a5e] text-xl rounded-xl bg-[#a2acc9] font-bold hover:text-white"
                >
                    Next
                </button>
            </div>
        </Fragment>
    );
};
