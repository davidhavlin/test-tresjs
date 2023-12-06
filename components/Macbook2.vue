<script lang="ts" setup>
import { gsap } from 'gsap'
import {
  Color,
  Group,
  MeshBasicMaterial,
  SRGBColorSpace,
  VideoTexture
} from 'three'

defineExpose({
  animateMacbook
})

const { scene, nodes, materials } = await useGLTF('/mac.glb')

console.log('', nodes, materials)

const group = ref<Group | null>(null)
const video = ref<HTMLVideoElement | null>(null)
const screenMaterial = ref<MeshBasicMaterial>(null!)

let tl: gsap.core.Timeline | null = null

const groupHinge = ref<Group | null>(null)

const initialCoords = { position: [0, -6, 10], rotation: [0.2, 0.5, 0] } as any
const initialHingeXRotation = -0.3

function animateMacbook() {
  const mats = [...Object.values(materials), screenMaterial.value]
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
  console.log('', { tlDuration, videoDur: videoEl.duration })

  return gsap.fromTo(
    videoEl,
    { currentTime: 0 },
    { currentTime: videoEl.duration || 1, duration: tlDuration }
  )
}

const replaceScreenWithVideo = () => {
  video.value = document.createElement('video')
  // video.value.src = '/tools-homepage.mp4'
  video.value.src = '/output2.mp4'
  video.value.loop = true
  video.value.preload = 'auto'
  video.value.muted = true
  video.value.autoplay = true
  video.value.load()
  video.value.pause()

  video.value.addEventListener('loadeddata', () => {
    tl?.add(animateVideoProgress(video.value!), 'start')
  })
  video.value.addEventListener('load', () => {
    console.log('', 'load')
  })
  video.value.addEventListener('canplaythrough', () => {
    console.log('', 'canplaythrough')
  })
  video.value.addEventListener('loadedmetadata', () => {
    console.log('', 'loadedmetadata')
  })

  const texture = new VideoTexture(video.value)
  texture.colorSpace = SRGBColorSpace
  texture.flipY = false

  screenMaterial.value.map = texture

  // @ts-ignore
  materials['screen.001'].map = texture
  // materials['screen.001'].roughness = 0
  // materials['screen.001'].metalness = 0.5
  materials['screen.001'].needsUpdate = true
}

const setShadows = () => {
  scene.traverse((child: any) => {
    if (child.isMesh) {
      // child.castShadow = true
      // child.receiveShadow = true
    }
  })
}

const setMaterialsTransparentable = () => {
  Object.values(materials).forEach((mat) => {
    mat.transparent = true
  })
}

onMounted(() => {
  replaceScreenWithVideo()
  setShadows()
  setMaterialsTransparentable()
})
</script>

<template>
  <TresGroup ref="group" v-bind="initialCoords">
    <primitive :object="scene" />
  </TresGroup>
</template>
