const MARKED = '**==Import==** ';

import { BASIS_BLOCKCHAIN_MAP_DATA } from './sub/basisBlockchain';
import { ETHEREUM_MAP_DATA } from './sub/ethereum'
 
export const APP_DEV_MAP_DATA = `---
markmap:
  colorFreezeLevel: 1
---

  # App Developer
  
  ${ BASIS_BLOCKCHAIN_MAP_DATA }
  
  ${ ETHEREUM_MAP_DATA }

  ## Intermediate Dev(EVM-Based)

  ### Language
  - Solidity
  - Vyper
  ### IDEs 
  - Remix
  - VS Code

  ### Interaction with Web
  #### Web3.js
  #### Ethers.js
  #### Moralis

  ### Framework & Tools
  #### Openzeppelin
  #### Hardhat
  #### Foundry
  #### Truffle

  ## Advanced Dev(EVM-Based)

  ### Security
  #### Practies
  - 
  #### Tools
  - Slither
  - Manticore

  ### Oracle
  #### Chainlink
  #### Storage
  ##### IPFS
  ##### SWARM

  ## Experience Dev
  ### Mobile
  ### Web

`;