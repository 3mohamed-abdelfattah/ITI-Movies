import React, { useEffect, useState } from 'react';
import { IMDb, PlayButton, ToLeft, ToRight } from '../utils/icons.util';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../middleware/dataActions';

export const MainDescription = ({ setCurrentMovieBg }) => {
    const [search, setSearch] = useState('');
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { movies, loading, error } = useSelector((state) => state);

    // Fetch movies from API
    useEffect(() => {
        if (search.trim()) {
            dispatch(searchMovies(search.trim()));
        } else {
            dispatch(fetchMovies());
        }
    }, [dispatch, search]);

    useEffect(() => {
        if (movies && movies.length > 0) {
            setCurrentMovieBg(movies[currentMovieIndex]?.backdrop_path || '');
        }
    }, [currentMovieIndex, movies, setCurrentMovieBg]);

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    const handleNextMovie = () => {
        if (currentMovieIndex < movies.length - 1) {
            setCurrentMovieIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePreviousMovie = () => {
        if (currentMovieIndex > 0) {
            setCurrentMovieIndex((prevIndex) => prevIndex - 1);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!movies || movies.length === 0) {
        return <p>No movies found.</p>;
    }

    const currentMovie = movies[currentMovieIndex];

    return (
        <main className='mx-40 mt-20 max-w-[470px]'>
            <p className='text-7xl font-semibold text-[#F7F7F7] mb-6'>{currentMovie?.title || 'Movie Title'}</p>

            <div className='flex flex-col gap-6'>
                <span className='flex'>
                    <div className='flex gap-2'>
                        <IMDb />
                        <span className='text-sm font-normal'>{currentMovie?.vote_average || 'N/A'}</span>
                        <span className='text-sm font-normal text-white/40'>({currentMovie?.vote_count || 'N/A'})</span>
                    </div>
                    <span className='text-sm font-normal mx-3'>•</span>
                    <div className='flex gap-2'>
                        <span className='text-sm font-normal text-white/70'>{currentMovie?.release_date?.split('-')[0] || 'N/A'}</span>
                        <span className='text-sm font-normal text-white/70'>|</span>
                        <span className='text-sm font-normal text-white/70'>{currentMovie?.adult ? 'Adult' : 'All ages'}</span>
                        <span className='text-sm font-normal text-white/70'>|</span>
                        <span className='text-sm font-normal text-white/70'>{currentMovie?.original_language || 'en'}</span>
                        <span className='text-sm font-normal text-white/70'>|</span>
                        <span className='text-sm font-normal text-white/70'>{currentMovie?.genre_ids?.[0] || 'Genre'}</span>
                    </div>
                </span>

                <p className='text-base font-normal'>{currentMovie?.overview || 'Movie description not available.'}</p>

                <span className='flex gap-4'>
                    <button className='py-3 px-6 border border-white/60 rounded-lg text-base font-medium'>
                        Watch trailer
                    </button>
                    <button className='flex py-3 px-6 gap-3 bg-[#F5C61C] rounded-lg text-base text-[#2E2E2E] items-center font-medium'>
                        <PlayButton />
                        Watch now
                    </button>
                </span>

                {/* Buttons for Next and Previous movie */}
                <span className='flex gap-4 mt-10'>
                    <button onClick={handlePreviousMovie} disabled={currentMovieIndex === 0}>
                        <ToLeft />
                    </button>
                    <button onClick={handleNextMovie} disabled={currentMovieIndex === movies.length - 1}>
                        <ToRight />
                    </button>
                </span>
            </div>
        </main>
    );
};