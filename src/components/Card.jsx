import React from 'react';
import { Link } from 'react-router-dom';

import buyProduct from "../utils/buyProduct"

export default function Card({ data }) {

    const handleClick = async () => {
        const dta = await buyProduct(data.id, data.price)
        console.log(dta)
    }

    return (
        <div className='flex flex-col items-center rounded-xl border border-white/10 bg-[var(--blue-05)] shadow-lg w-[355px] p-[20px] gap-[40px]'>

            <div className='relative flex justify-center items-center self-stretch py-[30px] gap-[10px] rounded-xl border border-white/20'>
                <img src={data.img} alt="Product" className='w-[200px] z-10' />
                <img src={data.img} className='w-[200px] blur-xl absolute z-0' />
            </div>

            <div className='flex flex-col gap-[20px] self-stretch'>
                <div className='flex flex-col gap-[5px] self-stretch'>
                    <p className='lexendDeca text-white leading-none text-lg font-medium'>{data.name}</p>
                    <p className='lexend text-white/60 leading-none text-xs font-light text-ellipsis line-clamp-1'>{data.desc}</p>
                </div>
                {
                    data.timestamp
                        ? <div className='flex flex-row justify-between self-stretch'>
                            <p className='lexend text-white/70 leading-none'>{data.timestamp}</p>
                            <Link to={data.tokenLink} target='_blank' className='lexendGiga text-glow-blue text-sm font-light hover:scale-105 transition'>View NFT →</Link>
                        </div>
                        : <div className='flex flex-row justify-between self-stretch'>
                            <p className='lexend text-white/70 leading-none'>{data.price} Matic</p>
                            <p className='cursor-pointer lexendGiga text-glow-blue text-sm font-light hover:scale-105 transition' onClick={handleClick}>Buy now →</p>
                        </div>
                }

            </div>

        </div>
    )
}