/** @type import('hardhat/config').HardhatUserConfig */

require('@nomiclabs/hardhat-waffle');
require("dotenv").config()
// require("@nomicfoundation/hardhat-verify");
const { task } = require('hardhat/config');

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  networks: {
    hardhat: {
      gasPrice: 470000000000,
      chainId: 43112,
    },
    sepolia: {
      url: `${process.env.TESTNET_URL}`,
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
    mainnet: {
      url: `${process.env.MAINNET_URL}`, 
      accounts: [`${process.env.PRIVATE_KEY}`], 
      chainId: 1
    }
  },
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    // apiKey: `${process.env.ETHERSCAN_API}`
  },
  sourcify: {
    // enabled: true
  },
  paths: {
    // sources: "./contracts",
    // tests: "./test",
    // cache: "./cache",
    // artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};