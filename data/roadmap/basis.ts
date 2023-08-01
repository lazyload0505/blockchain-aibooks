const MARKED = '**==Import==** ';

import { BASIS_BLOCKCHAIN_MAP_DATA } from "./sub/basisBlockchain";

export const BASIS_MAP_DATA = `---
markmap:
  colorFreezeLevel: 1
---

${BASIS_BLOCKCHAIN_MAP_DATA}


`;

const sample = `
- That is so funny?
- ${MARKED}[GitHub](https://github.com/gera2ld/markmap)
- {} easy
  1.  [Test](/docs/blockchain/crosschain.html)
  2. Second item
  ![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrCjUnqWJWgjegEogl8XF2zadj4HfnxP5Op0ZxaebsIg&s?width=90)
Third item`;