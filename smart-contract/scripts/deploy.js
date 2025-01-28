const hre = require("hardhat")
require("dotenv").config()

const main = async () => {
    const NextRound = await hre.ethers.getContractFactory("NextRound");
    const nextRound = await NextRound.deploy();

    await nextRound.deployed();
    console.log("NextRound deployed to:", nextRound.address);
    // NextRound deployed to: 0xbf04165D4283BD1454Ba1C58236C7AeA8aD12a5D
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