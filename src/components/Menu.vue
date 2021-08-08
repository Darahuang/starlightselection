<template>
  <nav class="navbar navbar-expand-lg navbar-light sticky-top bg-white">
    <div class="container-fluid">
      <router-link class="navbar-brand font-logo d-block nav-link" to="/" @click="toggle">
        <h1 class="h2 text-primary">
          <img
            src="../assets/imgs/svg_f_traffic_40_0nbg.svg"
            class="logo-svg
           d-inline-block align-text-top"
            alt=""
            srcset=""
          />
          WorldTrip
        </h1>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        ref="button2"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" ref="collapse">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item" @click="toggle">
            <router-link to="/about" class="nav-link nav-link-primary nav-link-padding">
              關於我們</router-link
            >
          </li>
          <li class="nav-item" @click="toggle">
            <router-link to="/products" class="nav-link nav-link-primary nav-link-padding"
              >行程列表</router-link
            >
          </li>
          <li class="nav-item" @click="toggle">
            <router-link to="/faq" class="nav-link nav-link-primary nav-link-padding">
              常見問題</router-link
            >
          </li>
        </ul>
        <div class="position-relative navbar-nav flex-row">
          <router-link
            to="/carts"
            class="nav-link nav-link-primary nav-link-padding"
            @click="toggle"
          >
            <span class="material-icons-outlined">
              shopping_cart
            </span>
            <span
              class="rounded-circle bg-danger
                     text-white px-2 shoppingCart-icon-position"
              v-if="carts.carts"
            >
              {{ carts.carts.length }}</span
            >
          </router-link>
          <router-link
            to="/savedItems"
            class="nav-link nav-link-primary nav-link-padding"
            href="#"
            @click="toggle"
          >
            <span class="material-icons-outlined">
              favorite
            </span>
            <span
              class="rounded-circle bg-danger text-white px-2 favorite-icon-position"
              v-if="myFavorite.length"
            >
              {{ myFavorite.length }}</span
            >
          </router-link>
          <router-link
            to="/login"
            class="nav-link nav-link-primary nav-link-padding"
            @click="toggle"
          >
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

const localStorageMethods = {
  save(item) {
    const itemString = JSON.stringify(item);
    localStorage.setItem('favorite', itemString);
  },
  get() {
    return JSON.parse(localStorage.getItem('favorite'));
  },
};
export default {
  data() {
    return {
      collapse: '',
      carts: {},
      myFavorite: localStorageMethods.get() || [],
    };
  },
  methods: {
    toggle() {
      if (window.innerWidth < 992) {
        this.collapse.toggle();
      }
    },
    getCarts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.axios.get(api).then((res) => {
        if (res.data.success) {
          this.carts = res.data.data;
        }
      });
    },
  },
  mounted() {
    this.collapse = new Collapse(this.$refs.collapse, {
      toggle: false,
    });
    this.getCarts();
    emitter.on('emit-carts', () => {
      this.getCarts();
    });
    emitter.on('emit-myFavorite', () => {
      this.myFavorite = localStorageMethods.get();
    });
  },
};
</script>
