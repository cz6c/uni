<script setup>
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  fit: {
    type: String,
    default: 'aspectFit',
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
  radius: {
    type: String,
    default: 'none',
  },
  isWhite: {
    type: Boolean,
    default: true,
  },
})

const errorStyle = computed(() => ({
  height: props.height,
  width: props.width,
  borderRadius: props.radius,
  background: props.isWhite ? '#ffffff' : '',
}))
</script>

<template>
  <wd-img
    :src="props.src"
    :mode="props.fit"
    :height="props.height"
    :width="props.width"
    :radius="props.radius"
  >
    <template #loading>
      <image :style="errorStyle" :mode="props.fit" src="@/static/images/base/imgLoading.png" />
    </template>
    <template #error>
      <image :style="errorStyle" :mode="props.fit" src="@/static/images/base/imgError.png" />
    </template>
  </wd-img>
</template>
