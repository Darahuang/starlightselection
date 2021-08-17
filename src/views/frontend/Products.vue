<template>
  <Loading :isLoading="isLoading" />
  <div class="container-fluid products-banner-bg bg-cover"></div>
  <section class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <ul
          class="d-flex list-unstyled justify-content-md-between
            justify-content-center category-border flex-wrap"
        >
          <li class="category-list text-center">
            <a
              href="#"
              class="text-decoration-none category-list-border link-dark
                     h3 d-block mb-0 py-2"
              @click.prevent="(category = ''), (searchInput = '')"
            >
              <span class="material-icons-outlined categoryIcon-hover">travel_explore</span>
              全部
            </a>
          </li>
          <li class="category-list text-center">
            <a
              href="#"
              class="text-decoration-none link-dark category-list-border h3 d-block mb-0 py-2"
              @click.prevent="(category = '亞洲'), (searchInput = '')"
              :class="{ 'category-list-border-active': category === '亞洲' }"
            >
              <span class="material-icons-outlined categoryIcon-hover"> festival </span>
              亞洲
            </a>
          </li>
          <li class="category-list text-center">
            <a
              href="#"
              class="text-decoration-none link-dark category-list-border
                     h3 mb-0 py-2 d-block "
              @click.prevent="(category = '歐洲'), (searchInput = '')"
              :class="{ 'category-list-border-active': category === '歐洲' }"
            >
              <span class="material-icons-outlined categoryIcon-hover"> gite </span> 歐洲
            </a>
          </li>
          <li class="category-list text-center">
            <a
              href="#"
              class="text-decoration-none link-dark category-list-border
                     h3 mb-0 py-2 d-block"
              @click.prevent="(category = '美洲'), (searchInput = '')"
              :class="{ 'category-list-border-active': category === '美洲' }"
            >
              <span class="material-icons-outlined categoryIcon-hover">
                luggage
              </span>
              美洲
            </a>
          </li>
          <li class="category-list text-center">
            <a
              href="#"
              class="text-decoration-none link-dark category-list-border
                     h3 mb-0 py-2 d-block"
              @click.prevent="(category = '大洋洲'), (searchInput = '')"
              :class="{ 'category-list-border-active': category === '大洋洲' }"
            >
              <span class="material-icons-outlined categoryIcon-hover"> sailing </span>
              大洋洲
            </a>
          </li>
        </ul>
        <div class="mb-3 clearfix">
          <input
            type="search"
            class="form-control w-25 float-end d-none d-sm-block"
            id="search"
            placeholder="請輸入類別 ex:亞洲"
            v-model.lazy="searchInput"
            @input="category = ''"
          />
          <input
            type="search"
            class="form-control w-100 float-end d-block d-sm-none"
            id="search"
            placeholder="請輸入類別 ex:亞洲"
            v-model.lazy="searchInput"
            @input="category = ''"
          />
        </div>
        <div class="row" v-if="filterProducts.length !== 0">
          <div
            class="col-lg-4 col-md-6 mt-5"
            v-for="item in filterProducts"
            :key="item.id"
            data-aos="fade-up"
          >
            <div class="card h-100 cursor products-card border-0 shadow-sm">
              <div class="overflow-hidden position-relative">
                <img
                  :src="item.imageUrl"
                  class="products-card-img"
                  alt="產品圖片"
                  @click="toProduct(item.id)"
                />
                <!-- 手機以上的hover效果 -->
                <ul
                  class="social-icon justify-content-center text-center list-unstyled
                         d-none d-sm-flex"
                >
                  <li>
                    <a href="#" class="link-dark" @click.prevent="addToFavorite(item)">
                      <span
                        class="material-icons-outlined text-danger icon fs-3"
                        v-if="myFavorite.find(el => el.title === item.title)"
                      >
                        favorite
                      </span>
                      <span class="material-icons-outlined icon fs-3" v-else>
                        favorite_border
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="link-dark" @click.prevent="addToCart(item.id)">
                      <span class="material-icons-outlined icon fs-3">
                        shopping_cart
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="link-dark" @click.prevent="toProduct(item.id)">
                      <span class="material-icons-outlined icon fs-3">
                        zoom_in
                      </span>
                    </a>
                  </li>
                </ul>
                <!-- 手機以下我的最愛樣式 -->
                <div
                  class="favoriteIcon-position favoriteIcon-bg p-2 d-block d-sm-none"
                  @click="addToFavorite(item)"
                >
                  <span
                    class="material-icons-outlined text-danger align-middle"
                    v-if="myFavorite.find(el => el.title === item.title)"
                  >
                    favorite
                  </span>
                  <span class="material-icons-outlined text-danger align-middle" v-else>
                    favorite_border
                  </span>
                </div>
              </div>
              <span class="badge bg-secondary badge-position px-3 py-2 z-index">
                {{ item.category }}
              </span>
              <div class="card-body text-center" @click="toProduct(item.id)">
                <h2 class="card-title h4">{{ item.title }}</h2>
                <p class="card-text">{{ item.description }}</p>
                <p class="h5 text-danger">{{ $filters.dollarSignThousandth(item.price) }}</p>
              </div>
              <!-- 手機以下加入購物車樣式 -->
              <div class="mb-3 text-center d-block d-sm-none">
                <button
                  type="button"
                  class="btn btn-slide-right col-6 p-2 border-0"
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
                  立即報名
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="d-flex justify-content-center align-items-center">
          <div class="search-bg bg-contain bg-no-repeat"></div>
          <p class="fw-bold">查無資料,請再次確認!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emitter from '@/methods/emitter';
import localStorageMethods from '@/methods/localStorageMethods';
import Loading from '@/components/Loading.vue';
import goTop from '@/methods/goTop';

export default {
  data() {
    return {
      products: [],
      isLoading: false,
      loadingStatus: {
        loadingItem: '',
      },
      myFavorite: localStorageMethods.get() || [],
      category: '',
      searchInput: '',
    };
  },
  components: {
    Loading,
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
            const { categoryName } = this.$route.params;
            if (categoryName) {
              this.category = categoryName;
            }
          } else {
            this.Toast.fire({
              icon: 'error',
              title: `${res.data.message}`,
            });
          }
          goTop();
          this.isLoading = false;
        })
        .catch(() => {
          this.Toast.fire({
            icon: 'error',
            title: '無法取得產品，請再次確認!',
          });
          this.isLoading = false;
        });
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.isLoading = true;
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
          this.isLoading = false;
          this.loadingStatus.loadingItem = '';
        });
    },
    addToFavorite(favoriteItem) {
      const favIndex = this.myFavorite.findIndex((item) => item.id === favoriteItem.id);
      if (favIndex === -1) {
        this.myFavorite.push(favoriteItem);
        this.Toast.fire({
          icon: 'success',
          title: `${favoriteItem.title}加入我的最愛`,
        });
      } else {
        this.myFavorite.splice(favIndex, 1);
        this.Toast.fire({
          icon: 'warning',
          title: `${favoriteItem.title}從我的最愛移出`,
        });
      }
    },
    toProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
  computed: {
    filterProducts() {
      if (this.category !== '' || this.searchInput !== '') {
        return this.products.filter(
          (item) => this.category === item.category || this.searchInput === item.category,
        );
      }
      return this.products;
    },
  },
  watch: {
    myFavorite: {
      handler() {
        localStorageMethods.save(this.myFavorite);
        emitter.emit('emit-myFavorite');
      },
      deep: true,
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
