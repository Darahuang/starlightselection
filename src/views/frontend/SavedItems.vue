<template>
<loading :active="isLoading">
    <div class="bubblingG">
      <span id="bubblingG_1"> </span>
      <span id="bubblingG_2"> </span>
      <span id="bubblingG_3"> </span>
    </div>
  </loading>
   <section class="container my-5 py-5" v-if="myFavorite.length!== 0 ">
     <h2 class="text-center text-primary fw-bold h1 mb-4">
        <span class="material-icons-outlined h1  align-middle text-secondary">
          favorite
        </span>
        收藏清單
      </h2>
     <div class="row justify-content-center">
       <div class="col-md-10">
         <div class="row ">
           <div class="col-md-4" v-for="item in myFavorite" :key="item.id">
          <div class="card h-100 cursor products-card border-0">
               <div class="overflow-hidden">
                  <img
                  :src="item.imageUrl"
                  class="products-card-img position-relative"
                  alt="..."
                  @click="toProduct(item.id)"
                />
               </div>

                <div class="favoriteIcon-position p-2" @click="removeFavorite(item)">
                  <span
                    class="material-icons-outlined text-danger"
                    v-if="myFavorite.find((el)=> el.title ===item.title)">
                    favorite
                  </span>
                  <span
                    class="material-icons-outlined text-danger"
                    v-else>
                    favorite_border
                  </span>
                </div>

                <span class="badge bg-secondary badge-position p-2">{{ item.category }}</span>
                <div class="card-body text-center" @click="toProduct(item.id)">
                  <h2 class="card-title h4">{{ item.title }}</h2>

                  <p class="card-text">{{ item.description }}</p>
                  <p class="h5 text-danger">{{ $filters.dollarSignThousandth(item.price) }}</p>

                </div>
                <div class="mt-2 text-center">
                  <button
                    class="btn btn-slide-right btn-rounded col-6 p-2 border-0"
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
   <section v-else class="container ">
     <div  class="d-flex flex-column justify-content-center
     align-items-center " style="height:100vh">
             <div class="favorite-img "></div>

              <p class="fw-bold h4 text-center mb-4">收藏清單目前沒有商品，<br>
立刻挑選喜愛的行程吧！</p>
          <router-link to="/products" class="btn btn-slide-right border-0 px-5 py-2 btn-rounded">
          挑選行程</router-link>

        </div>
   </section>
</template>

<script>
import emitter from '@/methods/emitter';

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
      myFavorite: localStorageMethods.get() || [],
      loadingStatus: {
        loadingItem: '',
      },
      isLoading: false,
    };
  },
  inject: ['Toast'],
  methods: {
    removeFavorite(favoriteItem) {
      const favIndex = this.myFavorite.findIndex((el) => el.id === favoriteItem.id);
      this.myFavorite.splice(favIndex, 1);
      this.Toast.fire({
        icon: 'warning',
        title: `${favoriteItem.title}從我的最愛移出`,
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
          this.loadingStatus.loadingItem = '';
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
  watch: {
    myFavorite: {
      handler() {
        localStorageMethods.save(this.myFavorite);
      },
      deep: true,
    },
  },
};
</script>
