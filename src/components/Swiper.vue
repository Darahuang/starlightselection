<template>
  <section class="bg p-5 mt-6 bg-primary-light">
    <div class="container  ">
    <h2 class="topic">客戶好評</h2>
    <swiper :slidesPerView="1" :spaceBetween="10"
    :autoplay='{
    "delay": 2500,
    "stopOnLastSlide": false,
    "disableOnInteraction": false,
    "pauseOnMouseEnter": true,
     }'
     :breakpoints='{
  "768": {
    "slidesPerView": 2,
    "spaceBetween": 20
  }}'
     :loop="true" :loopFillGroupWithBlank="true"   class="mySwiper">
  <swiper-slide v-for="(item, index) in users" :key="index" style="height:250px"
   >
   <div class=" bg-white p-3 " >
     <div class="text-center">
       <img :src="item.imageUrl" class="rounded-pill" alt="" srcset="" style="height:100px">
     </div>

     <p class="text-start ">{{item.comment}}</p>
     <div class="d-flex justify-content-end">
            <div class="me-0 me-sm-3 text-secondary">
              <span class="material-icons-outlined">
                star
              </span>
              <span class="material-icons-outlined">
                star
              </span>
              <span class="material-icons-outlined">
                star
              </span>
              <span class="material-icons-outlined">
                star
              </span>
              <span class="material-icons-outlined">
                star
              </span>
            </div>
            <p class="me-0 me-sm-3">{{item.name}}</p>
          </div>
   </div>

  </swiper-slide>
  </swiper>
  </div>
  </section>

</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper.scss';

import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

import SwiperCore, {
  Autoplay,
} from 'swiper/core';

SwiperCore.use([Autoplay]);

export default {
  data() {
    return {
      products: [],
      isLoading: false,
      users: [
        {
          name: '王美美',
          imageUrl: 'https://randomuser.me/api/portraits/women/60.jpg',
          comment: '旅遊能夠讓我們接觸不同的文化開拓視野，要旅遊找WorldTrip!',
        },
        {
          name: '林麗麗',
          imageUrl: 'https://randomuser.me/api/portraits/women/43.jpg',
          comment: '休息是為了走更長遠的路，旅行也是! WorldTrip安排的行程真的很棒!',
        },
        {
          name: '陳嘉嘉',
          imageUrl: 'https://randomuser.me/api/portraits/women/31.jpg',
          comment: '旅行讓繁忙的我有喘息休息的機會，旅遊的事放心交給WorldTrip!',
        },
        {
          name: '黃玲玲',
          imageUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
          comment: '擺脫工作、生活上的煩惱，放下一切去旅行吧! WorldTrip值得信賴。',
        },
      ],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },

};
</script>
