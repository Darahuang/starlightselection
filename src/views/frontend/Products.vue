<template>
  <loading :active="isLoading">
    <div class="bubblingG">
      <span id="bubblingG_1"> </span>
      <span id="bubblingG_2"> </span>
      <span id="bubblingG_3"> </span>
    </div>
  </loading>
  <div class="container-fluid products-banner bg-cover"></div>
  <section class="container ">
    <h2 class="text-center text-primary fw-bold h1 my-5">產品列表</h2>
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <ul
          class="d-flex list-unstyled justify-content-md-evenly
            justify-content-center products-border
            border-primary flex-wrap"
        >
          <li class="products-list text-center" @click.prevent="(category = ''),(searchInput='')">
            <a
              href="#"
              class="text-decoration-none link-primary link-primary-hover
                h3  d-block mb-0 py-2"
            >
              <span class="material-icons-outlined categoryIcon-hover">travel_explore</span>
              全部
            </a>
          </li>
          <li
            class="products-list text-center"
            @click.prevent="(category = '亞洲'),(searchInput='')"
          >
            <a
              href="#"
              class="text-decoration-none link-primary link-primary-hover
                h3  d-block mb-0 py-2"
            >
              <span class="material-icons-outlined categoryIcon-hover"> festival </span>
              亞洲</a
            >
          </li>
          <li
            class="products-list text-center"
            @click.prevent="(category = '歐洲'),(searchInput='')"
          >
            <a
              href="#"
              class="text-decoration-none link-primary link-primary-hover
                h3 mb-0 py-2 d-block "
            >
              <span class="material-icons-outlined categoryIcon-hover"> gite </span>歐洲
            </a>
          </li>
          <li
            class="products-list text-center"
            @click.prevent="(category = '美洲'),(searchInput='')"
          >
            <a
              href="#"
              class="text-decoration-none link-primary link-primary-hover
                h3 mb-0 py-2 d-block"
            >
              <span class="material-icons-outlined categoryIcon-hover">
                luggage
              </span>
              美洲</a
            >
          </li>
          <li
            class="products-list text-center"
            @click.prevent="(category = '大洋洲'),(searchInput='')"
          >
            <a
              href="#"
              class="text-decoration-none link-primary link-primary-hover
                h3 mb-0 py-2 d-block"
            >
              <span class="material-icons-outlined categoryIcon-hover"> sailing </span>大洋洲
            </a>
          </li>
        </ul>
         <div class="mb-3 clearfix">
        <input type="search" class="form-control w-25 float-end" id="search"
        placeholder="請輸入類別 ex:亞洲" v-model.lazy="searchInput" @input="(category ='')" ref="search"
  >
</div>
        <div class="row">
          <template v-if="filterProducts.length!==0">
            <div class="col-lg-4 col-md-6 mt-5" v-for="item in filterProducts" :key="item.id">
            <div class="card h-100 cursor products-card">
              <img :src="item.imageUrl" class="products-card-img position-relative"
              alt="..." @click="toProduct(item.id)"/>
              <span class="material-icons-outlined text-danger
              FavoriteIcon-position" @click="addToFavorite">
                favorite_border
              </span>
              <div class="card-body" @click="toProduct(item.id)">
                <h2 class="card-title h4">{{ item.title }}</h2>
                <span class="badge bg-primary">{{ item.category }}</span>
                <p class="card-text">{{ item.content }}</p>
                <div class="d-flex justify-content-between">
                  <del>{{ $filters.dollarSignThousandth(item.origin_price) }}</del>
                  <p class="h4 text-danger">{{ $filters.dollarSignThousandth(item.price) }}</p>
                </div>
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
          </template>
          <template v-else>
            <div>
              <p>查無資料,請再次確認!</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

// import Toast from '@/sweetAlert/toast';
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      products: [],
      isLoading: false,
      loadingStatus: {
        loadingItem: '',
      },
      // carts: [],
      category: '',
      searchInput: '',
    };
  },
  inject: ['Toast'],
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/products/all`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
          } else {
            this.Toast.fire({
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
      this.axios
        .post(api, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = '';
            emitter.emit('emit-carts');
            // this.getCarts();
            this.Toast.fire({
              icon: 'success',
              title: `${res.data.message}`,
            });
          } else {
            this.Toast.fire({
              icon: 'error',
              title: `${res.data.message}`,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // getCarts() {
    //   const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
    //   this.isLoading = true;
    //   this.axios
    //     .get(api)
    //     .then((res) => {
    //       if (res.data.success) {
    //         this.carts = res.data;
    //       } else {
    //         this.Toast.fire({
    //           icon: 'error',
    //           title: `${res.data.message}`,
    //         });
    //       }
    //       this.isLoading = false;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    toProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
  computed: {
    // filterProducts() {
    //   if (this.category !== '' || this.searchInput !== '') {
    //     return this.products.filter((item) => this.category === item.category
    //     || this.searchInput === item.category);
    //   }
    //   return this.products;
    // },
    filterProducts() {
      return this.products.filter((item) => item.category.match(this.category)
        || item.category.match(this.searchInput));
    },

  },
  created() {
    this.getProducts();
    // this.getCarts();
  },
};
</script>
