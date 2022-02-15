/*
  Automatic Contract Front-End MVP

  + import artifacts from hardhat/contracts
  + each folder a.sol have a.dgb.json and a.json
  + import all .json

  contracts.a = new Contract(ADDRESS.a, abiMuseum, _signer);

  + from each JSON do:
  take contractName
  filter ABI object to get this:

  type: function

  then we have cases:

  ONLY READ no input
    owner()
    inputs:[]
    "stateMutability": "view",
    contract.a.owner()
  
  ONLY READ input
    deposited
    inputs:[address]
    "stateMutability": "view",
    contract.a.owner()

  Payable
*/
import { Contract } from "@ethersproject/contracts";
import { signer } from "./eth";
import test from "../../../hardhat/artifacts/contracts/MyContract.sol/MyContract.json";
export const contracts = {};
import util from "node:util"

console.log(test.contractName)

const result = test.abi.filter(e => e.type === "function")
result.forEach(e => {
    console.log(`
  Name:
    ${e.name}
    ${e.stateMutability}
    ${e.type}
  Inputs:
    ${util.inspect(e.inputs)}
  Outputs:
    ${util.inspect(e.outputs)}
    `)
});
console.log(result.length, "functions on", test.contractName)

