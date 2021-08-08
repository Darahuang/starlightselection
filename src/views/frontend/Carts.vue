<template>
  <Loading :isLoading="isLoading"></Loading>
  <section class="container my-5" v-if="carts.total !== 0">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <CartStep :done="done"></CartStep>
        <div class="row">
          <div class="col-lg-8 mb-3 mb-lg-0">
            <a
              href="#"
              class="d-block text-end text-decoration-none mb-3 link-hover link-dark"
              @click.prevent="deleteAll"
              v-if="carts.total !== 0"
              >清空購物清單</a
            >
            <template v-if="carts.carts">
              <div class="d-flex border p-3" v-for="item in carts.carts" :key="item.id">
                <img
                  :src="item.product.imageUrl"
                  alt="產品圖片"
                  srcset=""
                  style="width: 120px; height: 120px"
                  class="d-none d-sm-block"
                />
                <div class="flex-grow-1 ms-3 d-flex justify-content-between">
                  <div class="">
                    <h3 class="h5 ">{{ item.product.title }}</h3>
                    <small>{{ $filters.dollarSignThousandth(item.product.price) }}</small>
                    <small> * {{ item.qty }}{{ item.product.unit }}</small>
                    <div class="input-group input-group-sm my-3">
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="updateCart(item.id, item.qty - 1)"
                      >
                        <span class="material-icons-outlined align-middle">
                          remove
                        </span>
                      </button>
                      <input
                        type="number"
                        class="form-control text-center bg-transparent"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        min="1"
                        v-model.number="item.qty"
                        @change="updateCart(item.id, item.qty)"
                      />
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        id="button-addon1"
                        @click="updateCart(item.id, item.qty + 1)"
                      >
                        <span class="material-icons-outlined align-middle">
                          add
                        </span>
                      </button>
                    </div>
                  </div>
                  <div class="text-end ms-3">
                    <a href="#" class="text-danger" @click.prevent="deleteCart(item.id)">
                      <span class="material-icons"> delete_forever</span></a
                    >
                    <p class="mt-5  h6">{{ $filters.dollarSignThousandth(item.final_total) }}</p>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="col-lg-4">
            <div class="card rounded-0">
              <div class="card-header">訂單資訊</div>
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <p class="card-text">行程總額:</p>
                  <p v-if="carts.total">{{ $filters.dollarSignThousandth(carts.total) }}</p>
                </div>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入優惠碼"
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                    v-model="coupon"
                  />
                  <button type="button" class="btn btn-outline-secondary" @click="addCouponCode">
                    套用優惠碼
                  </button>
                </div>
                <div class="text-primary my-3">
                  <span class="material-icons-outlined align-text-bottom">
                    star
                  </span>
                  <span v-if="carts.total !== carts.final_total">已套用優惠券</span>
                  <span v-else>輸入<span class="text-danger">anniversary</span>可享95折優惠</span>
                </div>
                <div class="d-flex justify-content-between border-bottom">
                  <p>折扣金額:</p>
                  <p v-if="carts.final_total">
                    {{ $filters.dollarSignThousandth(carts.total - carts.final_total) }}
                  </p>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <p class="card-text">應付金額:</p>
                  <p v-if="carts.final_total" class="h5 text-primary fw-bold">
                    {{ $filters.dollarSignThousandth(carts.final_total) }}
                  </p>
                </div>
              </div>
              <div class="text-muted d-grid gap-2">
                <router-link
                  to="/checkout"
                  class="btn btn-slide-right
                 border-0 rounded-0"
                >
                  前往結帳
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else class="container">
    <div class="d-flex flex-column justify-content-center align-items-center" style="height:100vh">
      <div class="cart-bg bg-contain bg-no-repeat"></div>
      <p class="fw-bold h4 text-center mb-4">
        購物車目前沒有商品，<br />
        立刻挑選喜愛的行程吧！
      </p>
      <router-link to="/products" class="btn btn-slide-right border-0 px-5 py-2">
        挑選行程
      </router-link>
    </div>
  </section>
</template>

<script>
import emitter from '@/methods/emitter';
import Loading from '@/components/Loading.vue';
import CartStep from '@/components/CartStep.vue';

export default {
  data() {
    return {
      isLoading: false,
      carts: {},
      coupon: '',
      done: this.$route.name,
    };
  },
  components: {
    Loading,
    CartStep,
  },
  inject: ['Toast'],
  methods: {
    getCarts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.carts = res.data.data;
            console.log(this.carts.carts);
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
    updateCart(id, qty) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart/${id}`;
      if (qty <= 0) {
        this.Toast.fire({
          icon: 'error',
          title: '人數至少1位',
        });
        return;
      }
      const cart = {
        product_id: id,
        qty,
      };
      this.isLoading = true;
      this.axios
        .put(api, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.getCarts();
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
        });
    },
    deleteAll() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/carts`;
      this.axios
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            emitter.emit('emit-carts');
            this.getCarts();
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
        .catch(() => {
          this.Toast.fire({
            icon: 'error',
            title: '無法清除購物清單，請再次確認!',
          });
          this.isLoading = false;
        });
    },
    deleteCart(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart/${id}`;
      this.isLoading = true;
      this.axios
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            emitter.emit('emit-carts');
            this.getCarts();
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
            title: '無法清除購物清單，請再次確認!',
          });
          this.isLoading = false;
        });
    },
    addCouponCode() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/coupon`;
      this.isLoading = true;
      const coupon = {
        code: this.coupon,
      };
      this.axios
        .post(api, { data: coupon })
        .then((res) => {
          if (res.data.success) {
            this.getCarts();
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
            title: '無法使用優惠券，請再次確認!',
          });
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
    this.getCarts();
  },
};
</script>
