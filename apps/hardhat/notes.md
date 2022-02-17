### How To Deploy To Tesnet/Live Networks

* `On hardhat.config.ts` in `namedAccounts` under the deployer, write the desired network name and the address that will be deploying.
```js
    deployer: {
        "mumbai": '0x0000000000591b1DA6B179D1dA1ee31AFAE473e5',
    },
```
* On `.ENV` add your `MORALIS_SPEEDYNODES_KEY`
```js
    MORALIS_SPEEDYNODES_KEY=<your_key>
```
* On `.ENV` add the deployer address privateKey
```js
    MUMBAI_DEPLOYER_KEY=<your_private_key>
```
* To deploy run: 
```
npx hardhat deploy --network <target_network>
or 
yarn hardhat deploy --network <target_network>
```
Note: If you try to deploy a second time without making any changes, the contracts won't be redeployed, to override this setting add the `--reset` flag

#### Verify using sourcefy and etherscan

To publish your contracts in sourcefy run:
```
    hardhat sourcify --network <target_network>
```
To publish your contracts in etherscan:
*  run:
```
    npx hardhat --network <target_network> etherscan-verify --api-key <target_network_API_KEY>
```
if there is problems with verify due to licenses names add: `--force-license --license UNLICENSED`