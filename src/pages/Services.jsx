import React, { Fragment } from 'react'
import { Header } from '../components/Header'

export const Services = () => {
    const styles = {
        mainContainer: `flex flex-col justify-center items-center h-screen`
    }
    return (
        <Fragment>
            <Header />
            <main className={styles.mainContainer}>
                <p className='text-9xl text-[#1E2A5E] p-5 m-5 font-black'>
                    ServicesPage
                </p>
                <p className='text-6xl text-[#55679C] p-5 m-5 italic font-bold decoration-3 underline decoration-wavy decoration-[#7C93C3]'>
                    Hello User !!
                </p>
            </main>
        </Fragment>
    )
}
