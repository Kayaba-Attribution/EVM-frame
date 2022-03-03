<script>
    import { wallet, chain, contracts, metamaskReady, projects, loginMetamask } from "$lib/eth";
    import { onMount } from "svelte";
    onMount(async () => {
        await $metamaskReady;
    })

    const ethRegex = new RegExp('^0x[a-fA-F0-9]{40}$')
    let name = ""
    let symbol = ""
    let supply = 0
    let owner = ""


  </script>

<div class="mt-20">

    <div class="form-control w-full max-w-xs space-y-2">
        <div class="text-lg font-semibold px-2">Name*</div>
        <input type="text" bind:value={name} placeholder="Type here" class="input input-bordered w-full max-w-xs {name == '' || name.length < 3 ? 'input-warning':'input-success'}">

        <div class="text-lg font-semibold px-2">Symbol*</div>
        <input type="text" bind:value={symbol} placeholder="Type here" class="input input-bordered w-full max-w-xs {symbol == '' || symbol.length < 1 ? 'input-warning':'input-success'}">

        <div class="text-lg font-semibold px-2">Supply*</div>
        <input type="number" bind:value={supply} placeholder="Type here" class="input input-bordered w-full max-w-xs {supply == 0 || supply < 100 ? 'input-warning':'input-success'}">

        <div class="text-lg font-semibold px-2">Owner*</div>
        <input type="text" bind:value={owner} placeholder="Type here" class="input input-bordered w-full max-w-xs {owner == '' || !ethRegex.test(owner) ? 'input-warning':'input-success'}">

    </div>
    <p>{name} || {symbol} || {owner}</p>

    <div class="flex flex-col w-full lg:flex-row my-12">
        <div class="grid flex-grow md:my-10 md:w-80 card rounded-box place-items-left md:mr-3">
            <div class="text-5xl md:text-8xl font-extrabold text-center md:text-left py-3"> EVMOS Token 
                <div class="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-blue-600">
                    Generator
                </div>
            </div>
            <div class="py-4 text-2xl font-bold text-center md:text-left"> The easy, no-code, and convenient way to create your own ERC20 in EVMOS</div>
            <div class="flex justify-center md:justify-start py-2">
                <button class="btn btn-primary">
                    <a href="/app">
                    Create a Token!
                    </a>
            </button>
            </div>
        </div> 
        <div class="grid flex-grow md:w-1/3 card rounded-box place-items-center">
            <img src="./test.gif" alt="Shoes">
        </div>
    </div>
</div>



