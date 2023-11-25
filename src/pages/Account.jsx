import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { toast } from 'react-toastify';

import Card from '../components/Card';
import Button from '../components/Button';
import ListProductModal from '../components/ListProductModal';
import AddProductModal from '../components/AddProductModal';
import VoteProductModal from '../components/VoteProductModal';

import getAllOwnedNFTs from "../utils/getAllANFTs"
import getOwner from "../utils/getOwner"
import getDAOMembers from "../utils/getDAO"


export default function Account() {

    const { isConnected, address } = useAccount();
    const [myNfts, setMyNfts] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [isDAO, setIsDAO] = useState(false);

    const [openListProduct, setOpenListProduct] = useState(false);
    const [openAddProduct, setOpenAddProduct] = useState(false);
    const [openVoteProduct, setOpenVoteProduct] = useState(false);

    // On toggle of Modal, change the scroll mode of body
    useEffect(() => {
        if (openListProduct || openAddProduct || openVoteProduct) {
            window.scroll(0, 0)
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "scroll";
        }
    }, [openListProduct, openAddProduct, openVoteProduct]);

    useEffect(() => {
        if (isConnected && address) {

            (async () => {
                const ow = await getOwner()
                const dao = await getDAOMembers()

                if (ow.status === "Success") {
                    if (ow.data.toLowerCase() === address.toLowerCase()) {
                        setIsOwner(true)
                    }
                    else {
                        setIsOwner(false)
                        if (dao.status === "Success") {
                            if (dao.data.includes(address)) {
                                setIsDAO(true)
                            }
                            else {
                                setIsDAO(false)
                            }
                        }
                    }
                }
            })();

            (async () => {
                const data = await getAllOwnedNFTs(address)
                console.log(data)
                if (data.status === "Success") {
                    setMyNfts(data.data)
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
            })()
        }
    }, [isConnected, address])

    useEffect(() => {
        document.body.classList.add("bg-green")
        document.body.classList.remove("bg-greenred")
    }, [])



    return (
        <div className="flex-1 flex flex-col justify-start items-center px-[6vw] pt-[75px] gap-20">

            {
                isOwner && <>
                    <div className='flex flex-row gap-6 justify-center items-center'>
                        <Button className="px-4 py-2 text-sm" onClick={() => setOpenAddProduct(true)}>Add Product</Button>
                        <p>OR</p>
                        <Button className="px-4 py-2 text-sm" onClick={() => setOpenListProduct(true)}>List Product</Button>
                    </div>
                </>
            }

            {
                isDAO && <>
                    <div className='flex flex-row gap-6 justify-center items-center'>
                        <Button className="px-4 py-2 text-sm" onClick={() => setOpenVoteProduct(true)}>Vote for product</Button>
                    </div>
                </>
            }

            <p className='lexendDeca text-white leading-none text-3xl font-medium'>Previously bought products</p>

            <div className='flex flex-row justify-between w-full flex-wrap gap-y-[60px] mb-[30px]'>
                {
                    myNfts && myNfts.length
                        ? myNfts.map((item, ind) => {
                            return (
                                <Card
                                    id={ind}
                                    data={item}
                                />
                            )
                        })
                        : <p className='lexendExa text-center flex-1 text-white/75 text-xl'>No Products Found</p>
                }

            </div>

            {openListProduct && <ListProductModal setOpenListProduct={setOpenListProduct} />}
            {openAddProduct && <AddProductModal setOpenAddProduct={setOpenAddProduct} />}
            {openVoteProduct && <VoteProductModal setOpenVoteProduct={setOpenVoteProduct} />}
        </div>
    )
}
