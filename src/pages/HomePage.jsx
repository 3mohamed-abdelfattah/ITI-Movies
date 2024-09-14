import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decrement, increment } from '../store[NotUsed]/Actions';
import { fetchMovies, searchMovies } from '../middleware/dataActions';
import BG from '../assets/wallpaper.jpg'
import { Header } from '../components/Header';
import { MainDescription } from '../components/MainDescription';

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
        <main
            className='bg-cover bg-center backdrop-blur-3xl	'
            style={{
                backgroundImage: `url(${BG})`,
                height: '100vh',
            }}
        >
            <div className='absolute inset-0 backdrop-blur-sm text-white'>
                <Header />
                <MainDescription />
            </div>
        </main>
    );
};
