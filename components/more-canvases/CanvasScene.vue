<script lang="ts" setup>
import { FBXModel, GLTFModel, Stats } from '@tresjs/cientos'

export type CanvasSceneProps = {
  gl: any
  model: string
  fbx?: boolean
  cameraOptions?: [number, number, number]
}
const props = defineProps<CanvasSceneProps>()
</script>

<template>
  <TresCanvas v-bind="gl" :use-legacy-lights="false" shadows class="canvas">
    <!-- <Stats /> -->
    <StatsGl />
    <TresPerspectiveCamera :position="cameraOptions || [0, 0, 1]" :fov="35" />
    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight :intensity="2" :position="[0, 0, 1]" />

    <Levioso>
      <Suspense>
        <FBXModel v-if="fbx" :path="model" />
        <GLTFModel v-else :path="model" />
      </Suspense>
    </Levioso>

    <!-- <OrbitControls /> -->
  </TresCanvas>
</template>

<style lang="scss" scoped></style>
