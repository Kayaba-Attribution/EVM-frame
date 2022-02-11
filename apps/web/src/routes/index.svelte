<script context="module">
	export const prerender = true;
</script>

<script>
	import { onMount } from 'svelte'
	import { themeChange } from 'theme-change'

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false)
		// 👆 false parameter is required for svelte
	})
	import { loginMetamask, init, pickNetwork, wallet, chain } from "$lib/eth";
	import { spotUSD } from '$lib/ethUtils';




</script>

<svelte:head>
	<title>Home</title>
</svelte:head>



<h1>Welcome {$wallet} on chain {$chain}</h1>


<button on:click={async () => spotUSD("ETH")} class="btn btn-info">info</button> 

<label for="my-modal-2" class="btn btn-outline btn-xs md:btn-sm lg:btn-md xl:btn-md modal-button">open modal</label> 
<input type="checkbox" id="my-modal-2" class="modal-toggle"> 
<div class="modal">
	<div class="modal-box">
	<p>Please Connect Your Wallet</p> 
	<div class="modal-action">
		<label for="my-modal-2" class="btn btn-circle">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">   
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>                       
		</svg>
		</label> 
	</div>
	</div>
</div>

<div tabindex="0" class="collapse w-96 border rounded-box border-base-300 collapse-arrow"> 
	<div class="collapse-title text-xl font-medium">
	  I open with focus
	</div> 
	<div class="collapse-content"> 
	  <p>Collapse content reveals with focus. If you add a checkbox, you can control it using checkbox instead of focus. Or you can force-open/force-close using 
		<span class="badge badge-outline">collapse-open</span> and 
		<span class="badge badge-outline">collapse-close</span> classes.
	  </p>
	</div>
  </div> 
  <div tabindex="0" class="collapse w-96 border rounded-box border-base-300 collapse-arrow"> 
	<div class="collapse-title text-xl font-medium">
	  I open with focus
	</div> 
	<div class="collapse-content"> 
	  <p>Collapse content reveals with focus. If you add a checkbox, you can control it using checkbox instead of focus. Or you can force-open/force-close using 
		<span class="badge badge-outline">collapse-open</span> and 
		<span class="badge badge-outline">collapse-close</span> classes.
	  </p>
	</div>
  </div> 
  <div tabindex="0" class="collapse w-96 border rounded-box border-base-300 collapse-arrow"> 
	<div class="collapse-title text-xl font-medium">
	  I open with focus
	</div> 
	<div class="collapse-content"> 
	  <p>Collapse content reveals with focus. If you add a checkbox, you can control it using checkbox instead of focus. Or you can force-open/force-close using 
		<span class="badge badge-outline">collapse-open</span> and 
		<span class="badge badge-outline">collapse-close</span> classes.
	  </p>
	</div>
  </div>

  
  




<style>
</style>
