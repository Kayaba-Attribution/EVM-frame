import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { formatEther } from '@ethersproject/units';

import { writable } from "svelte/store";

export const wallet = writable()
export const wrongNetwork = writable(true)
export const chain = writable('none')
export const nativeBalance = writable(0)

let provider;
const CHAIN_ID = 31337;

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
  const _wallet = await _signer.getAddress();
  wallet.set(_wallet);

  const _networkDetails = await provider.getNetwork();
  chain.set(_networkDetails.chainId)

  nativeBalance.set(Number(formatEther(await _signer.provider.getBalance(_wallet))));
  
  if (_networkDetails.chainId !== CHAIN_ID) {
    wrongNetwork.set(true);
    return;
  } else {
    wrongNetwork.set(false);
  }

}

export async function pickNetwork(chainHexa) {
  await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: chainHexa }] });
}
