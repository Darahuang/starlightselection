<template>
  <Loading :isLoading="isLoading" />
  <div class="table-responsive my-5">
    <table class="table table-hover">
      <thead>
        <tr>
          <th class="d-none d-sm-table-cell">購買時間</th>
          <th class="d-none d-sm-table-cell">Email</th>
          <th>購買品項</th>
          <th>應付金額</th>
          <th class="d-none d-sm-table-cell">是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id" :class="{ 'text-muted': !item.is_paid }">
          <td class="d-none d-sm-table-cell">{{ $filters.date(item.create_at) }}</td>
          <td class="d-none d-sm-table-cell">{{ item.user.email }}</td>
          <td>
            <ul class="list-unstyled mb-0">
              <li v-for="product in item.products" :key="product.id" class="mb-1">
                {{ product.product.title }} 人數: {{ product.qty }} {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ $filters.dollarSignThousandth(item.total) }}</td>
          <td class="d-none d-sm-table-cell">
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="item.id"
                v-model="item.is_paid"
                @change="updateOrder(item)"
              />
              <label class="form-check-label" :for="item.id">
                {{ item.is_paid ? "已付款" : "未付款" }}</label
              >
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="openModal('check', item)"
              >
                檢視
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="openModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emit-page="getOrders" />
    <OrderModal ref="orderModal" :order="tempOrder" @emit-change="updateOrder" />
    <DelModal ref="delModal" :item="tempOrder" @emit-delete="deleteOrder" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import OrderModal from '@/components/OrderModal.vue';
import DelModal from '@/components/DelModal.vue';
import Loading from '@/components/Loading.vue';

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
    Loading,
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
        })
        .catch(() => {
          this.Toast.fire({
            icon: 'error',
            title: '無法取得訂單，請再次確認!',
          });
          this.isLoading = false;
        });
    },
    updateOrder(item) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.isLoading = true;
      this.axios
        .put(api, { data: paid })
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
        })
        .catch(() => {
          this.Toast.fire({
            icon: 'error',
            title: '無法更新訂單，請再次確認!',
          });
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
      this.axios
        .delete(api)
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
        })
        .catch(() => {
          this.Toast.fire({
            icon: 'error',
            title: '無法刪除訂單，請再次確認!',
          });
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
