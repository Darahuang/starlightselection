<template>
     <nav class="navbar navbar-expand-lg navbar-light sticky-top bg-white">
  <div class="container-fluid">
    <router-link class="navbar-brand font-logo d-block " to="/" @click="toggle">
        <h1 class="h2">WorldTrip</h1>
    </router-link>
    <button class="navbar-toggler" type="button"
    data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false"
    aria-label="Toggle navigation" ref="button">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarSupportedContent" ref="collapse">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item" @click="toggle">
          <router-link to="/about" class="nav-link">關於我們</router-link>
        </li>
        <li class="nav-item" @click="toggle">
          <router-link to="/products" class="nav-link">行程列表</router-link>
        </li>
      </ul>
      <div class="d-flex">
        <router-link to="/carts" class="nav-link px-0 px-sm-3" @click="toggle">
            <span class="material-icons-outlined">
                shopping_cart
            </span>
        </router-link>
        <router-link to="/savedItems" class="nav-link" href="#" @click="toggle">
            <span class="material-icons-outlined">
                favorite
            </span>
        </router-link>
        <router-link to="/login" class="nav-link" @click="toggle">
            <span class="material-icons-outlined">
              account_circle
            </span>
        </router-link>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';

export default {
  data() {
    return {
      collapse: '',
    };
  },
  methods: {
    toggle() {
      if (window.innerWidth < 992) {
        this.collapse.toggle();
      }
    },
    hide() {
      if (window.innerWidth < 992) {
        this.$refs.collapse.classList.toggle('show');
      }
    },
  },
  mounted() {
    this.hide();
    this.collapse = new Collapse(this.$refs.collapse);
  },

};
</script>
