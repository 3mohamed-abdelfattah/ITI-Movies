import { MdOutlineContactSupport } from "react-icons/md";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import { FiHome } from "react-icons/fi";
import React from 'react'
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header className="flex justify-between items-center px-5 bg-[#55679c8b] shadow-xl">
            <div>
                <p className="text-2xl font-black text-[#1E2A5E] drop-shadow-2xl" id="Logo">MOHAMED</p>
            </div>
            <div className='w-full'>
                <ul className='flex justify-end items-center text-2xl font-bold my-5 mx-10 p-3 text-[#1E2A5E] gap-20'>
                    <Link to="/">
                        <li className="flex items-center hover:text-white hover:scale-110 active:text-[#55679C] active:scale-90">
                            <FiHome />
                            Home
                        </li>
                    </Link>
                    <Link to="/about">
                        <li className="flex items-center hover:text-white hover:scale-110 active:text-[#55679C] active:scale-90">
                            <CiCircleInfo />
                            About
                        </li>
                    </Link>
                    <Link to="/services">
                        <li className="flex items-center hover:text-white hover:scale-110 active:text-[#55679C] active:scale-90">
                            <MdOutlineMiscellaneousServices />
                            Services
                        </li>
                    </Link>
                    <Link to="/contact">
                        <li className="flex items-center hover:text-white hover:scale-110 active:text-[#55679C] active:scale-90">
                            <MdOutlineContactSupport />
                            Contact
                        </li>
                    </Link>
                </ul>
            </div>
        </header>
    )
}
