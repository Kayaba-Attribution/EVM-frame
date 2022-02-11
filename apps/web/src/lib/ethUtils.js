import { wallet, nativeBalance, chain } from "$lib/eth";
import { writable } from "svelte/store";

export async function spotUSD(_symbol){
    let response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol='+_symbol +'USDT');
    response = await response.json();
    let price = Number(response.price).toFixed(2)
    console.log(`💲 ${_symbol} to USD: ${price} USD 💲`)
    return price
}

export async function updateNativeBalanceUSD(_balance){
    let res = _balance
}

