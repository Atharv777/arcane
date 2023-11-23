import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';

import Button from "../components/Button";
import homeImg2 from "../assets/img/home-gem-2.png";


export default function Home() {

    useEffect(() => {
        document.body.classList.add("bg-greenred")
        document.body.classList.remove("bg-green")
    }, [])


    const { isConnected, address } = useAccount()

    return (
        <div className="flex-1 flex flex-col justify-center px-[6vw] gap-20">
            <div className='flex flex-col gap-5' data-aos="fade-down" data-aos-duration="500" data-aos-delay="100">
                <p className='font-[omega] capitalize text-[min(90px,8vw)] leading-[105%]'>Welcome Back,</p>
                <p className='font-[omega] capitalize text-[min(90px,8vw)] leading-[105%]'>
                    {isConnected
                        ? address.slice(0, 4) + "..." + address.slice(-5, -1)
                        : "..."}
                </p>
            </div>
            <Link to="/explore"><Button className="ml-5 py-3 px-14 text-base">Explore products</Button></Link>
            <img src={homeImg2} draggable={false} className='absolute right-0 bottom-0 w-[35vw]' />
        </div>
    )
}
