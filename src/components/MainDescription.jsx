import React from 'react'
import { IMDb, PlayButton, ToLeft, ToRight } from '../utils/icons.util'

export const MainDescription = () => {
    return (
        <main className='mx-40 mt-20 max-w-[470px]'>
            <p className='text-7xl font-semibold text-[#F7F7F7] mb-6'>Spider man No Way Home</p>

            <div className='flex flex-col gap-6'>
                <span className='flex'>
                    <div className='flex gap-2'>
                        <IMDb />
                        <span className='text-sm font-normal'>8.2</span>
                        <span className='text-sm font-normal text-white/40'>(12.822)</span>
                    </div>
                    <span className='text-sm font-normal mx-3'>•</span>
                    <div className='flex gap-2'>
                        <span className='text-sm font-normal text-white/70'>2021</span>
                        <span className='text-sm font-normal text-white/70'>|</span>
                        <span className='text-sm font-normal text-white/70'>adult</span>
                        <span className='text-sm font-normal text-white/70'>|</span>
                        <span className='text-sm font-normal text-white/70'>en</span>
                        <span className='text-sm font-normal text-white/70'>|</span>
                        <span className='text-sm font-normal text-white/70'>Sci-fi</span>
                    </div>
                </span>
                <p className='text-base font-normal'>Scelerisque sed ultricies tristique. Mi in vivamus aliquam varius eu felis. Id ultricies diam turpis mi tincidunt. Ut morbi sed urna tempor imperdiet eu scelerisque egestas. Interdum mi orci suspendisse in s... </p>
                <span className='flex gap-4'>
                    <button className='py-3 px-6 border border-white/60 rounded-lg text-base font-medium'>Watch trailer</button>
                    <button className='flex py-3 px-6 gap-3 bg-[#F5C61C] rounded-lg text-base text-[#2E2E2E] items-center font-medium'><PlayButton />Watch now</button>
                </span>
                <span className='flex gap-4 mt-10'>
                    <ToLeft />
                    <ToRight />
                </span>
            </div>
        </main>
    )
}




