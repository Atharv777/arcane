import React, { useEffect } from 'react';
import illus from "../assets/img/about-illus.png"

export default function About() {

    useEffect(() => {
        document.body.classList.add("bg-greenred")
        document.body.classList.remove("bg-green")
    }, [])


    return (
        <div className='flex-1 flex flex-row items-center px-[12vw]'>
            {/* <img src={gif} draggable={false} alt="" /> */}
            <div className='flex-1'></div>
            <div className='flex-1 flex flex-col gap-10'>
                <p
                    className='capatalize text-center font-[omega] text-[#fff]/60 text-6xl'
                    data-aos="fade-down" data-aos-duration="400" data-aos-delay="50"
                >
                    About Us
                </p>
                <p
                    className='lexend text-center text-white/70 text-lg leading-[150%]'
                    data-aos="fade-down" data-aos-duration="400" data-aos-delay="300"
                >
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.
                </p>
            </div>
            <img src={illus} draggable={false} className='absolute left-0 bottom-0 w-[33vw]' />
        </div>
    )
}
