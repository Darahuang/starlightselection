<template>
<Loading :isLoading="isLoading"></Loading>
  <section class="container-fluid article-banner bg-cover"
  :style="{backgroundImage:`url(${article.image})`}"></section>
  <section class="container">
     <h2 class="fw-bold my-4">{{ article.title }}</h2>
     <div v-html="article.content"></div>
  </section>
</template>

<script>
import Loading from '@/components/Loading.vue';

export default {
  data() {
    return {
      id: '',
      article: {},
      isLoading: false,
    };
  },
  components: {
    Loading,
  },
  inject: ['Toast'],
  methods: {
    getArticle() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/article/${this.id}`;
      this.isLoading = true;
      this.axios.get(api)
        .then((res) => {
          if (res.data.success) {
            this.article = res.data.article;
            console.log(res.data.article);
          } else {
            this.Toast.fire({
              icon: 'error',
              title: `${res.data.message}`,
            });
          }
          this.goTop();
          this.isLoading = false;
        });
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
  created() {
    this.id = this.$route.params.id;
    this.getArticle();
  },
};
</script>
