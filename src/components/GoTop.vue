<template>
  <div v-if="show">
    <button type="button" class="btn btn-goTop btn-hover position-fixed" @click="gotop">
      <span class="material-icons-outlined fs-1">
        expand_less
      </span>
    </button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showBtn() {
      if (window.pageYOffset > 400) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    gotop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
  mounted() {
    window.addEventListener('scroll', this.showBtn);
  },
  unmounted() {
    window.addEventListener('scroll', this.showBtn);
  },
};
</script>
