<script lang="ts" setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
</script>

<template>
  <div class="">
    <ul>
      <li>
        <NuxtLink to="/macbook">Macbook</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/more-canvases">Canvases</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/more-canvases"
          >TODO: One canvas, multiple scenes</NuxtLink
        >
      </li>
    </ul>
    <NuxtPage />
  </div>
</template>
