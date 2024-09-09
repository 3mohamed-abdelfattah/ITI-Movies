import React, { Fragment } from 'react';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const styles = {
        mainContainer: `flex flex-col justify-center items-center h-screen`
    };
    const navigate = useNavigate();

    return (
        <Fragment>
            <Header />
            <main className={styles.mainContainer}>
                <p className='text-7xl text-[#1E2A5E] p-5 m-5 font-black text-center'>
                    Error 404<br /> Page Not Found
                </p>
                <button
                    className='border-2 hover:bg-[#1E2A5E] hover:text-white border-[#1E2A5E] p-2 rounded text-xl text-[#1E2A5E] font-semibold'
                    onClick={() => navigate('/')}
                >
                    Back To Home Screen
                </button>
            </main>
        </Fragment>
    );
}