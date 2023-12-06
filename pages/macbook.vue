<script lang="ts" setup>
import { gsap } from 'gsap'
import Macbook from '@/components/Macbook.vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Color, DirectionalLight, Mesh } from 'three'
import { vLightHelper } from '@tresjs/cientos'

const container = ref<HTMLElement | null>(null)
let tl: gsap.core.Timeline | null = null
const macbook = ref<InstanceType<typeof Macbook> | null>(null)
const title = ref<HTMLElement | null>(null)
const lightRef = ref<DirectionalLight | null>(null)
const planeRef = ref<Mesh | null>(null)
const boxRef = ref<Mesh | null>(null)

const { onLoop, resume } = useRenderLoop()

// onLoop(({ delta, elapsed, clock, dt }) => {
//   // lightRef.value?.lookAt(boxRef.value.position)
//   // lightRef.value?.updateMatrix()
//   // lightRef.value?.updateMatrixWorld()
// })

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
  tl?.to(title.value, { opacity: 0 }, '<+=0.1')
}

onMounted(createAnimation)
</script>

<template>
  <div ref="container" class="container">
    <h1 ref="title" class="title">
      The next phase of our cooperation was a detailed processing of all desktop
      screens
    </h1>
    <!-- <TresCanvas preset="realistic" window-size alpha class="canvas"> -->
    <TresCanvas
      window-size
      alpha
      shadows
      :use-legacy-lights="false"
      class="canvas"
    >
      <TresPerspectiveCamera :position="[0, 0, 30]" :fov="35" />
      <!-- <TresPerspectiveCamera :position="[0, 0, 70]" :fov="35" /> -->
      <!-- <TresAmbientLight :intensity="3" /> -->
      <!-- <TresPointLight
        :position="[10, 5, 20]"
        far
        :intensity="130"
        cast-shadow
        :color="new Color('red')"
        v-light-helper
      /> -->
      <!-- :color="new Color('#f0f0f0')" -->
      <!-- <TresDirectionalLight
        ref="lightRef"
        cast-shadow
        :position="[0, 5, 30]"
        update-matrix
        :intensity="1"
      /> -->
      <!-- <TresDirectionalLightHelper
        v-if="lightRef"
        ref="directionalLightHelperRef"
        :args="[lightRef, 5]"
        visible
        :color="new Color('red')"
      /> -->
      <!-- :look-at="planeRef" -->
      <!-- <TransformControls :object="lightRef" mode="rotate" /> -->
      <!-- <OrbitControls make-default :enable-zoom="false" /> -->

      <Suspense>
        <Macbook ref="macbook" @vue:mounted="onMacbookMount" />
      </Suspense>

      <Environment preset="city" />

      <!-- <TresMesh ref="boxRef" cast-shadow receive-shadow :position="[8, -4, 10]">
        <TresBoxGeometry :args="[4, 4, 4]" />
        <TresMeshStandardMaterial :color="new Color('grey')" />
      </TresMesh> -->
      <ContactShadows
        :opacity="0.6"
        :blur="1.2"
        :far="5"
        :position="[0, 0, 0]"
      />

      <!-- <TresMesh ref="planeRef" receive-shadow :position="[0, -10, 10]">
        <TresPlaneGeometry :args="[30, 30, 30]" :rotate-x="-Math.PI / 2" />
        <TresMeshStandardMaterial :color="new Color('grey')" />
      </TresMesh> -->
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
