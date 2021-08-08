<template>
  <loading :active="isLoading">
    <div class="bubblingG">
      <span id="bubblingG_1"> </span>
      <span id="bubblingG_2"> </span>
      <span id="bubblingG_3"> </span>
    </div>
  </loading>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
