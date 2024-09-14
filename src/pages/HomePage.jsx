import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { MainDescription } from '../components/MainDescription';

export const HomePage = () => {
    const [currentMovieBg, setCurrentMovieBg] = useState('')
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        if (currentMovieBg) {
            const img = new Image();
            img.src = `https://image.tmdb.org/t/p/original/${currentMovieBg}`;
            img.onload = () => {
                setImageLoaded(true);
            };
        }
    }, [currentMovieBg]);

    return (
        <main
            className='bg-cover bg-center'
            style={{
                backgroundImage: `radial-gradient(circle, rgba(2,0,36,0) 0%, rgba(0,0,0,0.468312324929972) 53%), url(${imageLoaded ? `https://image.tmdb.org/t/p/original/${currentMovieBg}` : ''})`,
                height: '100vh',
                transition: 'background-image 0.5s ease-in-out',
            }}
        >
            <div className='absolute inset-0 text-white'>
                <Header />
                <MainDescription setCurrentMovieBg={setCurrentMovieBg} />
            </div>
        </main>
    );
};