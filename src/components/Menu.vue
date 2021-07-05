<template>
     <nav class="navbar navbar-expand-lg navbar-light sticky-top bg-white">
  <div class="container-fluid">

      <router-link class="navbar-brand font-logo d-block" to="/" @click="toggle">
        <h1 class="h2">WorldTrip</h1>
    </router-link>

    <button class="navbar-toggler" type="button"
    data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false"
    aria-label="Toggle navigation" ref="button2">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent" ref="collapse">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item" @click="toggle">
          <router-link to="/about" class="nav-link">關於我們</router-link>
        </li>
        <li class="nav-item" @click="toggle">
          <router-link to="/products" class="nav-link me-2">行程列表</router-link>
        </li>
      </ul>
      <div class=" position-relative d-flex">
        <router-link to="/carts" class="nav-link ps-0 " @click="toggle">
            <span class="material-icons-outlined ">
                shopping_cart
            </span>
            <span class="rounded-circle bg-danger position-absolute
            text-white px-2 shoppingCart-icon-position"
             v-if="carts.carts">
            {{carts.carts.length}}</span>
        </router-link>

        <router-link to="/savedItems" class="nav-link " href="#" @click="toggle">
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
import emitter from '../methods/emitter';

export default {
  data() {
    return {
      collapse: '',
      carts: {},
    };
  },
  methods: {
    toggle() {
      if (window.innerWidth < 992) {
        this.collapse.toggle();
      }
    },
    // hide() {
    //   if (window.innerWidth < 992) {
    //     // console.log(this.$refs.button2);
    //     // this.$refs.button2.click();
    //     this.$refs.collapse.classList.toggle('show');
    //     // this.collapse.hide();
    //   }
    // },
    getCarts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.axios.get(api)
        .then((res) => {
          if (res.data.success) {
            this.carts = res.data.data;
          }
        });
    },
  },
  mounted() {
    this.$refs.collapse.classList.toggle('show');
    this.collapse = new Collapse(this.$refs.collapse);
    this.getCarts();
    emitter.on('emit-carts', () => {
      this.getCarts();
    });
  },

};
</script>
