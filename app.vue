<script lang="ts" setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
</script>

<template>
  <div class="">
    <ul class="fixed right-0 top-0 fw-700 z-100 text-yellow">
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
