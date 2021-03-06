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
      "evmos": '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      "bscTEST": '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    },
    bob: {
      default: 1,
      "evmos": '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
      "bscTEST": '0x0000000000591b1DA6B179D1dA1ee31AFAE473e5'
    },
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
      //accounts: [`${process.env.RINKEBY_DEPLOYER_KEY}`]
    },
    bscTEST: {
      url: `https://speedy-nodes-nyc.moralis.io/aaf5f27c6c7a9ad182a69ccd/bsc/testnet`, 
      accounts: ['ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', 'df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e']
    },
    meter: {
      url: 'https://rpctest.meter.io',
      //accounts: [`${process.env.RINKEBY_DEPLOYER_KEY}`]
    },
    evmos: {
      url: 'https://evmos-archive-testnet.api.bdnodes.net:8545',
      accounts: [`${process.env.RINKEBY_DEPLOYER_KEY}`, 'df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e']
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
      //accounts: [`${process.env.MUMBAI_DEPLOYER_KEY}`],
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
