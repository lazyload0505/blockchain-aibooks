---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc

hero:
  name: "Blockchain AI Book"
  text: "All-in-One Learning Resource for Blockchain&Crypto"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Examples
      link: /examples/markdown-examples
    - theme: alt
      text: Wiki Words
      link: /wikiwords/
    - theme: alt
      text: Back to main
      link: backtomain

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit

lastUpdated: true
---
<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/35673637?v=4',
    name: 'Tim Wang',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/lazyload0505' },
      { icon: 'twitter', link: 'https://twitter.com/timwang0505' }
    ]
  }
]
</script>
# Smart Blockchain Playbook
All-in-One Learning Resource for Blockchain&Crypto

### Owner
<VPTeamMembers size="small" :members="members" />