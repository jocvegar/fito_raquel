<script setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import car1 from "@/assets/car_1.jpg";
import car2 from "@/assets/car_2.jpg";
import car3 from "@/assets/car_3.jpg";
import car4 from "@/assets/car_4.jpg";
import car5 from "@/assets/car_5.jpg";

const images = [
  { src: car1.src, alt: "Fito Diputado" },
  { src: car2.src, alt: "Fito Diputado" },
  { src: car3.src, alt: "Fito Diputado" },
  { src: car4.src, alt: "Fito Diputado" },
  { src: car5.src, alt: "Fito Diputado" },
];

const config = {
  wrapAround: true,
  height: 500,
  gap: 5,
  autoplay: 2000,
  breakpoints: {
    1024: { itemsToShow: 3, mouseWheel: false },
    768: { itemsToShow: 2, mouseWheel: true },
    480: { itemsToShow: 1, mouseWheel: true },
  },
};
</script>

<template>
  <Carousel v-bind="config" class="py-8">
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
