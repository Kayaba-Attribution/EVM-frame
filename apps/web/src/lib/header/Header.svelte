<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	import { tweened } from 'svelte/motion';
	import { wallet, nativeBalance, nativeBalanceUSD, loginMetamask } from '$lib/eth';
	import { onMount } from 'svelte'
	import { themeChange } from 'theme-change'
	import { spotUSD } from '$lib/ethUtils';
	
	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(async () => {
		themeChange(false)
		// 👆 false parameter is required for svelte
	})




</script>

<div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
  <div class="flex-1 px-2 mx-2">
    <span class="text-lg font-bold">
		EVM-frame
          </span>
  </div> 
  <div class="flex-none  px-2  lg:flex">
    <div class="flex items-center">
	<!-- LOGIN BUTTON -->
      <div on:click={() => loginMetamask()} class="m-1 normal-case btn-ghost btn">
		{#if !$wallet}
			Connect a wallet
		{:else}
			<div data-tip={$nativeBalanceUSD} class="tooltip tooltip-bottom">
				<div class="badge mr-2">
					{$nativeBalance.toFixed(3)} ETH
				</div>
			</div>
			{$wallet.slice(0, 6)}...{$wallet.slice(-4)}
		{/if}  
      </div>

	  <!-- CHANGE THEME BUTTON -->
	
	  <div title="Change Theme" class="dropdown dropdown-end flex">
		<div tabindex="0" class="m-1 normal-case btn-ghost btn">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
				class="inline-block w-6 h-6 stroke-current md:mr-2">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01">
				</path>
			</svg>
			<span class="hidden md:inline">
				Change Theme
			</span>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"
				class="inline-block w-4 h-4 ml-1 fill-current">
				<path
					d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z">
				</path>
			</svg>
		</div>
		<div
			class="mt-16 overflow-y-auto shadow-2xl top-px dropdown-content h-96 w-52 rounded-b-box bg-base-200 text-base-content">
			<ul class="p-4 menu compact">
				<li><a tabindex="0" data-set-theme="light" data-act-class="active">🌝
						 light</a></li>
				<li><a tabindex="0" data-set-theme="dark" data-act-class="active">🌚
						 dark</a></li>
				<li><a tabindex="0" data-set-theme="cupcake" data-act-class="active">🧁
						 cupcake</a></li>
				<li><a tabindex="0" data-set-theme="bumblebee" data-act-class="active">🐝
						 bumblebee</a></li>
				<li><a tabindex="0" data-set-theme="emerald" data-act-class="active">✳️
						 Emerald</a></li>
				<li><a tabindex="0" data-set-theme="corporate" data-act-class="active">🏢
						 Corporate</a></li>
				<li><a tabindex="0" data-set-theme="synthwave" data-act-class="active">🌃
						 synthwave</a></li>
				<li><a tabindex="0" data-set-theme="retro" data-act-class="active">👴
						 retro</a></li>
				<li><a tabindex="0" data-set-theme="cyberpunk" data-act-class="active">🤖
						 cyberpunk</a></li>
				<li><a tabindex="0" data-set-theme="valentine" data-act-class="active">🌸
						 valentine</a></li>
				<li><a tabindex="0" data-set-theme="halloween" data-act-class="active">🎃
						 halloween</a></li>
				<li><a tabindex="0" data-set-theme="garden" data-act-class="active">🌷
						 garden</a></li>
				<li><a tabindex="0" data-set-theme="forest" data-act-class="active">🌲
						 forest</a></li>
				<li><a tabindex="0" data-set-theme="aqua" data-act-class="active">🐟
						 aqua</a></li>
				<li><a tabindex="0" data-set-theme="lofi" data-act-class="active">👓
						 lofi</a></li>
				<li><a tabindex="0" data-set-theme="pastel" data-act-class="active">🖍
						 pastel</a></li>
				<li><a tabindex="0" data-set-theme="fantasy" data-act-class="active">🧚‍♀️
						 fantasy</a></li>
				<li><a tabindex="0" data-set-theme="wireframe" data-act-class="active">📝
						 Wireframe</a></li>
				<li><a tabindex="0" data-set-theme="black" data-act-class="active">🏴
						 black</a></li>
				<li><a tabindex="0" data-set-theme="luxury" data-act-class="active">💎
						 luxury</a></li>
				<li><a tabindex="0" data-set-theme="dracula" data-act-class="active">🧛‍♂️
						 dracula</a></li>
				<li><a tabindex="0" data-set-theme="cmyk" data-act-class="active">🖨
						 CMYK</a></li>
			</ul>
		</div>
	  </div>
      

	  
    </div>
  </div> 
	<div title="Github ↗︎" class="items-center flex-none mr-2">
		<a aria-label="Github"
            target="_blank" href="https://github.com/Kayaba-Attribution/EVM-frame" rel="noopener"
			class="normal-case btn btn-ghost drawer-button btn-square">
			<svg
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
				class="inline-block w-6 h-6 fill-current">
				<path
					d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z">
				</path>
			</svg>
		</a>
	</div>
</div>
  

<style>
/* Add custom Styles here */
</style>
