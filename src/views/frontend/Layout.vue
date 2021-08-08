<template>
  <Menu />
  <div class="wrapper">
    <router-view></router-view>
  </div>
  <Footer />
  <GoTop />
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
