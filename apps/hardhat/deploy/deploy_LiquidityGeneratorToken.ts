import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

import { ethers } from 'hardhat';
const { parseEther, formatEther } = ethers.utils;

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer, bob } = await getNamedAccounts();

  let manager = await deploy('TokenFactoryManager', {
    from: deployer,
    log: true
  })

  let implementation = await deploy('LiquidityGeneratorToken', {
    from: deployer,
    log: true,
  });

  let factory = await deploy('LiquidityGeneratorTokenFactory', {
    from: deployer,
    args: [
      manager.address,
      implementation.address
    ],
    log: true,
  });
  await deployments.execute(
    'TokenFactoryManager',
    { from: deployer, gasLimit: 5000000},
    'addTokenFactory',
    //args
    factory.address
  )

  //EVMOS
  //0x638771E1eE3c85242D811e9eEd89C71A4F8F4F73
  //Pancake BSC Mainnet
  //0x10ED43C718714eb63d5aA57B78B54704E256024E
  // P testsnet
  //0xd99d1c33f9fc3444f8101754abc46c52416550d1

  //parseEther("1")
  const router = '0x638771E1eE3c85242D811e9eEd89C71A4F8F4F73'

  
  let newToken = await deployments.execute(
    'LiquidityGeneratorTokenFactory',
    { from: bob, value: "1", gasLimit: 5000000 },
    'create',
    //args
    "test",
    "test",
    parseEther("10000"),
    router,
    "0xd4ec9a0BCd9D1Aeb295c0412641d15095A0C002F",
    10,
    10,
    10,
    30
  )

  console.log(`
  Manager: ${manager.address},
  implementation: ${implementation.address},
  factory: ${factory.address},
  newToken: ${newToken.transactionHash} owner ${bob}
  `)
  
  let interactTokenAddress:string;
  newToken.events?.forEach(async e => {
    if(e.hasOwnProperty('event') && e.event === 'TokenCreated'){
      interactTokenAddress = e.args.token
      console.log(`
      Clone Deployed at: ${e.args.token}
      Hash: ${e.blockHash}
      Owner: ${e.args.owner}`)


      let tokenABI = (await deployments.getArtifact('LiquidityGeneratorToken')).abi
      await deployments.save('interactTokenAddress', {abi: tokenABI, address : e.args.token})

    }
  })

  let approve = await deployments.execute(
    'interactTokenAddress',
    { from: bob, gasLimit: 5000000 },
    'approve',
    //args
    '0x638771e1ee3c85242d811e9eed89c71a4f8f4f73',
    '115792089237316195423570985008687907853269984665640564039457584007913129639935'
  )
  console.log(approve.transactionHash)

  await deployments.execute(
    'interactTokenAddress',
    { from: bob, value: parseEther("1"), gasLimit: 5000000 },
    'AddLiquidityBuildIn',
    //args
    parseEther("1")
  )
  
};
export default func;
func.tags = ['LiquidityGeneratorToken'];
