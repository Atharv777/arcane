import React from 'react';
import logo from "../assets/img/home-gem-1.png";
import { NavLink } from 'react-router-dom';

import ConnectWalletButton from "./ConnectWalletButton"

export default function Header() {
    return (
        <div className='w-full flex flex-row mt-6 px-[60px] justify-between items-center'>
            <img src={logo} alt="arcane" className='w-10' />
            <div className='flex flex-row items-center gap-20'>
                <NavLink
                    to="/"
                    className={({ isActive }) => `lexend text-base text-[#eeeeee]/90 ${isActive && "text-glow-white"}`}
                // data-aos="fade-down"
                // data-aos-duration="250"
                // data-aos-delay="100"
                // data-aos-once="true"
                >
                    Home
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) => `lexend text-base text-[#eeeeee]/90 ${isActive && "text-glow-white"}`}
                // data-aos="fade-down"
                // data-aos-duration="250"
                // data-aos-delay="200"
                // data-aos-once="true"
                >
                    About
                </NavLink>

                <NavLink
                    to="/explore"
                    className={({ isActive }) => `lexend text-base text-[#eeeeee]/90 ${isActive && "text-glow-white"}`}
                // data-aos="fade-down"
                // data-aos-duration="250"
                // data-aos-delay="300"
                // data-aos-once="true"
                >
                    Explore
                </NavLink>

                <NavLink
                    to="/account"
                    className={({ isActive }) => `lexend text-base text-[#eeeeee]/90 ${isActive && "text-glow-white"}`}
                // data-aos="fade-down"
                // data-aos-duration="250"
                // data-aos-delay="400"
                // data-aos-once="true"
                >
                    Account
                </NavLink>

                <ConnectWalletButton />
            </div>
        </div>
    )
}