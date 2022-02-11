<script context="module">
	export const prerender = true;
</script>

<script>

	import { loginMetamask, init, pickNetwork, wallet, chain } from "$lib/eth";
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<!-- <p>Wallet: {$wallet}</p>
	<p>wrongNetwork: {$wrongNetwork}</p> -->
</section>

<section>
	<h1>Welcome {$wallet} on chain {$chain}</h1>
	<button on:click={() => loginMetamask()} class="btn btn-outline btn-accent">Connect</button>

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


	
</section>


<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
