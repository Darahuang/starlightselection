<template>

      <Menu></Menu>
      <div class="wrapper">
         <router-view   ></router-view>
         <!-- <div is="vue:GoTop"></div> -->

      </div>

       <Footer></Footer>
       <GoTop></GoTop>

</template>

<script>
import Menu from '@/components/Menu.vue';
import GoTop from '@/components/GoTop.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Menu,
    Footer,
    GoTop,
  },
};
</script>
