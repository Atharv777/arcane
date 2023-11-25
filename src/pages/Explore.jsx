import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import Card from '../components/Card';

import productImg from "../assets/img/product1.png";

import getAllProducts from '../utils/getAllProducts';
import { toast } from 'react-toastify';

export default function Explore() {

    useEffect(() => {
        document.body.classList.add("bg-green")
        document.body.classList.remove("bg-greenred")
    }, [])

    const { isConnected, address } = useAccount()

    const [products, setProducts] = useState([])

    useEffect(() => {
        if (isConnected && address) {
            (async () => {
                const data = await getAllProducts();
                if (data.status === "Success") {
                    setProducts(data.data)
                    console.log(data)
                }
                else {
                    toast.error(
                        data.data.msg,
                        {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        })
                }
            })();
        }
    }, [isConnected, address])



    return (
        <div className="flex-1 flex flex-col justify-center px-[6vw] gap-20">
            <div className='flex flex-row justify-center gap-x-[50px] w-full flex-wrap gap-y-[60px] mt-[100px] mb-[30px]'>
                {
                    products && products.length
                        ? products.map((item, ind) => {
                            return (
                                <Card
                                    id={ind}
                                    data={{
                                        id: item.id,
                                        name: item.ipfsData.name,
                                        desc: item.ipfsData.desc,
                                        img: item.ipfsData.img,
                                        price: item.price
                                    }}
                                />
                            )
                        })
                        : <p className='lexendExa text-center flex-1 text-white/75 text-xl'>No Products Found</p>
                }

            </div>
        </div>
    )
}