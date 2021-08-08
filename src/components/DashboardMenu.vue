<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
      <router-link class="navbar-brand font-logo d-block" to="/" @click="toggle">
        <h1 class="h2">WorldTrip</h1>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        ref="button"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" ref="collapse">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item" @click="toggle">
            <router-link to="/admin" class="nav-link">產品列表</router-link>
          </li>
          <li class="nav-item" @click="toggle">
            <router-link to="/admin/orders" class="nav-link">訂單列表</router-link>
          </li>
          <li class="nav-item" @click="toggle">
            <router-link to="/admin/coupons" class="nav-link">優惠券</router-link>
          </li>
          <li class="nav-item" @click="toggle">
            <router-link to="/admin/articles" class="nav-link">貼文</router-link>
          </li>
          <li class="nav-item" @click="toggle">
            <a href="#" class="nav-link" @click.prevent="logout">登出</a>
          </li>
        </ul>
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
    logout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      this.axios.post(api).then((res) => {
        if (res.data.success) {
          document.cookie = 'starlightselection = ; expires = ; path=/';
          this.$router.push('/');
        }
      });
    },
  },
  mounted() {
    this.collapse = new Collapse(this.$refs.collapse, {
      toggle: false,
    });
  },
};
</script>
