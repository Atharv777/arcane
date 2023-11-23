export default async function getAllANFTs(address) {

    try {
        const baseURL = process.env.REACT_APP_ALCHEMY;
        const url = `${baseURL}/getNFTs/?owner=${address}`;

        var requestOptions = {
            method: 'get',
            redirect: 'follow'
        };
        const nfts = [];
        const res = await fetch(url, requestOptions);
        const data = await res.json()

        console.log(data)
        for (let i = 0; i < data.ownedNfts.length; i++) {
            console.log(data.ownedNfts[i].contract.address)

            const fetchedObject = {
                id: Number(data.ownedNfts[i].id.tokenId.split("0x")[1]).toString(),
                name: data.ownedNfts[i].metadata.name,
                desc: data.ownedNfts[i].metadata.description,
                img: data.ownedNfts[i].media[0].gateway,
                timestamp: new Date(data.ownedNfts[i].timeLastUpdated).toLocaleString(),
                tokenLink: `https://testnets.opensea.io/assets/mumbai/${data.ownedNfts[i].contract.address}/${Number(data.ownedNfts[i].id.tokenId.split("0x")[1]).toString()}`
            }
            nfts.push(fetchedObject)
        }

        return { status: "Success", data: nfts };

    } catch (e) {
        console.error(e);
        return { status: "Error", data: { err: e, msg: "Unexpected error occurred!" } };
    }
}

// import * as ethers from "ethers";

// import { CONTRACT_ADDRESS, ABI } from "./contractDetails";

// export default async function getAllOwnedNFTs() {

//     try {
//         const { ethereum } = window;

//         if (ethereum) {
//             const provider = new ethers.BrowserProvider(ethereum);
//             const signer = await provider.getSigner();
//             const connectedContract = new ethers.Contract(
//                 CONTRACT_ADDRESS,
//                 ABI,
//                 signer
//             );

//             const allNfts = [];

//             await connectedContract
//                 .getMyNFTs()
//                 .then(async (item) => {
//                     const tempArr = item.toArray()

//                     for (let i = 0; i < tempArr.length; i++) {
//                         const element = parseInt(tempArr[i])
//                         console.log(element)

//                         await connectedContract
//                             .getProduct(element)
//                             .then(async (product) => {
//                                const pr = product.toArray()


//                                 const res = await fetch(pr[1]);
//                                 let resJson = await res.json();
//                                 const ipfsData = {
//                                     name: resJson.name,
//                                     desc: resJson.description,
//                                     img: resJson.image
//                                 }
//                                 const fetchedObject = {
//                                     id: ethers.toNumber(pr[0]),
//                                     ipfsData: ipfsData,
//                                     price: ethers.formatEther(ethers.toNumber(pr[2]).toString()),
//                                     listed: pr[3],
//                                     votingComplete: pr[4],
//                                     maxLimit: ethers.toNumber(pr[5]),
//                                     numberOfVotes: ethers.toNumber(pr[6]),
//                                 }
//                                 allProducts.push(fetchedObject)

//                             })
//                     }
//                 });


//             return { status: "Success", data: allNfts };
//         }
//         else {
//             console.log("Ethereum object doesn't exist!");
//             return { status: "Error", data: { err: null, msg: "Some problem with Metamask! Please try again" } };
//         }
//     } catch (e) {
//         console.error(e);
//         return { status: "Error", data: { err: e, msg: "Unexpected error occurred!" } };
//     }
// }
