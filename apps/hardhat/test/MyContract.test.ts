import {expect} from "./chai-setup";
import {setupUsers, setupUser} from './utils';
import {ethers, deployments, getNamedAccounts, getUnnamedAccounts} from 'hardhat';
const { parseEther, formatEther } = ethers.utils;


// we create a stup function that can be called by every test and setup variable for easy to read tests
async function setup () {
    await deployments.fixture(["MyContract"]);  
    const contracts = {
      myContract: (await ethers.getContract('MyContract')),
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

describe("MyContract", function () {

  describe("Deployment Checks", function () {

    it("Should check the deploy msg", async function () {
      const {myContract} = await setup();
      expect(await myContract.purpose()).to.equal("Hello, world!");
    });

    it("Should change the owner", async function () {
      const {myContract, deployer, bob} = await setup();

      // MyContract is Ownable
      // https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable

      // check current owner
      expect(await myContract.owner()).to.equal(deployer.address);
      // transfer ownership to bob
      await myContract.transferOwnership(bob.address)
      // verify bob is the new owner
      expect(await myContract.owner()).to.equal(bob.address);
    });
  });

  describe("Interactions", function () {
    it("Should set a new purpose", async function () {
      const {myContract, bob} = await setup();

      // bob sets a new purpose
      await bob.myContract.setPurpose("Learn Solidity")
      // check the current purpose is the one that we just set
      expect(await myContract.purpose()).to.equal("Learn Solidity");
    });

    it("Should emit an event when set a new purpose", async function () {
      const {myContract, alice} = await setup();

      // alice sets a new purpose
      // we expet setPurpose() to emit an event "SetPurpose(address sender, string purpose);"
      // with arguments alice.address and "Learn HardHat"
      await expect(alice.myContract.setPurpose("Learn HardHat"))
        .to.emit(myContract, "SetPurpose")
        .withArgs(alice.address, "Learn HardHat");

      // check the current purpose is the one that we just set
      expect(await myContract.purpose()).to.equal("Learn HardHat");
    });

    it("Bob deposits 1 ETH", async () => {
      const {myContract, bob} = await setup();

      // deposit has "require(msg.value > 0, "cannot deposit 0");"
      // bob tries to call deposit with no value thus it should be reverted
      await expect(bob.myContract.deposit())
        .to.be.revertedWith('cannot deposit 0');

      // bob calls deposit with a value > 0; it should pass
      await bob.myContract.deposit({value: parseEther("1")})
      // check bob depositBalance was updated
      expect(await myContract.depositBalance(bob.address)).to.eq(parseEther("1"))
    });

    it("[Revert] Alice tries to widhdraw bob's 1 ETH", async () => {
      const {bob, alice} = await setup();

      // withdraw has "require(msg.sender == _user, "cannot withdraw others ETH");"
      // alice tries to withdraw using bob.address but the msg.sender is alice.address
      // it should revert
      await expect(alice.myContract.withdraw(bob.address, parseEther("1")))
        .to.be.revertedWith('cannot withdraw others ETH');
    });

    it("[Revert] Alice tries to widhdraw 1 ETH without having deposited", async () => {
      const {alice} = await setup();
      
      // withdraw has "require(deposited[msg.sender] >= _amount, "cannot withdraw more than you deposited");"
      // alice tries to withdraw 1 ETH but she hasn't deposited any, it should revert
      await expect(alice.myContract.withdraw(alice.address, parseEther("1")))
        .to.be.revertedWith('cannot withdraw more than you deposited');
    });

    it("Bob withdraws his 1 ETH", async () => {
      const {myContract, bob} = await setup();
      // bob calls deposit with a value > 0; it should pass
      await bob.myContract.deposit({value: parseEther("1")})
      // bob withdraws 1 ETH he deposited before and is calling withdraw() with his address
      // it should pass
      await bob.myContract.withdraw(bob.address, parseEther("1"))
      // verify the balance in the contract is now 0
      expect(await myContract.depositBalance(bob.address)).to.eq("0")
    });
  });
});
