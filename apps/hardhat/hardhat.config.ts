import {HardhatUserConfig} from 'hardhat/types';  
import 'dotenv/config';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import {node_url, accounts} from './utils/network';
import "hardhat-gas-reporter"



const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.0',
      },
      {
        version: '0.8.1',
      },
      {
      version: '0.7.6',
      }
    ]
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      4: '0xA296a3d5F026953e17F472B497eC29a5631FB51B', // but for rinkeby it will be a specific address
      "rinkeby": '0x0000000000591b1DA6B179D1dA1ee31AFAE473e5',
      "mumbai": '0x0000000000591b1DA6B179D1dA1ee31AFAE473e5',
    },
    bob: 1,
    alice: 2,
    charlie: 3,
    david: 4,
    tokenOwner: {
      default: 5,
      "mumbai":'0x0000000000591b1DA6B179D1dA1ee31AFAE473e5',
      "meter":'0x0000000000591b1DA6B179D1dA1ee31AFAE473e5',
    },
  },
  networks: {
    rinkeby: {
      url: `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_SPEEDYNODES_KEY}/eth/rinkeby`, 
      accounts: [`${process.env.RINKEBY_DEPLOYER_KEY}`]
    },
    meter: {
      url: 'https://rpctest.meter.io',
      accounts: [`${process.env.RINKEBY_DEPLOYER_KEY}`]
    },
    kovan: {
      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXX/eth/kovan", 

    },
    mainnet: {
      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/mainnet", 

    },
    ropsten: {
      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/ropsten",

    },
    goerli: {
      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/goerli", 

    },
    xdai: {
      url: "https://rpc.xdaichain.com/",
      gasPrice: 1000000000,

    },
    fantom: {
      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/fantom/mainnet",
      gasPrice: 1000000000,

    },
    testnetFantom: {
      url: "https://rpc.testnet.fantom.network",
      gasPrice: 1000000000,

    },
    polygon: {
      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXx/polygon/mainnet", 
      gasPrice: 3200000000,

    },
    mumbai: {
      url: `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_SPEEDYNODES_KEY}/polygon/mumbai`, 
      accounts: [`${process.env.MUMBAI_DEPLOYER_KEY}`],
      gasPrice: 3200000000,
    },
    mainnetAvalanche: {
      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXx/avalanche/mainnet",
      gasPrice: 225000000000,
      chainId: 43114,

    },
    fujiAvalanche: {
      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXx/avalanche/testnet",
      gasPrice: 225000000000,
      chainId: 43113,

    },
  },
  // networks: {
  //   rinkeby: {
  //     url: node_url('rinkeby'),
  //     accounts: accounts('rinkeby'),
  //   },
  // },
  paths: {
    sources: 'src',
  },
  gasReporter: {
    currency: 'USD',
    enabled: (process.env.REPORT_GAS) ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY
  },
};
export default config;
