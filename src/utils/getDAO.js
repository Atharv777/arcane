import * as ethers from "ethers";

import { CONTRACT_ADDRESS, ABI } from "./contractDetails";

export default async function getDAOMembers() {

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

            let members = [];

            await connectedContract
                .getDAOMembers()
                .then(async (ows) => {
                    members = ows.toArray()
                });

            return { status: "Success", data: members };
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
