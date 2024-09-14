import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '@/middleware/dataActions';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Header } from '@/components/Header';
import { IMDb, PlayButton, ToLeft, ToRight } from '@/utils/icons.util';

export const HomePage = () => {
    const [search, setSearch] = useState('');
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [currentMovieBg, setCurrentMovieBg] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);
    const swiperRef = useRef(null);

    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector((state) => state);

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
            swiperRef.current?.swiper.slideTo(currentMovieIndex, 500);
        }
    }, [currentMovieIndex, movies]);

    useEffect(() => {
        if (currentMovieBg) {
            const img = new Image();
            img.src = `https://image.tmdb.org/t/p/original/${currentMovieBg}`;
            img.onload = () => {
                setImageLoaded(true);
            };
        }
    }, [currentMovieBg]);

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
        <main
            className='relative bg-cover bg-center'
            style={{
                backgroundImage: `radial-gradient(circle, rgba(2,0,36,0) 0%, rgba(0,0,0,0.468312324929972) 53%), url(${imageLoaded ? `https://image.tmdb.org/t/p/original/${currentMovieBg}` : ''})`,
                height: '100vh',
            }}
        >
            <div className='absolute inset-0 bg-black/20 text-white'>
                <Header />

                {/* Buttons for Next and Previous movie */}
                <button className='absolute left-5 top-2/3' onClick={handlePreviousMovie} disabled={currentMovieIndex === 0}>
                    <ToLeft />
                </button>
                <button className='absolute right-5 top-2/3' onClick={handleNextMovie} disabled={currentMovieIndex === movies.length - 1}>
                    <ToRight />
                </button>

                {/* Swiper Slider */}
                <div className='absolute flex justify-center items-center bottom-6 w-full px-6'>
                    <Swiper
                        ref={swiperRef}
                        slidesPerView={6}
                        spaceBetween={10}
                        centeredSlides={false}
                        loop={true}
                    >
                        {movies.map((movie, index) => (
                            <SwiperSlide key={index} onClick={() => setCurrentMovieIndex(index)}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                    alt={movie.title}
                                    className='shadow-2xl rounded-xl cursor-pointer'
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Movie Description*/}
                <main className='mx-40 mt-20 max-w-[770px]'>
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

                    </div>
                </main>
            </div>
        </main>
    );
};