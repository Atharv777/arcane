import * as ethers from "ethers";

import { CONTRACT_ADDRESS, ABI } from "./contractDetails";

export default async function getOwner() {

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

            let owner = "";

            await connectedContract
                .owner()
                .then(async (ow) => {
                    owner = ow
                });

            return { status: "Success", data: owner };
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
