<template>
  <loading :active="isLoading">
    <div class="bubblingG">
      <span id="bubblingG_1"> </span>
      <span id="bubblingG_2"> </span>
      <span id="bubblingG_3"> </span>
    </div>
  </loading>
  <section class="container my-5 py-5 bg" v-if="!order.is_paid">
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
              <!-- <div class="d-flex justify-content-between align-items-center">
                <p>折扣金額</p>
                <p>-{{ $filters.dollarSignThousandth(item.total - item.final_total) }}</p>
              </div> -->
            </template>
          </div>
          <div class="card-footer bg-transparent text-end">
            <span>訂單金額</span>
            <span class="fs-4 ms-3 text-primary fw-bold">
              {{ $filters.dollarSignThousandth(order.total) }}</span
            >
          </div>
        </div>
        <!-- <div class="bg-white border p-3"> -->
        <h3 class="mb-0 text-center border-bottom pb-3">客戶資料</h3>
        <table class="table bg-white">
          <tbody>
            <tr>
              <th style="width:100px">姓名:</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th style="width:100px">電話:</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th style="width:100px">信箱:</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th style="width:100px">地址:</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th style="width:100px">付款方式:</th>
              <td>{{ order.user.payment_method }}</td>
            </tr>
            <tr>
              <th style="width:100px">付款狀態:</th>
              <td>
                <span v-if="!order.is_paid" class="text-danger">未付款</span>
                <span v-else>已付款</span>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-primary w-100 py-2" type="button" @click="pay">確認付款</button>
        <!-- </div> -->
      </div>
    </div>
  </section>
  <section v-else class="container position-relative mt-5 py-5">
    <div class="row justify-content-end">
      <div class="col-lg-6 position-absolute bg-cover top-0 bottom-0" style=" height:85vh;

            background-image: url(https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80);">
            </div>
    </div>
    <!-- <div class="container">
            <div class="row justify-content-end text-md-secondary">
                <div class="col-md-7 border border-secondary rounded p-3 ">
                    <h4>New Arrival</h4>
                    <p>Autumn Clothing</p>
                    <p>選購新款的服飾、鞋款及更多日常穿搭配件</p>
                    <a href="#" class="btn btn-info ">Shop now</a>
                    <div class="row my-4">
                        <div class="col-md-6">
                            <h4>Hot Item</h4>
                            <p>熱銷款項&amp;預購中</p>
                            <a href="#" class="btn btn-outline-info ">See more</a>
                        </div>
                        <div class="col-md-6">
                            <h4>Summer Sale</h4>
                            <p>Comming soon</p>
                        </div>
                    </div>
                </div>

            </div>
        </div> -->
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 z-index my-6">
          <div class="d-flex align-items-center my-4">
            <span class="material-icons-outlined "
            style="font-size: 3rem"> paid </span>
            <p class="display-6 mb-0 ms-2">付款完成!</p>
          </div>
                <p class="h5 mb-3">行程名稱</p>
                <p class="px-2" v-for="item in order.products" :key="item.id">
                    {{ item.product.title }} *{{ item.qty }}{{ item.product.unit }}</p>
              <hr>
              <p class="h5">付款資訊</p>
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
                          <td>{{$filters.date(order.paid_date)}}</td>
                      </tr>
                      <tr>
                          <td>付款方式</td>
                          <td>{{order.user.payment_method}}</td>
                      </tr>
                  </tbody>
              </table>
              <router-link to="/products" class="btn btn-primary float-end
              px-5">挑選行程</router-link>
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
      this.axios.get(api).then((res) => {
        if (res.data.success) {
          this.order = res.data.order;
        } else {
          this.Toast.fire({
            icon: 'error',
            title: `${res.data.message}`,
          });
        }
        this.isLoading = false;
      });
    },
    pay() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/pay/${this.id}`;
      this.axios.post(api).then((res) => {
        if (res.data.success) {
          this.getOrder();
        }
      });
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getOrder();
  },
};
</script>
