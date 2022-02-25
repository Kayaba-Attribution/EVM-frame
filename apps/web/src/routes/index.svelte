<script context="module">
	export const prerender = true;
</script>

<script>
	// Build by Kayaba-Attribution
	import { wallet, chain, contracts, metamaskReady, loginMetamask, wrongNetwork, pickNetwork } from "$lib/eth";
	import { spotUSD, formatDate, txStats } from '$lib/ethUtils';
	import Typewriter from 'svelte-typewriter'
	import { onMount } from "svelte";
	import { formatEther, parseEther } from '@ethersproject/units';

	import setup from "../lib/setup.json"


	let tokenBalancesUSD = [];
	let totalUSD = 0;
	let dateNow = new Date()
	dateNow = dateNow.toLocaleDateString(undefined, {day: '2-digit', month: 'short' })

	function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
	}	

	const safeAddress = "0x6032DEd1D330d0672253BDfC9a56C971DeE0683F"

	onMount(async () => {
		// if in a future there exist contract interactions
		//await $metamaskReady;

		//TODO: ENS Support
		// https://safe-transaction.gnosis.io/api/v1/safes/0x6032DEd1D330d0672253BDfC9a56C971DeE0683F/all-transactions/
		// Refer to the API: https://safe-transaction.gnosis.io/
		//const safeAddress = "0xA063Cb7CFd8E57c30c788A0572CBbf2129ae56B6"
 
		await fetch(`https://safe-transaction.gnosis.io/api/v1/safes/${setup.GnosisSafeAddress}/balances/usd/?trusted=false&exclude_spam=false`)
			.then(res => res.json())
			.then(data => tokenBalancesUSD = data)
			.then(() => {
				console.log(tokenBalancesUSD)
				tokenBalancesUSD.forEach(e => {
					totalUSD += Number(e.fiatBalance);
				})
				totalUSD = kFormatter(totalUSD.toFixed(3))
			})
			.catch((error) => {
  			console.error('Error:', error);
		});
	});

	let promise = test();

	let txns = {};

	async function test(){
		await fetch(`https://safe-transaction.gnosis.io/api/v1/safes/${setup.GnosisSafeAddress}/incoming-transfers/`)
			.then(res => res.json())
			.then(async data => txns = await txStats(data))
			.then(() => {
				console.log(txns)
			})
			.catch((error) => {
  			console.error('Error:', error);
			});
		return txns;
	}

</script>

<svelte:head>
	<title>{setup.name}</title>
