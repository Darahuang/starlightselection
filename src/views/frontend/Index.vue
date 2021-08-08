<template>
  <Loading :isLoading="isLoading"></Loading>
  <header class="container-fluid hero-banner-bg bg-cover">
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="hero-banner-text p-3">
        <h3 class="text-center fw-bold">
          準備與我們一起去旅行嗎?
        </h3>
        <figure>
          <blockquote class="blockquote">
            <p>人之所以愛旅行，不是為了抵達目的地，而是為了享受旅途中的種種樂趣。</p>
          </blockquote>
          <figcaption class="blockquote-footer text-end text-dark mb-0">
            <cite title="Source Title">歌德</cite>
          </figcaption>
        </figure>
        <router-link to="/products" class="btn float-end btn-slide-right border-0">
          查看行程
        </router-link>
      </div>
    </div>
  </header>

  <section class="container mt-6">
    <h2 class="topic mb-3">精選商品</h2>
    <ul class="row list-unstyled g-2">
      <li class="col-md-4" v-if="products[2]" data-aos="fade-down">
        <div class="card selected-card bg-cover cursor border-0" @click="toProduct(products[2].id)">
          <img
            :src="products[2].imagesUrl[0]"
            class="img-cover selected-card-height-special"
            alt="產品圖片"
          />
          <h3 class="selected-card-title text-white h4">
            {{ products[2].title }}
          </h3>
          <div class="selected-card-overlay">
            <h3 class="selected-card-title text-white h4">
              {{ products[2].title }}
            </h3>
          </div>
        </div>
      </li>
      <li class="col-md-4" v-if="products[0]" data-aos="fade-down">
        <ul class="list-unstyled row flex-column g-2">
          <li class="col">
            <div
              class="card selected-card cursor bg-cover border-0"
              @click="toProduct(products[0].id)"
            >
              <img
                :src="products[0].imageUrl"
                class="img-cover selected-card-img
               "
                alt="產品圖片"
              />
              <h3 class="selected-card-title text-white h4">
                {{ products[0].title }}
              </h3>
              <div class="selected-card-overlay">
                <h3 class="selected-card-title text-white h4">
                  {{ products[0].title }}
                </h3>
              </div>
            </div>
          </li>
          <li class="col" v-if="products[1]" data-aos="fade-down">
            <div class="card selected-card cursor border-0" @click="toProduct(products[1].id)">
              <img :src="products[1].imageUrl" class="img-cover selected-card-img" alt="產品圖片" />
              <h3 class="selected-card-title text-white h4">
                {{ products[1].title }}
              </h3>
              <div class="selected-card-overlay">
                <h3 class="selected-card-title text-white h4">
                  {{ products[1].title }}
                </h3>
              </div>
            </div>
          </li>
        </ul>
      </li>
      <li class="col-md-4" v-if="products[3]" data-aos="fade-down">
        <ul class="list-unstyled row flex-column g-2">
          <li class="col" v-if="products[3]">
            <div class="card selected-card cursor border-0" @click="toProduct(products[3].id)">
              <img :src="products[3].imageUrl" class="img-cover selected-card-img" alt="產品圖片" />
              <h3 class="selected-card-title text-white h4">
                {{ products[3].title }}
              </h3>
              <div class="selected-card-overlay">
                <h3 class="selected-card-title text-white h4">
                  {{ products[3].title }}
                </h3>
              </div>
            </div>
          </li>
          <li class="col" v-if="products[4]" data-aos="fade-down">
            <div class="card selected-card cursor border-0" @click="toProduct(products[4].id)">
              <img :src="products[4].imageUrl" class="img-cover selected-card-img" alt="產品圖片" />
              <h3 class="selected-card-title text-white h4">
                {{ products[4].title }}
              </h3>
              <div class="selected-card-overlay">
                <h3 class="selected-card-title text-white h4">
                  {{ products[4].title }}
                </h3>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </section>
  <section class="container-fluid mt-6 second-banner-bg">
    <div class="container h-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="second-banner-text text-center py-5 border">
          <h3>找尋您心目中的理想行程</h3>
          <figure>
            <blockquote class="blockquote">
              <p>旅行幫助我們找回自己。</p>
            </blockquote>
            <figcaption class="blockquote-footer text-end mb-0 text-dark">
              <cite title="Source Title">卡繆</cite>
            </figcaption>
          </figure>
          <router-link to="/products" class="btn btn-slide-right border-0">立刻出發</router-link>
        </div>
      </div>
    </div>
  </section>

  <section class="container mt-6" data-aos="fade-down">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <ul class="row list-unstyled">
          <li class="col-md-4">
            <div class="feature text-center bg-white">
              <div class="feature-icon">
                <span class="material-icons-outlined">
                  public
                </span>
              </div>
              <div class="feature-text">
                <h3 class="text-primary h4">嚴選的行程</h3>
                <p>為您把關行程品質</p>
              </div>
            </div>
          </li>
          <li class="col-md-4">
            <div class="feature text-center">
              <div class="feature-icon">
                <span class="material-icons-outlined">
                  airplane_ticket
                </span>
              </div>
              <div class="feature-text">
                <h3 class="text-primary h4">多樣化的選擇</h3>
                <p>滿足顧客不同的需求</p>
              </div>
            </div>
          </li>
          <li class="col-md-4">
            <div class="feature text-center">
              <div class="feature-icon">
                <span class="material-icons-outlined">
                  outlined_flag
                </span>
              </div>
              <div class="feature-text">
                <h3 class="text-primary h4">核心價值</h3>
                <p>誠實、負責</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <Swiper />
  <section class="container my-6">
    <h2 class="topic mb-3">旅遊須知</h2>
    <ul class="row list-unstyled">
      <li
        class="col-md-4 mt-3 mt-sm-0"
        v-for="article in articles"
        :key="article.create_at"
        data-aos="fade-up"
      >
        <div class="notice-card">
          <div class="overflow-hidden">
            <img
              :src="article.image"
              alt="貼文圖片"
              class="cursor notice-card-image"
              @click="toArticle(article.id)"
            />
          </div>
          <span
            class="badge bg-secondary p-2 mt-2 me-2"
            v-for="(item, index) in article.tag"
            :key="index"
            >{{ item }}</span
          >
          <div class="d-flex justify-content-between align-items-center">
            <router-link
              :to="{ name: 'Article', params: { id: `${article.id}` } }"
              class="text-decoration-none h4 my-2 link-dark link-hover"
            >
              {{ article.title }}
            </router-link>
            <span>{{ $filters.date(article.create_at) }}</span>
          </div>
          <p>{{ article.description }}</p>
          <button type="button" class="btn btn-outline-primary" @click="toArticle(article.id)">
            更多內容
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import Swiper from '@/components/Swiper.vue';
import Loading from '@/components/Loading.vue';

export default {
  data() {
    return {
      products: [{}],
      articles: [],
      isLoading: false,
      randomUsers: [],
    };
  },
  components: {
    Swiper,
    Loading,
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/products/?page=${page}`;
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
    getArticles(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/articles/?page=${page}`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.articles = res.data.articles;
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
    toProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    toArticle(id) {
      this.$router.push(`/article/${id}`);
    },
  },
  created() {
    this.getProducts();
    this.getArticles();
  },
};
</script>
