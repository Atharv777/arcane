import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';

import Button from './Button';
import listProduct from '../utils/listProduct';

export default function ListProductModal({ setOpenListProduct }) {

    const navigate = useNavigate();
    const { address, isConnected } = useAccount();

    const [id, setId] = useState(null)

    const handleSubmit = async () => {
        if (isConnected && address) {
            if (id) {
                const data = await listProduct(id)
                console.log(data)

                if (data.status === "Success") {
                    toast.success(
                        `Product with id ${id} is listed successfully! Txn hash is copied to clipboard.`,
                        {
                            position: "top-center",
                            autoClose: 2500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        })
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
            }
            else {
                toast.error(
                    "Incomplete details!",
                    {
                        position: "top-center",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
            }
        }
        else {
            toast.error(
                "Not Connected to metamask",
                {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
        }
    }


    return (
        <div
            onClick={() => {
                navigate("/account");
                setOpenListProduct(false);
            }}
            className="absolute top-0 left-0 z-[100] w-screen h-screen flex justify-center items-center bg-[#090909]/80 sm: md:px-20"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center px-20 py-[50px] gap-[30px] bg-[#090909] border-[3px] border-white/30 rounded-3xl lg:w-3/4"
            >
                <h2 className="lexendExa font-semibold text-3xl tracking-wide text-white">
                    List a product
                </h2>

                <div className="flex flex-col items-center p-0 gap-[20px] w-full lg:w-4/5">
                    <input
                        className="flex flex-row items-start px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none w-full font-medium text-sm text-white/70 placeholder:text-white/50"
                        type="number"
                        placeholder="Product ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <div className="mt-5 flex flex-row items-center justify-center gap-[20px] self-stretch">
                        <Button className="py-2 flex-1 text-base" onClick={handleSubmit}>List product</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