</svelte:head>
{#if $wallet && $wrongNetwork}
	<button on:click={() => pickNetwork()} class="bg-blue-500 btn hover:bg-blue-700 text-white font-bold py-2 px-1 rounded-full">
		Change Network To ETH mainnet
	</button>
{/if}

<div class="flex flex-col w-full border-opacity-50">

	<div class="grid px-12 py-5 md:py-16 card rounded-box place-items-center">
		<div class="text-4xl md:text-6xl font-bold text-center mb-3">{setup.name}</div>
		<h4 class="text-center">
			<Typewriter>
				{setup.mission}
			</Typewriter>
		</h4>
	</div>

	<h4 class="text-center text-lg font-md px-4">
		{setup.info}
	</h4>
	<div class="flex items-center justify-center p-5">
		<button class="btn btn-outline btn-info">
			<a href={setup.discord}>
				Join Discord
			</a>
		</button>
	</div>

	<div class="divider"></div>
	
	<div class="shadow stats">
  
		<div class="stat">
		  <div class="stat-title">Value Funds in Safe</div>
		  <div class="stat-value">{totalUSD} USD</div>
		  <div class="stat-desc">Updated {dateNow}</div>
		</div>

		  
		<div class="stat">
			<div class="stat-title">Total ETH received</div>
			<div class="stat-value">{Number(txns.totalETH).toFixed(2)} ETH</div>
			<div class="stat-desc">Updated {dateNow}</div>
		</div>

		<div class="stat">
			<div class="stat-title">Total ERC20's received</div>
			<div class="stat-value">{kFormatter(Number(txns.totalERC).toFixed(2))} Tokens</div>
			<div class="stat-desc">Updated {dateNow}</div>
		</div>
				
	</div>

	<div class="flex items-center justify-center p-5">
		<button class="btn btn-outline btn-success">
			<a href="https://gnosis-safe.io/app/#/safes/{setup.GnosisSafeAddress}/">
				Gnosis Multisig
			</a>
		</button>
	</div>

	  <div class="overflow-x-auto w-full my-4">
		<table class="table w-full table-normal">
		  <!-- head -->
		  <thead>
			<tr>
			  <th>#</th>
			  <th>Asset</th>
			  <th>Balance</th>
			  <th>USD Value</th>
			</tr>
		  </thead>
		  <tbody>
			{#each tokenBalancesUSD as asset, i}
				<!-- content here -->
				
				<!-- row 1 -->
				<tr>
					<th>{i+1}</th>
				<td>
					<div class="flex items-center space-x-3">
					<div class="avatar">
						<div class="w-12 h-12 mask mask-squircle">
						<img src={asset.tokenAddress == null ? './Ethlogo.png' : asset.token.logoUri} alt="{asset.token?.name} Logo">
						</div>
					</div>
					<div>
						<div class="font-bold">{asset.tokenAddress == null ? 'ETH' : asset.token.name}</div>
						<div class="text-sm opacity-50">{asset.tokenAddress == null ? 'Native' : 'ERC-20'}</div>
					</div>
					</div>
				</td>
				<td>
					{asset.tokenAddress == null ? Number(formatEther(asset.balance)).toFixed(3) : Number(asset.balance/10**asset.token.decimals).toFixed(3)} {asset.tokenAddress == null ? 'ETH' : asset.token.symbol}
					<br>
					<!-- <span class="badge badge-ghost badge-sm"><a href="https://etherscan.io/address/{asset.tokenAddress == null ? '' : asset.tokenAddress}">
						{asset.tokenAddress == null ? 'Native' : 'Txn Hash'}
					</a></span> -->
				</td>
				<td>{Number(asset.fiatBalance).toFixed(2)} USD</td>
				</tr>
			{/each}

		  </tbody>

		  
		</table>
	  </div>
</div>


<div class="grid px-12 pt-6 pb-2 card  rounded-box place-items-center">
	<h1 class="text-4xl font-bold text-center mb-3">Contribution Leaderboards</h1>
	<p class="text-xl text-center">Explore the top ETH, ERC-20, and NFTs contributors</p>
</div>


{#await promise}
	<p>...waiting</p>
{:then res}
	<!-- ETH TABLE  -->
	<div class="overflow-x-auto">
		<div class="grid  card p-3 rounded-box place-items-center">
			<div class="badge badge-primary badge-lg m-2">ETH LEADERBOARD</div>
			<p class="text-md text-center">Total Txns: {res.ethTxns.length}</p>
		</div>
		<table class="table table-compact w-full">
		  <thead>
			<tr>
			  <th></th> 
			  <th>From</th> 
			  <th>Value</th> 
			  <th>Txn</th> 
			</tr>
		  </thead> 
		  <tbody>
			  {#each res.ethTxns as txn, i}
			  		{#if i < setup.showTopN}
						<!-- content here -->
						<tr>
							<th>{i+1}</th> 
							<td>{txn.from.slice(0,4)}...{txn.from.slice(0,4)}</td> 
							<td>{Number(txn.value).toFixed(3)}</td> 
							<td>
								<a href={txn.link}>
									<div class="badge badge-outline">Txn Hash</div>
								</a>
							</td> 
						 </tr>	
					{/if}
				   <!-- content here -->

			  {/each}
		  </tbody> 
		</table>
	  </div>

	<!-- ERC TABLE  -->
	<div class="grid  card p-3 rounded-box place-items-center">
		<div class="badge badge-primary badge-lg m-2">ERC LEADERBOARD</div>
		<p class="text-md text-center">Total Txns: {res.ercTxns.length}</p>
	</div>
	<div class="overflow-x-auto">
		<table class="table table-compact w-full">
		  <thead>
			<tr>
			  <th></th> 
			  <th>From</th> 
			  <th>Quantity</th> 
			  <th>Symbol</th> 
			  <th>Txn</th> 
			</tr>
		  </thead> 
		  <tbody>
			  {#each res.ercTxns as txn, i}
			  		{#if i < setup.showTopN}
						<!-- content here -->
						<tr>
							<th>{i+1}</th> 
							<td>{txn.from.slice(0,4)}...{txn.from.slice(0,4)}</td> 
							<td>{Number(txn.quantity).toFixed(2)}</td> 
							<td>{txn.symbol}</td> 
							<td>
								<a href={txn.link}>
									<div class="badge badge-outline">Txn Hash</div>
								</a>
							</td> 
						 </tr>	
					{/if}
				   <!-- content here -->

			  {/each}
		  </tbody> 
		</table>
	  </div>

	<!-- NFTs TABLE  -->
	<div class="grid  card p-3 rounded-box place-items-center">
		<div class="badge badge-primary badge-lg m-2">NFTs LEADERBOARD</div>
		<p class="text-md text-center">Total Txns: {res.nftsTxns.length}</p>
	</div>
	<div class="overflow-x-auto mb-10">
		<table class="table table-compact w-full">
		  <thead>
			<tr>
			  <th></th> 
			  <th>From</th> 
			  <th>Contract</th> 
			  <th>Id</th> 
			  <th>Txn</th> 
			</tr>
		  </thead> 
		  <tbody>
			  {#each res.nftsTxns as txn, i}
			  		{#if i < setup.showTopN}
						<!-- content here -->
						<tr>
							<th>{i+1}</th> 
							<td>{txn.from.slice(0,4)}...{txn.from.slice(0,4)}</td> 
							<td>{txn.name}</td> 
							<td>{txn.id}</td> 
							<td>
								<a href={txn.link}>
									<div class="badge badge-outline">Txn Hash</div>
								</a>
							</td> 
						 </tr>	
					{/if}
				   <!-- content here -->

			  {/each}
		  </tbody> 
		</table>
	  </div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<!--  Build by Kayaba-Attribution -->