import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { formatEther } from '@ethersproject/units';
import { spotUSD, spotMTR } from '$lib/ethUtils';

import { writable } from "svelte/store";

//import deployments from "./deployments.json"

export const contracts = {};
export const wallet = writable()
export const wrongNetwork = writable(true)
export const chain = writable('none')
export const nativeBalance = writable(0)
export const nativeBalanceUSD = writable(0)
export const signer = writable();
export const projects = writable([]);
export const balances = writable([])


let provider;
const CHAIN_ID = 31337;

let _metamaskReady = () => {};

export const metamaskReady = writable(new Promise((resolve) => {
  _metamaskReady = resolve;
}));

export function loginMetamask() {
  window.ethereum.enable()
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
  init();
}


export async function init() {
  if (!provider) {

    provider = new Web3Provider(window.ethereum, "any");

    provider.on("network", (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        setTimeout(() => {
          console.log("NETWORK CHANGE")
          init();
        }, 0);
      }
    });

    window.ethereum.on("accountsChanged", () => {
      setTimeout(() => {
        init();
      }, 5);
    });
  }

  const _signer = await provider.getSigner();
  signer.set(_signer);
  const _wallet = await _signer.getAddress();
  wallet.set(_wallet);

  const _networkDetails = await provider.getNetwork();
  chain.set(_networkDetails.chainId)

  const _nativeBalance = Number(formatEther(await _signer.provider.getBalance(_wallet))) 
  nativeBalance.set(_nativeBalance);
  nativeBalanceUSD.set((_nativeBalance * (await spotUSD("ETH"))).toFixed(2) + ' USD')
  //nativeBalanceUSD.set((_nativeBalance * (await spotMTR())).toFixed(2) + ' USD')
  console.log()
  if (_networkDetails.chainId !== CHAIN_ID) {
    wrongNetwork.set(true);
    return;
  } else {
    wrongNetwork.set(false);
  }
  // TODO: set an pop up alert and pickNetwork Functions

  //* INITIALIZE Contracts
  // //const cleanJSON = JSON.stringify(deployments)
  // const bountyInfo = deployments.contracts.Bounty
  // console.log(bountyInfo.address)
  // console.log(bountyInfo.abi)
  // contracts.bounty = new Contract(bountyInfo.address, bountyInfo.abi, _signer);
  // console.log(contracts)

  // // loads projects
  // let totalProjects = await contracts.bounty.totalProjects()

  // const _promises = [];
  // // some wierd shit going on here dont ask haha
  // for (let i = 0; i < totalProjects; i++) {
  //   _promises.push(contracts.bounty.getProject(i));
  // }

  // let _projects = await Promise.all(_promises);
  // let result = []
  // console.log("results promises:",_projects)
  // _projects.forEach(e => result.push(parseProjectInfo(e)))
  // projects.set(result);


  // Whe using onMount wait for the web3 connection before using contracts
  _metamaskReady()
}

export async function pickNetwork(chainHexa) {
  await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: chainHexa }] });
}
