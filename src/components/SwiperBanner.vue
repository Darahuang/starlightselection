<template>
  <section  data-aos="fade-down">
    <swiper
      :slidesPerView="1"

      :autoplay="{
        delay: 2500,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
      }"
      :loop="true"
      :loopFillGroupWithBlank="true"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in products.slice(5, 10)" :key="index">
        <div class="cursor " @click="$emit('emit-product', item.id)">
          <div class="position-relative">
            <img :src="item.imageUrl" class="banner-img-height img-cover"
            alt="產品圖片" />
            <div class="p-2 p-md-4 position-absolute bottom-10 start-50 translate-middle-x bg-light
            opacity-75 w-75 w-md-50 w-lg-35">
            <h3 class="h4 text-primary mb-0 text-center mb-2 fw-bold">{{ item.title }}</h3>
            <p class="mb-2 h5 text-start text-md-center ">{{ item.description }}</p>
          </div>
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
