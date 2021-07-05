<template>
  <loading :active="isLoading">
    <div class="bubblingG">
      <span id="bubblingG_1"> </span>
      <span id="bubblingG_2"> </span>
      <span id="bubblingG_3"> </span>
    </div>
  </loading>
  <section class="container my-5">
    <div class="row">
      <div class="col-lg-7 mt-5 mb-3">
        <img :src="product.imageUrl" class="product-img bg-cover" alt="" />
      </div>
      <div class="col-lg-5">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/" class="text-decoration-none link-primary">
                首頁</router-link>
            </li>
           <li class="breadcrumb-item">
                <router-link to="/products" class="text-decoration-none link-primary">
                行程列表</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
          </ol>
        </nav>
        <h1 class="fw-bold">{{product.title}}</h1>
        <p>{{product.content}}</p>

        <div class="d-flex justify-content-between">
                  <del>{{ $filters.dollarSignThousandth(product.origin_price) }}</del>
                  <p class="h4 text-danger">{{ $filters.dollarSignThousandth(product.price) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import Toast from '@/sweetAlert/toast';

export default {
  data() {
    return {
      product: {},
      id: '',
      isLoading: false,
    };
  },
  inject: ['Toast'],
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/product/${this.id}`;
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getProduct();
    this.id = this.$route.params.id;
  },
};
</script>
