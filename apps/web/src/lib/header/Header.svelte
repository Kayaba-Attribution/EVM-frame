<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	import { wallet, nativeBalance } from '$lib/eth';

</script>

<div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
	<div class="px-2 mx-2 navbar-start">
	  <span class="text-lg font-bold">
			  EVM-frame
	  </span>
	</div> 
	<div class="hidden px-2 mx-2 navbar-center lg:flex">
	  <div class="flex items-stretch">
		<a href="/" class="btn btn-ghost btn-sm rounded-btn">
				Home
			  </a> 
		<a class="btn btn-ghost btn-sm rounded-btn">
				Portfolio
			  </a> 
		<a class="btn btn-ghost btn-sm rounded-btn">
				About
			  </a> 
		<a class="btn btn-ghost btn-sm rounded-btn">
				Contact
			  </a>
	  </div>
	</div> 
	<div class="navbar-end">
      <button class="btn btn-outline btn-xs md:btn-sm lg:btn-md xl:btn-md">
		{#if !$wallet}
			Connect a wallet
		{:else}
			<div class="badge mr-2">
				{$nativeBalance.toFixed(3)} ETH
			</div>
			{$wallet.slice(0, 6)}...{$wallet.slice(-4)}
		{/if}  
	  </button> 
	  <button class="btn btn-square btn-ghost">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">     
		  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>                     
		</svg>
	  </button> 
	  <button class="btn btn-square btn-ghost">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">             
		  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>             
		</svg>
	  </button>
	</div>


  </div>
  

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--accent-color);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
