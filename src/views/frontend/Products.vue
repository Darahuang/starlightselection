<template>
<loading :active="isLoading">
        <div class="bubblingG">
          <span id="bubblingG_1">
          </span>
          <span id="bubblingG_2">
          </span>
          <span id="bubblingG_3">
          </span>
        </div>
      </loading>
    <div class="container-fluid products-banner bg-cover"></div>
   <section class="container ">
        <h2 class="text-center text-primary fw-bold h1 my-5">產品列表</h2>
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <ul class="d-flex list-unstyled justify-content-md-evenly
            justify-content-center products-border
            border-primary flex-wrap">
              <li class="products-list text-center">
                <a href="#" class="text-decoration-none link-primary link-primary-hover
                h3  d-block mb-0 py-2">
                  <span class="material-icons-outlined icon-hover">travel_explore</span>
                  全部
                </a>
              </li>
              <li class="products-list text-center">
                <a href="#" class="text-decoration-none link-primary link-primary-hover
                h3  d-block mb-0 py-2">
                  <span class="material-icons-outlined icon-hover"> festival </span>
                  亞洲</a
                >
              </li>
              <li class="products-list text-center">
                <a href="#" class="text-decoration-none link-primary link-primary-hover
                h3 mb-0 py-2 d-block ">
                  <span class="material-icons-outlined icon-hover"> gite </span>歐洲
                </a>
              </li>
              <li class="products-list text-center">
                <a href="#" class="text-decoration-none link-primary link-primary-hover
                h3 mb-0 py-2 d-block"
                >
                  <span class="material-icons-outlined icon-hover">
                    luggage
                  </span>
                  美洲</a
                >
              </li>
              <li class="products-list text-center">
                <a href="#" class="text-decoration-none link-primary link-primary-hover
                h3 mb-0 py-2 d-block"
                >
                  <span class="material-icons-outlined icon-hover"> sailing </span>大洋洲
                </a>
              </li>
            </ul>
            <div class="row">
              <div
                class="col-lg-4 col-md-6 mt-5"
                v-for="item in products"
                :key="item.id"
              >
                <div class="card h-100 cursor products-card" @click="toProduct(item.id)">
                  <img :src="item.imageUrl" class="products-card-img" alt="..." />
                  <div class="card-body">
                    <h2 class="card-title h4">{{item.title}}</h2>
                    <p class="card-text">{{item.content}}</p>
                  </div>
                  <div class="mt-2">
                    <button
                      class="btn btn-primary rounded-0 col-12 p-2"
                      @click="addToCart(item.id)"
                      :disabled="loadingStatus.loadingItem === item.id"
                    >
                      <div
                        class="spinner-border text-white spinner-border-sm"
                        v-if="loadingStatus.loadingItem === item.id"
                        role="status"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>

<script>
import Toast from '@/sweetAlert/toast';

export default {
  data() {
    return {
      products: [],
      isLoading: false,
      loadingStatus: {
        loadingItem: '',
      },
      carts: [],
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/products/all`;
      this.isLoading = true;
      this.axios.get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
          } else {
            Toast.fire({
              icon: 'error',
              title: `${res.data.message}`,
            });
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.loadingStatus.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.axios.post(api, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = '';
            this.getCarts();
            Toast.fire({
              icon: 'success',
              title: `${res.data.message}`,
            });
          } else {
            Toast.fire({
              icon: 'error',
              title: `${res.data.message}`,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCarts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.isLoading = true;
      this.axios.get(api)
        .then((res) => {
          if (res.data.success) {
            this.carts = res.data;
          } else {
            Toast.fire({
              icon: 'error',
              title: `${res.data.message}`,
            });
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
  created() {
    this.getProducts();
    this.getCarts();
  },
};
</script>
