import * as ethers from "ethers";

import { CONTRACT_ADDRESS, ABI } from "./contractDetails";
import storeFiles from "./storeOnIPFS";

export default async function addProduct(name, desc, img, price, limit) {

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

            const cid = await storeFiles({ name: name, description: desc, image: img });
            console.log("https://" + cid + ".ipfs.w3s.link/nftInfo.json")

            let data = ""
            await connectedContract
                .addProduct(parseInt(limit), "https://ipfs.io/ipfs/" + cid + "/nftInfo.json", parseInt(ethers.parseEther(price)))
                .then(async (_data) => {
                    data = _data
                });

            return { status: "Success", data: data };
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
