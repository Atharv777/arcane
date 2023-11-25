import { Web3Storage } from "web3.storage";

export function makeStorageClient() {
    return new Web3Storage({ token: process.env.REACT_APP_IPFS_TOKEN });
}

export async function makeFileObjects(data) {
    const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
    });

    const files = [new File([blob], "nftInfo.json")];
    console.log(files);
    return files;
}

export default async function storeFiles(data) {
    const files = await makeFileObjects(data);
    const client = makeStorageClient();
    const cid = await client.put(files, { wrapWithDirectory: true });
    console.log(cid)
    return cid;
};