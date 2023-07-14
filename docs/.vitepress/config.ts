import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Blockchain AI Book",
  description: "All-in-One Learning Resource for Blockchain&Crypto",
  base: "/docs/",
  outDir: "../public/docs",
  lastUpdated: true,
  themeConfig: {

    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Docs Home", link: "/" },
      { text: "Blockchain", link: "/blockchain/blockchain" },
      { text: "Wiki Words", link: "/wiki-words/index" },
      { text: "Back to", link: "backtomain" },
    ],

    sidebar: {
      "/": [
        {
          text: "Basic Blockchain",
          items: [
            { text: "What is blockchain", link: "/blockchain/blockchain" },
            { text: "Cryptography", link: "/blockchain/cryptography" },
            { text: "Mining", link: "/blockchain/mining" },
            { text: "Decentralization", link: "/blockchain/decentralization" },
            {
              text: "Cryptocurrencies",
              collapsed: true,
              items: [
                {
                  text: "Cryptocurrencies",
                  link: "/blockchain/cryptocurrencies",
                },
                { text: "DeFi", link: "/blockchain/DeFi" },
                { text: "Wallet", link: "/blockchain/wallet" },
              ],
            },
          ],
        },
        {
          text: "Advanced Blockchain",
          items: [
            { text: "Smart Contract", link: "/blockchain/smartcontract" },
            { text: "Cross Chain", link: "/blockchain/crosschain" },
            { text: "Fork", link: "/blockchain/fork" },
            { text: "Cousensns", link: "/blockchain/cousensns" },
            { text: "Oracles", link: "/blockchain/oracles" },
          ],
        },
        {
          text: "Chains",
          items: [
            { text: "Ethereum", link: "/blockchain/chains/ethereum" },
            { text: "Polygon", link: "/blockchain/chains/polygon" },
            { text: "Solana", link: "/blockchain/chains/solana" },
            {
              text: "L2",
              collapsed: true,
              items: [
                { text: "What is L2", link: "/blockchain/chains/l2" },
                { text: "Arbitrum", link: "/blockchain/chains/arbitrum" },
              ],
            },
          ],
        },
        {
          text: "Smart Contract",
          items: [
            { text: "EIP", link: "/blockchain/smartcontract/eip" },
            { text: "ERC", link: "/blockchain/smartcontract/erc" },
            {
              text: "Programming Language",
              collapsed: true,
              link: "/blockchain/smartcontract/erc",
              items: [
                { text: "Solidity", link: "/blockchain/chains/l2" },
                { text: "Rust", link: "/blockchain/chains/arbitrum" },
                { text: "Move", link: "/blockchain/chains/arbitrum" },
              ],
            },
          ],
        },
      ],
      "/wiki-words/": [
        {
          text: "Wiki Words",
          items: [
            { text: "Index", link: "/wiki-words/" },
            { text: "A", link: "/wiki-words/wiki-a" },
            { text: "B", link: "/wiki-words/wiki-b" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
