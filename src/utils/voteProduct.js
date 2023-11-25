import * as ethers from "ethers";

import { CONTRACT_ADDRESS, ABI } from "./contractDetails";

export default async function voteProduct(id, price) {

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

            let data = "";
            await connectedContract
                .vote(parseInt(id), parseInt(ethers.parseEther(price)))
                .then(async (_data) => {
                    data = _data
                    console.log(_data)
                });

            return { status: "Success", data: data };
        }
        else {
            console.log("Ethereum object doesn't exist!");
            return { status: "Error", data: { err: null, msg: "Some problem with Metamask! Please try again" } };
        }
    } catch (e) {
        console.error(e);
        if (JSON.stringify(e).includes("Voting is already completed")) {
            return { status: "Error", data: { err: e, msg: "Voting is already completed!" } };
        }
        else if (JSON.stringify(e).includes("Invalid Product ID")) {
            return { status: "Error", data: { err: e, msg: "Invalid Product ID!" } };
        }
        else if (JSON.stringify(e).includes("You have already voted")) {
            return { status: "Error", data: { err: e, msg: "You have already voted!" } };
        }
        else {
            return { status: "Error", data: { err: e, msg: "Unexpected error occurred!" } };
        }
    }
}
