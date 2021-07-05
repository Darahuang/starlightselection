<template>
  <div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './assets/stylesheets/all.scss';
@import url("https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp")
</style>

<script>
import Toast from './sweetAlert/toast';

export default {
  provide() {
    return {
      Toast,

    };
  },

};
</script>
