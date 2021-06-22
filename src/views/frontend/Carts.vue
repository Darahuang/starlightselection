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
   <section class="container my-5 py-5 bg" v-if="carts.total !== 0">
        <h2 class="text-center">購物清單</h2>
        <div class="row justify-content-center" >
          <div class="col-lg-10 " >
            <div class="row">
              <div class="col-lg-8">
                <!-- <button @click="deleteAll" class="btn btn-primary">清空購物清單</button> -->
                <a
                  href="#"
                  class="d-block text-end text-decoration-none mb-3"
                  @click.prevent="deleteAll"
                  v-if="carts.total!==0"
                  >清空購物清單</a
                >
                <div class="table-responsive bg-white border px-3">
                  <table class="table table-hover ">
                    <thead>
                      <tr >
                        <th class="d-none d-lg-table-cell"></th>
                        <th width="20%">行程名稱</th>
                        <th>售價</th>
                        <th width="25%">數量</th>
                        <th width="10%" class="text-end">小記</th>
                        <th></th>
                      </tr>
                    </thead>
                    <template v-if="carts.carts">
                      <tbody>
                        <tr
                          v-for="item in carts.carts"
                          :key="item.id"
                          class="align-middle"
                        >
                          <td
                            scope="row"
                            class="text-center d-none d-lg-table-cell"
                          >
                            <img
                              :src="item.product.imageUrl"
                              style="width: 120px; height: 120px"
                              alt=""
                            />
                          </td>
                          <td>{{item.product.title}}</td>
                          <td>{{dollarSignThousandth(item.product.price)}}</td>
                          <td>
                            <div class="input-group">
                              <button
                                class="btn btn-outline-secondary"
                                type="button"
                                @click="updateCart(item.id, item.qty-1)"
                              >
                                -1
                              </button>
                              <input
                                type="number"
                                min="1"
                                class="form-control text-center"
                                placeholder=""
                                aria-label="Example text with two button addons"
                                v-model="item.qty"
                              />
                              <button
                                class="btn btn-outline-secondary"
                                type="button"
                                @click="updateCart(item.id, item.qty+1)"
                              >
                                +1
                              </button>
                            </div>
                          </td>
                          <td class="text-end">
                            {{dollarSignThousandth(item.total)}}
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn"
                              @click="deleteCart(item.id)"
                            >
                              <span class="material-icons text-danger">
                                delete_forever</span
                              >
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </table>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card">
                  <div class="card-header">訂單資訊</div>
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <p class="card-text">小記:</p>
                      <p>{{dollarSignThousandth(carts.total)}}</p>
                    </div>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="請輸入優惠碼"
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                      />
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        id="button-addon1"
                      >
                        套用優惠碼
                      </button>
                    </div>
                    <hr />
                    <div class="d-flex justify-content-between">
                      <p class="card-text">總金額:</p>
                      <p>{{dollarSignThousandth(carts.final_total)}}</p>
                    </div>
                  </div>
                  <div class="text-muted d-grid gap-2">
                    <button class="btn btn-primary rounded-0" @click="toCheckout">
                      前往結帳
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
       <section v-else class="container">
              購物車是空的
        </section>
</template>

<script>
import Toast from '@/sweetAlert/toast';

// const url = 'https://vue3-course-api.hexschool.io';
// const path = 'starlightselection';
export default {
  data() {
    return {
      isLoading: false,
      carts: [],
    };
  },
  methods: {
    getCarts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.isLoading = true;
      this.axios.get(api)
        .then((res) => {
          if (res.data.success) {
            this.carts = res.data.data;
          }
          this.isLoading = false;
        });
    },
    updateCart(id, qty) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart/${id}`;
      if (qty === 0) {
        Toast.fire({
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
      this.axios.put(api, { data: cart })
        .then((res) => {
          if (res.data.success) {
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
          this.isLoading = false;
        })
        .then((err) => {
          console.log(err);
        });
    },
    dollarSignThousandth(dollar) {
      const dollarSign = `${dollar}`;
      const parts = dollarSign.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return `$${parts.join('.')}`;
    },
    deleteAll() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/carts`;
      this.axios.delete(api)
        .then((res) => {
          if (res.data.success) {
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
    deleteCart(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart/${id}`;
      this.isLoading = true;
      this.axios.delete(api)
        .then((res) => {
          if (res.data.success) {
            this.getCarts();
            Toast.fire({
              icon: 'success',
              title: `${res.data.message}`,
            });
            this.isLoading = true;
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
    toCheckout() {
      this.$router.push('/checkout');
    },
  },
  created() {
    this.getCarts();
  },
};
</script>
