<template>
  <loading :active="isLoading">
    <div class="bubblingG">
      <span id="bubblingG_1"> </span>
      <span id="bubblingG_2"> </span>
      <span id="bubblingG_3"> </span>
    </div>
  </loading>
  <section class="container my-5 py-5 bg-primary-light" v-if="!order.is_paid">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card mb-5">
          <div class="card-header bg-transparent py-3 text-center">
            <h3 class="mb-0">訂單細節</h3>
          </div>
          <div class="card-body">
            <template v-for="item in order.products" :key="item.id">
              <div class="d-flex justify-content-between align-items-center">
                <h3 class="h5">{{ item.product.title }} *{{ item.qty }}{{ item.product.unit }}</h3>
                <p>
                  {{ $filters.dollarSignThousandth(item.final_total) }}
                </p>
              </div>
            </template>
          </div>
          <div class="card-footer bg-transparent text-end">
            <span>訂單金額</span>
            <span class="fs-4 ms-3 text-primary fw-bold" v-if="order.total">
              {{ $filters.dollarSignThousandth(order.total) }}</span
            >
          </div>
        </div>
        <h3 class="mb-0 text-center border-bottom pb-3">客戶資料</h3>
        <table class="table bg-white payment-table">
          <tbody>
            <tr>
              <th style="width:120px" class="px-3">姓名:</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th style="width:120px" class="px-3">電話:</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th style="width:120px" class="px-3">信箱:</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th style="width:120px" class="px-3">地址:</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th style="width:120px" class="px-3">付款方式:</th>
              <td>{{ order.user.payment_method }}</td>
            </tr>
            <tr>
              <th style="width:100px" class="px-3">付款狀態:</th>
              <td>
                <span v-if="!order.is_paid" class="text-danger">未付款</span>
                <span v-else>已付款</span>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-primary w-100 py-2" type="button" @click="pay">確認付款</button>
      </div>
    </div>
  </section>
  <section v-else class="container position-relative mt-5 py-5">
    <div class="row justify-content-end">
      <div
        class="col-md-6 position-absolute bg-cover"
        style=" height:85vh;

            background-image: url(https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80);"
      ></div>
    </div>
    <div class="container">
      <div class="row align-items-center" style=" height:85vh">
        <div class="col-md-6 z-index">
          <div class="mb-4 text-color">
            <h2 class=" mb-0">
              <span class="material-icons-outlined h2  align-middle"> paid </span>付款完成
            </h2>
          </div>

          <h3 class="h5 mb-3">行程名稱</h3>
          <p class="px-2" v-for="item in order.products" :key="item.id">
            {{ item.product.title }} *{{ item.qty }}{{ item.product.unit }}
          </p>
          <hr />
          <h3 class="h5">付款資訊</h3>
          <table class="table table-borderless ">
            <tbody>
              <tr>
                <td style="width:80px">付款狀態</td>
                <td>
                  <span v-if="order.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </td>
              </tr>
              <tr>
                <td>付款日</td>
                <td>{{ $filters.date(order.paid_date) }}</td>
              </tr>
              <tr>
                <td>付款方式</td>
                <td>{{ order.user.payment_method }}</td>
              </tr>
            </tbody>
          </table>
          <router-link
            to="/products"
            class="btn btn-slide-right float-end border-0
              px-5"
            >挑選行程</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      order: {
        user: {},
      },
      isLoading: false,
    };
  },
  inject: ['Toast'],
  methods: {
    getOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/order/${this.id}`;
      this.isLoading = true;
      this.axios.get(api)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order;
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
            title: '無法取得訂單，請再次確認!',
          });
          this.isLoading = false;
        });
    },
    pay() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/pay/${this.id}`;
      this.axios.post(api)
        .then((res) => {
          if (res.data.success) {
            this.getOrder();
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
            title: '無法付款，請再次確認!',
          });
          this.isLoading = false;
        });
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getOrder();
  },
};
</script>
