const { expect } = require("chai");
const { ethers } = require("hardhat");

const { parseEther, formatEther } = ethers.utils;

// Contracts
let myContract;
// Testing accounts
let deployer, bob, alice;

describe("MyContract", function () {
  before(async () => {
    [deployer, bob, alice] = await ethers.getSigners();
  });

  it("Should deploy MyContract", async function () {
    // load the contract by name
    const MyContractFactory = await ethers.getContractFactory("MyContract");
    // deploy de contract with contructor parameter ("Hello, world!")
    myContract = await MyContractFactory.deploy("Hello, world!");
    // wait for the deployment
    await myContract.deployed();
    // check the purpouse set in the contructor
    expect(await myContract.purpose()).to.equal("Hello, world!");
  });

  it("Should change the owner", async function () {
    // MyContract is Ownable
    // https://docs.openzeppelin.com/contracts/4.x/api/access#Ownable

    // check current owner
    expect(await myContract.owner()).to.equal(deployer.address);
    // transfer ownership to bob
    await myContract.transferOwnership(bob.address)
    // verify bob is the new owner
    expect(await myContract.owner()).to.equal(bob.address);
  });

  it("Should set a new purpose", async function () {
    // bob sets a new purpose
    await myContract.connect(bob).setPurpose("Learn Solidity")
    // check the current purpose is the one that we just set
    expect(await myContract.purpose()).to.equal("Learn Solidity");
  });

  it("Should emit an event when set a new purpose", async function () {
    // alice sets a new purpose
    // we expet setPurpose() to emit an event "SetPurpose(address sender, string purpose);"
    // with arguments alice.address and "Learn HardHat"
    await expect(myContract.connect(alice).setPurpose("Learn HardHat"))
      .to.emit(myContract, "SetPurpose")
      .withArgs(alice.address, "Learn HardHat");

    // check the current purpose is the one that we just set
    expect(await myContract.purpose()).to.equal("Learn HardHat");
  });

  it("Bob deposits 1 ETH", async () => {
    // deposit has "require(msg.value > 0, "cannot deposit 0");"
    // bob tries to call deposit with no value thus it should be reverted
    await expect(myContract.connect(bob).deposit())
      .to.be.revertedWith('cannot deposit 0');

    // bob calls deposit with a value > 0; it should pass
    await myContract.connect(bob).deposit({value: parseEther("1")})
    // check bob depositBalance was updated
    expect(await myContract.depositBalance(bob.address)).to.eq(parseEther("1"))
  });

  it("[Revert] Alice tries to widhdraw bob's 1 ETH", async () => {
    // withdraw has "require(msg.sender == _user, "cannot withdraw others ETH");"
    // alice tries to withdraw using bob.address but the msg.sender is alice.address
    // it should revert
    await expect(myContract.connect(alice).withdraw(bob.address, parseEther("1")))
      .to.be.revertedWith('cannot withdraw others ETH');
  });

  it("[Revert] Alice tries to widhdraw 1 ETH without having deposited", async () => {
    // withdraw has "require(deposited[msg.sender] >= _amount, "cannot withdraw more than you deposited");"
    // alice tries to withdraw 1 ETH but she hasn't deposited any, it should revert
    await expect(myContract.connect(alice).withdraw(alice.address, parseEther("1")))
      .to.be.revertedWith('cannot withdraw more than you deposited');
  });

  it("Bob withdraws his 1 ETH", async () => {
    // bob withdraws 1 ETH he deposited before and is calling withdraw() with his address
    // it should pass
    await myContract.connect(bob).withdraw(bob.address, parseEther("1"))
    // verify the balance in the contract is now 0
    expect(await myContract.depositBalance(bob.address)).to.eq("0")
  });
});
