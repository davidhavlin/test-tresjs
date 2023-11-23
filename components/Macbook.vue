<script lang="ts" setup>
import { gsap } from 'gsap'
import { Group, SRGBColorSpace, VideoTexture } from 'three'

defineExpose({
  animateMacbook
})

const { scene, nodes, materials } = await useGLTF('/mac-draco.glb', {
  draco: true
})

const group = ref<Group | null>(null)
const video = ref<HTMLVideoElement | null>(null)
let tl: gsap.core.Timeline | null = null

const groupHinge = ref<Group | null>(null)

const initialCoords = { position: [0, -6, 10], rotation: [0.2, 0.5, 0] } as any
const initialHingeXRotation = -0.3

function animateMacbook() {
  const mats = Object.values(materials)
  const position = group.value!.position
  const rotation = group.value!.rotation
  const hingeRotation = groupHinge.value!.rotation

  tl = gsap
    .timeline({})
    .addLabel('start')
    .to(position, { y: -3, z: 16 })
    .to(rotation, { x: 0.5, y: 0, z: 0 }, '<')
    .to(hingeRotation, { x: -0.5 }, '<')
    .to({}, {}, '>')
    .to(position, { z: 7 }, '>')
    .to(rotation, { x: 1.5 }, '<')
    .to(mats, { opacity: 0 })

  return tl
}

const animateVideoProgress = (videoEl: HTMLVideoElement) => {
  const tlDuration = tl?.totalDuration()

  return gsap.fromTo(
    videoEl,
    { currentTime: 0 },
    { currentTime: videoEl.duration || 1, duration: tlDuration }
  )
}

const replaceScreenWithVideo = () => {
  video.value = document.createElement('video')
  video.value.src = '/tools-homepage.mp4'
  video.value.loop = true
  video.value.muted = true
  video.value.autoplay = true
  video.value.pause()

  video.value.addEventListener('loadeddata', () => {
    tl?.add(animateVideoProgress(video.value!), 'start')
  })

  const texture = new VideoTexture(video.value)
  texture.colorSpace = SRGBColorSpace
  texture.flipY = false

  // @ts-ignore
  materials['screen.001'].map = texture
  console.log('', materials['screen.001'])
  // materials['screen.001'].roughness = 0
  // materials['screen.001'].metalness = 0.5
  materials['screen.001'].needsUpdate = true
}

const setMaterialsTransparentable = () => {
  Object.values(materials).forEach((mat) => {
    mat.transparent = true
  })
}

onMounted(() => {
  replaceScreenWithVideo()
  setMaterialsTransparentable()
})
</script>

<template>
  <TresGroup ref="group" v-bind="initialCoords">
    <TresGroup
      ref="groupHinge"
      :rotation-x="initialHingeXRotation"
      :position="[0, -0.04, 0.41]"
      cast-shadow
    >
      <TresGroup :position="[0, 2.96, -0.13]" :rotation="[Math.PI / 2, 0, 0]">
        <TresMesh
          :material="materials.aluminium"
          :geometry="nodes['Cube008'].geometry"
        />
        <TresMesh
          :material="materials['matte.001']"
          :geometry="nodes['Cube008_1'].geometry"
        />
        <TresMesh
          :material="materials['screen.001']"
          :geometry="nodes['Cube008_2'].geometry"
        />
      </TresGroup>
    </TresGroup>
    <TresMesh
      :material="materials.keys"
      :geometry="nodes.keyboard.geometry"
      :position="[1.79, 0, 3.45]"
    />
    <TresGroup :position="[0, -0.1, 3.39]">
      <TresMesh
        :material="materials.aluminium"
        :geometry="nodes['Cube002'].geometry"
      />
      <TresMesh
        :material="materials.aluminium"
        :geometry="nodes['Cube002_1'].geometry"
      />
    </TresGroup>
    <TresMesh
      :material="materials.touchbar"
      :geometry="nodes.touchbar.geometry"
      :position="[0, -0.03, 1.2]"
    />
  </TresGroup>
</template>