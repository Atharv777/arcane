import * as ethers from "ethers";

import { CONTRACT_ADDRESS, ABI } from "./contractDetails";

export default async function getAllProducts() {

    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const connectedContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                ABI,
                signer
            );

            const allProducts = [];

            await connectedContract
                .getAllProducts()
                .then(async (products) => {
                    const tempArr = products.toArray()

                    for (let i = 0; i < tempArr.length; i++) {
                        const element = tempArr[i].toArray();

                        if (element[3]) {
                            const res = await fetch(element[1]);
                            let resJson = await res.json();
                            const ipfsData = {
                                name: resJson.name,
                                desc: resJson.description,
                                img: resJson.image
                            }
                            const fetchedObject = {
                                id: ethers.toNumber(element[0]),
                                ipfsData: ipfsData,
                                price: ethers.formatEther(ethers.toNumber(element[2]).toString()),
                                listed: element[3],
                                votingComplete: element[4],
                                maxLimit: ethers.toNumber(element[5]),
                                numberOfVotes: ethers.toNumber(element[6]),
                            }
                            allProducts.push(fetchedObject)
                        }
                    }
                });


            return { status: "Success", data: allProducts };
        }
        else {
            console.log("Ethereum object doesn't exist!");
            return { status: "Error", data: { err: null, msg: "Some problem with Metamask! Please try again" } };
        }
    } catch (e) {
        console.error(e);
        return { status: "Error", data: { err: e, msg: "Unexpected error occurred!" } };
    }
}
