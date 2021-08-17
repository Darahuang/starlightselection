<template>
  <section class="container mt-6" data-aos="fade-down">
    <h2 class="topic mb-4">熱銷行程</h2>
    <swiper
      :slidesPerView="1"
      :spaceBetween="10"
      :autoplay="{
        delay: 2500,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
      }"
      :breakpoints="{
        '768': {
          slidesPerView: 4,
          spaceBetween: 10
        }
      }"
      :loop="true"
      :loopFillGroupWithBlank="true"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in products.slice(5, 10)" :key="index">
        <div class="cursor shadow-sm border popular-card" @click="$emit('emit-product', item.id)">
          <div class="position-relative overflow-hidden">
            <img :src="item.imageUrl" class="popular-card-img" alt="產品圖片" />
            <div class="popular-card-overlay"></div>
          </div>
          <div class="p-4">
            <h3 class="h4 text-primary mb-0 text-start mb-2">{{ item.title }}</h3>
            <p class="mb-2">{{ item.description }}</p>
            <p class="text-danger mb-0 text-end">
              {{ $filters.dollarSignThousandth(item.price) }}
            </p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import SwiperCore, { Autoplay } from 'swiper/core';

SwiperCore.use([Autoplay]);

export default {
  props: {
    products: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>
