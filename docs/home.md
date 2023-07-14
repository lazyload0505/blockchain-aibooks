---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
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