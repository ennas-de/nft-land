const hre = require("hardhat")
require("dotenv").config()

const main = async () => {
    const NextRoundNFT = await hre.ethers.getContractFactory("NextRoundNFT");
    const nextRoundNFT = await NextRoundNFT.deploy("0xbf04165D4283BD1454Ba1C58236C7AeA8aD12a5D");

    await nextRoundNFT.deployed();
    console.log("NextRoundNFT deployed to:", nextRoundNFT.address);
    // NextRoundNFT deployed to: 0x789b5924d75Eb715B41e6E576e7fF36Fd1ac484E
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error({error});
        process.exit(1);
    }
}

runMain()