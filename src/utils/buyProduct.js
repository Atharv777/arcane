import * as ethers from "ethers";

import { CONTRACT_ADDRESS, ABI } from "./contractDetails";

export default async function buyProduct(id, price) {

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
            const options = { value: ethers.parseEther(price) }

            const data = await connectedContract
                .buyProduct(id, options)
                .then(async (data) => {
                    console.log(data)
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
