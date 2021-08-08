<template>
  <Loading :isLoading="isLoading"></Loading>
  <section
    class="container-fluid product-banner bg-cover"
    :style="{ backgroundImage: `url(${product.imageUrl})` }"
  ></section>
  <section class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="row">
          <div class="col-md-7 d-none d-md-block">
            <img :src="product.imageUrl" class="product-img img-cover" alt="產品圖片" />
          </div>
          <div class="col-md-5">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/" class="text-decoration-none link-primary"> 首頁</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/products" class="text-decoration-none link-primary">
                    行程列表
                  </router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
              </ol>
            </nav>
            <div class="card p-4">
              <div class="d-flex justify-content-between align-items-center">
                <h2 class="fw-bold h1">{{ product.title }}</h2>
                <div class="cursor py-2" @click="addToFavorite(product)">
                  <span
                    class="material-icons-outlined text-danger align-middle fs-2"
                    v-if="myFavorite.find(el => el.title === product.title)"
                  >
                    favorite
                  </span>
                  <span class="material-icons-outlined text-danger align-middle fs-2" v-else>
                    favorite_border
                  </span>
                </div>
              </div>
              <p class="h5 mt-2">{{ product.description }}</p>
              <ul class="list-unstyled mt-2 mb-0" v-html="product.condition"></ul>
              <div
                class="d-flex justify-content-between align-items-center mt-2"
                v-if="product.price"
              >
                <del class="text-muted">
                  {{ $filters.dollarSignThousandth(product.origin_price) }}</del
                >
                <p class="h5 text-danger fw-bold">
                  {{ $filters.dollarSignThousandth(product.price) }}
                </p>
              </div>
              <hr class="border-top my-2" />
              <form class="row mt-3">
                <div class="col-lg-6">
                  <div class="input-group input-group-sm mb-3">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click="qty -= 1"
                      :class="{ disabled: qty <= 1 }"
                    >
                      <span class="material-icons-outlined align-middle">
                        remove
                      </span>
                    </button>
                    <input
                      type="number"
                      class="form-control text-center"
                      placeholder=""
                      aria-label="Example text with two button addons"
                      min="1"
                      v-model.number="qty"
                    />
                    <button class="btn btn-outline-secondary" type="button" @click="qty += 1">
                      <span class="material-icons-outlined align-middle">
                        add
                      </span>
                    </button>
                  </div>
                </div>
                <div class="col-lg-6 text-end">
                  <p class="h5 lh-base" v-if="product.price">
                    <span class="h6">總額</span>
                    {{ $filters.dollarSignThousandth(qty * product.price) }}
                  </p>
                </div>
                <div class="col-md-12">
                  <button
                    class="btn btn-slide-right w-100 p-2 border-0"
                    type="button"
                    @click="addToCart(product.id, qty)"
                  >
                    立即報名
                  </button>
                </div>
              </form>
            </div>
          </div>
          <h2 class="text-center midline my-5">行程特色</h2>
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <p v-html="product.content"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container my-5">
    <h2 class="text-center mb-5 midline">猜您喜歡</h2>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="row">
          <div class="col-md-3" v-for="item in relatedProducts.slice(0, 4)" :key="item.id">
            <div class="random-card cursor shadow-sm" @click="toProduct(item.id)">
              <div class="position-relative">
                <img :src="item.imageUrl" class="random-card-image" alt="產品圖片" srcset="" />
                <div class="random-card-overlay d-flex justify-content-center align-items-center">
                  <!-- 手機以上的hover效果 -->
                  <div class="zoomIn-icon text-center d-none d-sm-block">
                    <span class="material-icons-outlined text-white fs-1 align-middle">
                      zoom_in
                    </span>
                  </div>
                </div>
              </div>
              <div class="text-center mt-3">
                <h3 class="h4 text-primary">{{ item.title }}</h3>
                <p>{{ $filters.dollarSignThousandth(item.price) }}</p>
                <!-- 手機以下的查看更多的樣式 -->
                <button
                  class="btn btn-primary d-sm-none "
                  type="button"
                  @click="toProduct(item.id)"
                >
                  查看更多
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
import emitter from '@/methods/emitter';
import localStorageMethods from '@/methods/localStorageMethods';
import Loading from '@/components/Loading.vue';

export default {
  data() {
    return {
      products: [],
      product: {},
      qty: 1,
      id: '',
      isLoading: false,
      myFavorite: localStorageMethods.get('favorite') || [],
    };
  },
  components: {
    Loading,
  },
  inject: ['Toast'],
  methods: {
    getProduct(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/product/${id}`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.product = res.data.product;
          } else {
            this.Toast.fire({
              icon: 'error',
              title: `${res.data.message}`,
            });
          }
          this.goTop();
          this.isLoading = false;
        })
        .catch(() => {
          this.Toast.fire({
            icon: 'error',
            title: '無法取得資料，請再次確認!',
          });
          this.isLoading = false;
        });
    },
    getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/products/all`;
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
        })
        .catch(() => {
          this.Toast.fire({
            icon: 'error',
            title: '無法取得資料，請再次確認!',
          });
          this.isLoading = false;
        });
    },
    addToFavorite(favoriteItem) {
      const favIndex = this.myFavorite.findIndex((item) => favoriteItem.id === item.id);
      if (favIndex === -1) {
        this.myFavorite.push(favoriteItem);
        this.Toast.fire({
          icon: 'success',
          title: `${favoriteItem.title}加入收藏清單`,
        });
      } else {
        this.myFavorite.splice(favIndex, 1);
        this.Toast.fire({
          icon: 'warning',
          title: `${favoriteItem.title}從收藏清單移出`,
        });
      }
    },
    addToCart(id, qty) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      this.isLoading = true;
      this.axios
        .post(api, { data: cart })
        .then((res) => {
          if (res.data.success) {
            emitter.emit('emit-carts');
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
          this.isLoading = false;
        })
        .catch(() => {
          this.Toast.fire({
            icon: 'error',
            title: '無法報名，請再次確認!',
          });
        });
    },
    toProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    goTop() {
      if (window.pageYOffset > 100) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    },
  },
  computed: {
    relatedProducts() {
      let relatedAry = [];
      relatedAry = this.products.filter(
        (item) => item.category === this.product.category && item.id !== this.product.id,
      );
      relatedAry.sort(() => Math.random() - 0.5);
      return relatedAry;
    },
  },
  watch: {
    myFavorite: {
      // 深層監聽
      handler() {
        localStorageMethods.save(this.myFavorite);
        emitter.emit('emit-myFavorite');
      },
      deep: true,
    },
  },
  // 使用動態路由切換頁面在同一元件上,不會重新渲染元件,使用下列解決方法
  beforeRouteUpdate(to, from) {
    if (to.fullPath !== from.fullPath) {
      this.getProduct(to.params.id);
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getProduct(this.id);
    this.getProducts();
  },
};
</script>
