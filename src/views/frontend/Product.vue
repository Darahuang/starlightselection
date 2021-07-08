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
        <button class="btn btn-outline-success" @click="addFavorite(product)"
        :class="{'active' :myFavorite.includes(product.title)}"> 加入我的最愛</button>
      </div>
      <h5>近期商品瀏覽</h5>
      <div class="row">
        <template v-if="myBrowserRecord.length!==0">
           <div class="col-lg-3" v-for="item in myBrowserRecord.slice(0,4)" :key="item.id">
          <div class="box" >
            <img :src="item.imageUrl" alt="" class="img-fluid">
          </div>
        </div>
        </template>

      </div>
    </div>
  </section>
</template>

<script>
// import Toast from '@/sweetAlert/toast';
const localStorageMethods = {
  save(status, item) {
    const itemString = JSON.stringify(item);
    if (status === 'browserRecord') {
      localStorage.setItem('browserRecord', itemString);
    } else {
      localStorage.setItem('favorite', itemString);
    }
  },
  get(status) {
    if (status === 'browserRecord') {
      return JSON.parse(localStorage.getItem('browserRecord'));
    }
    return JSON.parse(localStorage.getItem('favorite'));
  },
};

export default {
  data() {
    return {
      product: {},
      id: '',
      isLoading: false,
      myFavorite: localStorageMethods.get('favorite') || [],
      myBrowserRecord: localStorageMethods.get('browserRecord') || [],
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
            this.addBrowerRecord(this.product);
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
    addBrowerRecord(product) {
      if (!this.myBrowserRecord.find((item) => (item.id === product.id))) {
        this.myBrowserRecord.push(product);
      }
    },
    addFavorite(item) {
      if (this.myFavorite.includes(item.title)) {
        this.myFavorite.splice(this.myFavorite.indexOf(item.title), 1);
        this.Toast.fire({
          icon: 'warning',
          title: `${item.title}移除我的最愛`,
        });
      } else {
        this.myFavorite.push(item.title);
        this.Toast.fire({
          icon: 'success',
          title: `${item.title}加入我的最愛`,
        });
      }
    },
  },
  watch: {
    myBrowserRecord: {
      // 深層監聽
      handler() {
        localStorageMethods.save('browserRecord', this.myBrowserRecord);
      },
      deep: true,
    },
    myFavorite: {
      // 深層監聽
      handler() {
        localStorageMethods.save('favorite', this.myFavorite);
      },
      deep: true,
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getProduct();
  },
};
</script>
