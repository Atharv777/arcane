import * as ethers from "ethers";

import { CONTRACT_ADDRESS, ABI } from "./contractDetails";

export default async function listProduct(id) {

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
                .listProduct(id)
                .then(async (_data) => {
                    console.log(_data)
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

        if (JSON.stringify(e).includes("Invalid Product ID")) {
            return { status: "Error", data: { err: e, msg: "Invalid Product ID!" } };
        }
        else if (JSON.stringify(e).includes("Voting is still in progres")) {
            return { status: "Error", data: { err: e, msg: "Voting is still in progress!" } };
        }
        else if (JSON.stringify(e).includes("Product is already listed on the marketplace")) {
            return { status: "Error", data: { err: e, msg: "Product is already listed on the marketplace!" } };
        }
        else {
            return { status: "Error", data: { err: e, msg: "Unexpected error occurred!" } };
        }
    }
}
