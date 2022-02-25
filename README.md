<p align="center">
  <h1 align="center">🏗️⚡ EVM-front, Build Complete Dapps FAST ⚡🏗️</h1>
  <h1 align="center">🏗️⚡ gnosis-dao-dashboard ⚡🏗️</h1>
  <h3 align="center">This is a forkable EVM dev stack built on top of Svelte with a focus on quick product iterations, clarity, and size/speed optimization.  
</h3>
</p>

## gnosis-dao-dashboard branch info:

This branch provides an easy to deploy dashboard app for DAOs that want to showcase their stats, some of the features are:
+ Current Value of Assets (USD)
+ Txns Data
  + All incoming ETH
  + All ERC-20
  + All ERC-721
  + Total ETH recieved
  + Total ERC-20s recieved
  + Total ERC-721s recieved
+ Safe Holdings
  + Asset name
  + Picture
  + Balance
  + USD Value
+ Contribution Leaderboards
  + Showcase the top n contributions
  + A leaderboard for ETH, ERC20 and ERC721
+ 10+ UI themes
  + Hot swap with button on navbar
+ Metamask Wallet Connection
  + TODO: create donation section to allow users to send to safe
  + TODO: Parse all addresses on the data to get the ENS name

## Easy Setup

go to `apps/web/src/lib/setup.json`

Fill in the data with your needs

```
{
    "name": "PadawanDAO",
    "symbol": "PDAO",
    "logo": "padawan.png",
    "mission": "We're here to fund the next Padawan's into crypto conferences.",
    "info": "Under 25, interested in crypto and want to attend blockchain conferences? We're here to help 💸🤟",
    "GnosisSafeAddress": "0x6032DEd1D330d0672253BDfC9a56C971DeE0683F",
    "showTopN": 10,
    "discord": "https://discord.com/invite/HM97NeDJ5P",
    "twitter": "https://twitter.com/PadawanDAO"
}
```
Under `web/static` add your logo img

## What's inside?

This is a [Turborepo](https://turborepo.org/) with parallel execution, that contains a [Svelte-kit](https://kit.svelte.dev/) app and [daisyui](https://daisyui.com/) for front-end, and [HardHat](https://hardhat.org/) for contract testing and development.

+ Svelte unlike React or Vue that do the bulk work on the browser, compiles your app on build.
+ Svelte $reactivity triggers efficient, granular updates by assigning to local variables.  
+ HardHat is the prefered development enviroment in the ecosysyem

### Apps

- `web`: Svelte-kit website
- `hardhat`: contract testing and development framework

## Installation

Clone this repo:

```
git clone https://github.com/Kayaba-Attribution/EVM-frame.git
```

Add packages with yarn

```
yarn install
```
Start front-end:

```
yarn dev
```
# Contributing info


Pull requests are welcome!

# License

[MIT](https://choosealicense.com/licenses/mit/)

 <img align="center" src="https://repobeats.axiom.co/api/embed/7c2a64ade689c04cda1db4d96e99f6e308580e2b.svg" alt="Repobeats analytics image" />
