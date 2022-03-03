import {expect} from "./chai-setup";
import {setupUsers, setupUser} from './utils';
import {ethers, deployments, getNamedAccounts, getUnnamedAccounts} from 'hardhat';
const { parseEther, formatEther } = ethers.utils;


// we create a stup function that can be called by every test and setup variable for easy to read tests
async function setup () {
    await deployments.fixture(["LiquidityGeneratorToken"]);  
    const contracts = {
      myContract: (await ethers.getContract('LiquidityGeneratorToken')),
    };
  
    // we get the deployer
    const {deployer, bob, alice} = await getNamedAccounts();
    // get fet unnammedAccounts
    // These object allow you to write things like `users[0].Token.transfer(....)`
    const users = await setupUsers(await getUnnamedAccounts(), contracts);
    // finally we return the whole object (including the tokenOwner setup as a User object)
    return {
      ...contracts,
      users,
      deployer: await setupUser(deployer, contracts),
      bob: await setupUser(bob, contracts),
      alice: await setupUser(alice, contracts),
    };
  }

describe("MYTokne", function () {

  describe("Deployment Checks", function () {

    it("Should check the deploy msg", async function () {
      const {myContract} = await setup();
      expect("lol").to.equal("lol");
    });
  });

   
});
