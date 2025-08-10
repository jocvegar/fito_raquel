<script setup>
defineProps({
  images: Array,
  config: Object,
});

import { ref, onMounted } from "vue";
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const isClient = ref(false);

onMounted(() => (isClient.value = true));
</script>

<template>
  <Carousel v-if="isClient" v-bind="config" class="py-8">
    <Slide v-for="(image, index) in images" :key="index">
      <img :src="image.src" :alt="image.alt" />
    </Slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style scoped>
.carousel {
  --vc-pgn-background-color: rgba(255, 255, 255, 0.7);
  --vc-pgn-active-color: rgba(255, 255, 255, 1);
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
