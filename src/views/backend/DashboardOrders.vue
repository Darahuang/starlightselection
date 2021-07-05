<template>
  <loading :active="isLoading">
    <div class="bubblingG">
      <span id="bubblingG_1"> </span>
      <span id="bubblingG_2"> </span>
      <span id="bubblingG_3"> </span>
    </div>
  </loading>
  <!-- Button trigger modal -->
  <div class="table-responsive my-5">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id" :class="{'text-muted':!item.is_paid}">
          <th>{{ $filters.date(item.create_at) }}</th>
          <td>{{ item.user.email }}</td>
          <td>
            <ul class="list-unstyled mb-0">
              <li v-for="product in item.products" :key="product.id" class="mb-1">
                {{ product.product.title }} 人數: {{ product.qty }} {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ $filters.dollarSignThousandth(item.total) }}</td>
          <td>
            <div class="form-check form-switch" >
              <input class="form-check-input" type="checkbox" :id="item.id"
              v-model="item.is_paid"
              @change="updateOrder(item)"
              />
              <label class="form-check-label" :for="item.id"
                > {{ item.is_paid ? "已付款" : "未付款" }}</label
              >
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
              <button type="button" class="btn btn-outline-primary"
              @click="openModal('check',item)">檢視</button>
              <button type="button" class="btn btn-outline-danger"
              @click="openModal('delete',item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emit-page="getOrders"></Pagination>
    <OrderModal ref="orderModal" :order="tempOrder" @emit-change="updateOrder"></OrderModal>
    <DelModal ref="delModal" :item="tempOrder" @emit-delete="deleteOrder"></DelModal>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import OrderModal from '@/components/OrderModal.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1,
    };
  },
  components: {
    Pagination,
    OrderModal,
    DelModal,
  },
  inject: ['Toast'],
  methods: {
    getOrders(page = 1) {
      this.currentPage = page;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/orders?page=${this.currentPage}`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.orders;
            this.pagination = res.data.pagination;
          } else {
            this.Toast.fire({
              icon: 'error',
              title: `${res.data.message}`,
            });
          }
          this.isLoading = false;
        });
    },
    updateOrder(item) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.isLoading = true;
      this.axios.put(api, { data: paid })
        .then((res) => {
          if (res.data.success) {
            this.getOrders(this.currentPage);
            this.Toast.fire({
              icon: 'success',
              title: `${res.data.message}`,
            });
            this.$refs.orderModal.closeModal();
          } else {
            this.Toast.fire({
              icon: 'error',
              title: `${res.data.message}`,
            });
          }
          this.isLoading = false;
        });
    },
    openModal(status, item) {
      if (status === 'check') {
        this.tempOrder = { ...item };
        this.$refs.orderModal.openModal();
      } else if (status === 'delete') {
        this.tempOrder = { ...item };
        this.$refs.delModal.openModal();
      }
    },
    deleteOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/order/${this.tempOrder.id}`;
      this.isLoading = true;
      this.axios.delete(api)
        .then((res) => {
          if (res.data.success) {
            this.getOrders(this.currentPage);
            this.Toast.fire({
              icon: 'success',
              title: `${res.data.message}`,
            });
            this.$refs.delModal.closeModal();
          } else {
            this.Toast.fire({
              icon: 'error',
              title: `${res.data.message}`,
            });
          }
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
