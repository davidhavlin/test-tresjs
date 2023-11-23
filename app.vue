<script lang="ts" setup>
import { gsap } from 'gsap'
import Macbook from './components/Macbook.vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Color } from 'three'
import { vLightHelper } from '@tresjs/cientos'

gsap.registerPlugin(ScrollTrigger)

const container = ref<HTMLElement | null>(null)
let tl: gsap.core.Timeline | null = null
const macbook = ref<InstanceType<typeof Macbook> | null>(null)
const title = ref<HTMLElement | null>(null)

const createAnimation = () => {
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: container.value,
      pin: true,
      scrub: 1,
      start: 'top top',
      end: '+=8000'
    }
  })
}

const onMacbookMount = () => {
  const { animateMacbook } = macbook.value!

  tl?.add(animateMacbook(), '0')
}

onMounted(createAnimation)
</script>

<template>
  <div ref="container" class="container">
    <h1 ref="title" class="title">
      The next phase of our cooperation was a detailed processing of all desktop
      screens
    </h1>
    <TresCanvas window-size preset="realistic" alpha class="canvas">
      <TresPerspectiveCamera :position="[0, 0, 30]" :fov="35" />
      <TresAmbientLight :intensity="1" />
      <!-- <TresPointLight
        :position="[8, 0, 17]"
        :intensity="3"
        :color="new Color('#2196f2')"
      /> -->
      <TresDirectionalLight
        ref="lightRef"
        :position="[0, -5, 30]"
        :intensity="1"
        v-light-helper
      />
      <!-- :look-at="[10, 0, 0]" -->
      <!-- :look-at="akuAkuRef" -->
      <OrbitControls :enable-zoom="true" />

      <Suspense>
        <Macbook ref="macbook" @vue:mounted="onMacbookMount" />
      </Suspense>
    </TresCanvas>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 200vh;
  display: flex;
  justify-content: center;
  background-color: #2196f2;
  color: white;
}
.canvas {
  position: fixed;
  top: 0;
  left: 0;
  /* width: 100%;
  height: 100vh; */
}

.title {
  margin-top: 200px;
  text-align: center;
  font-size: 60px;
  max-width: 800px;
}
</style>
