<template>
  <Loading :isLoading="isLoading" />
  <section class="container my-5" v-if="!order.is_paid">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <CartStep :done="done" />
        <h2 class="topic mb-3">訂單細節</h2>
        <div class="card mb-5 bg-primary-light">
          <div class="card-body">
            <template v-for="item in order.products" :key="item.id">
              <div class="d-flex align-items-center mb-3">
                <img
                  :src="item.product.imageUrl"
                  alt="產品圖片"
                  style="width: 100px; height: 100px"
                />
                <div
                  class="ms-3 d-flex flex-column flex-sm-row
                  justify-content-sm-between align-items-start align-items-sm-center flex-grow-1"
                >
                  <h3 class="h5">
                    {{ item.product.title }} *{{ item.qty }}{{ item.product.unit }}
                  </h3>
                  <p>
                    {{ $filters.dollarSignThousandth(item.final_total) }}
                  </p>
                </div>
              </div>
            </template>
          </div>
          <div class="card-footer bg-transparent text-end">
            <span>訂單金額</span>
            <span class="fs-4 ms-3 text-primary fw-bold" v-if="order.total">
              {{ $filters.dollarSignThousandth(order.total) }}
            </span>
          </div>
        </div>
        <h2 class="topic mb-3">客戶資料</h2>
        <div class="row justify-content-between border">
          <div class="col-lg-6">
            <table class="table payment-table table-borderless">
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
          </div>
          <div class="col-lg-6 d-none d-lg-block">
            <div class="user-bg bg-contain float-end bg-no-repeat"></div>
          </div>
        </div>
        <button
          class="btn btn-primary btn-slide-right border-0 py-2 px-5 float-end mt-3"
          type="button"
          @click="pay"
        >
          確認付款
        </button>
      </div>
    </div>
  </section>
  <section v-else class="container position-relative my-md-5">
    <div class="row justify-content-end">
      <div class="col-md-6 position-absolute bg-cover payment-bg"></div>
      <div class="overlay-light"></div>
    </div>
    <div class="container">
      <div class="row align-items-center" style="height:100vh">
        <div class="col-md-6 z-index">
          <div class="me-0 me-sm-5">
            <h2 class="mb-3">
              <span class="material-icons-outlined h2 align-middle paid-icon-color">
                paid
              </span>
              付款完成
            </h2>
            <h3 class="h5 mb-3">行程資訊</h3>
            <table class="table table-borderless">
              <tbody>
                <template v-for="item in order.products" :key="item.id">
                  <tr>
                    <th style="width:80px" class="fw-normal">行程名稱</th>
                    <td>
                      {{ item.product.title }}
                    </td>
                  </tr>
                  <tr>
                    <th style="width:80px" class="fw-normal">參加人數</th>
                    <td>{{ item.qty }}{{ item.product.unit }}</td>
                  </tr>
                  <tr>
                    <th style="width:80px" class="fw-normal">付款金額</th>
                    <td>{{ $filters.dollarSignThousandth(item.final_total) }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
            <hr />
            <h3 class="h5">付款資訊</h3>
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <td>姓名</td>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <td>連絡電話</td>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <td>連絡地址</td>
                  <td>{{ order.user.address }}</td>
                </tr>
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
            <router-link to="/products" class="btn btn-slide-right float-end border-0 px-5">
              挑選行程
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loading from '@/components/Loading.vue';
import CartStep from '@/components/CartStep.vue';
import goTop from '@/methods/goTop';

export default {
  data() {
    return {
      id: '',
      order: {
        user: {},
      },
      isLoading: false,
      done: this.$route.name,
    };
  },
  components: {
    Loading,
    CartStep,
  },
  inject: ['Toast'],
  methods: {
    getOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/order/${this.id}`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order;
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
            title: '無法取得訂單，請再次確認!',
          });
          this.isLoading = false;
        });
    },
    pay() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/pay/${this.id}`;
      this.axios
        .post(api)
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
