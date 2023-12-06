<template>
  <div class="flex flex-col items-center gap-10 pt-40 py-100">
    <section
      v-for="item in scenes"
      class="h-600px w-full max-w-1400px relative"
    >
      <CanvasScene
        :gl="item.gl"
        :model="item.model"
        :fbx="item.fbx"
        :camera-options="item.cameraOptions"
        class="absolute top-0 left-0 w-full h-full"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
import CanvasScene, {
  type CanvasSceneProps
} from '~/components/more-canvases/CanvasScene.vue'

const scenes: CanvasSceneProps[] = [
  {
    gl: {
      clearColor: '#F78B3D',
      alpha: false
    },
    model: '/models/ipad.glb'
  },
  {
    gl: {
      clearColor: '#af8be2',
      alpha: false
    },
    cameraOptions: [0, 10, 100],
    model: '/models/macbook_low.fbx',
    fbx: true
  },
  {
    gl: {
      alpha: true
    },
    model: '/models/ipad.glb'
  },
  {
    gl: {
      clearColor: '#f0564e',
      alpha: false
    },
    model: '/models/ipad.glb'
  }
]
</script>

<style scoped>
section {
  background-color: green;
}
</style>
