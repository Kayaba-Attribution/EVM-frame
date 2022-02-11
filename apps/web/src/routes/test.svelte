<script context="module">
	export const prerender = true;
</script>

<script>

	import { loginMetamask, init, pickNetwork, wallet, chain } from "$lib/eth";
	function login(){
		console.log("hit")
		window.ethereum.enable();
		init()
	}

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
	<button on:click={() => login()} class="btn btn-outline btn-accent">Connect</button>
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
