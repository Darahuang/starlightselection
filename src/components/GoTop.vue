<template>
  <!-- <button type="button " class="btn" @click="goTo" v-if="show"
style="bottom: 0px; right: 0px;">
        <span class="material-icons-outlined">
arrow_circle_up
</span>
    </button> -->
  <div v-if="show">
    <button
      class="btn btn-goTop btn-hover position-fixed "
      id="gotopBtn"
      @click="gotop"
    >
      <span class="material-icons-outlined fs-1 ">
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
};
</script>
