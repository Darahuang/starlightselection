<template>
  <loading :active="isLoading">
    <div class="bubblingG">
      <span id="bubblingG_1"> </span>
      <span id="bubblingG_2"> </span>
      <span id="bubblingG_3"> </span>
    </div>
  </loading>
  <div class="text-end mt-5">
    <button
      type="button" class="btn btn-primary"
      @click="openModal('new')"> 建立新的產品
    </button>
  </div>
  <div class="table-responsive mt-3">
    <table class="table table-hover">
      <thead>
        <tr>
          <th style="width: 120px">分類</th>
          <th style="width: 400px">產品名稱</th>
          <th  class="d-none d-sm-table-cell" style="width: 150px">原價</th>
          <th style="width: 150px">售價</th>
          <th  class="d-none d-sm-table-cell" style="width: 150px">是否啟用</th>
          <th style="width: 150px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="d-none d-sm-table-cell">
            {{ $filters.dollarSignThousandth(item.origin_price) }}</td>
          <td>{{ $filters.dollarSignThousandth(item.price) }}</td>
          <td class="d-none d-sm-table-cell">
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', item)">編輯</button>
              <button type="button" class="btn btn-outline-danger btn-sm"
              @click="openModal('delete', item)">刪除</button>
              </div>

          </td>
        </tr>
      </tbody>
    </table>
      <Pagination :pages="pagination" @emit-page="getProducts"></Pagination>
      <ProductModal ref="productModal" :product="tempProduct" :isNew="isNew"
       @emit-product="updateProduct"></ProductModal>
      <DelModal ref="delModal" :item="tempProduct" @emit-delete="deleteProduct"></DelModal>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import ProductModal from '@/components/ProductModal.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      isLoading: false,
      tempProduct: {},
      isNew: false,
      currentPage: 1,
    };
  },
  components: {
    Pagination,
    ProductModal,
    DelModal,
  },
  inject: ['Toast'],
  methods: {
    getProducts(page = 1) {
      this.currentPage = page;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/products?page=${this.currentPage}`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
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
            title: '無法取得產品，請再次確認!',
          });
          this.isLoading = false;
        });
    },
    openModal(status, item) {
      if (status === 'new') {
        this.tempProduct = {};
        this.isNew = true;
        this.$refs.productModal.openModal();
      } else if (status === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.productModal.openModal();
      } else if (status === 'delete') {
        this.tempProduct = { ...item };
        this.$refs.delModal.openModal();
      }
    },
    updateProduct(item) {
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/product`;
      let httpMethod = 'post';
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      this.tempProduct = item;
      this.isLoading = true;
      this.axios[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          if (res.data.success) {
            this.getProducts(this.currentPage); // 確保更新產品後,仍跳轉到同一頁面
            this.Toast.fire({
              icon: 'success',
              title: `${res.data.message}`,
            });
            this.$refs.productModal.closeModal();
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
            title: '無法更新產品，請再次確認!',
          });
          this.isLoading = false;
        });
    },
    deleteProduct() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/product/${this.tempProduct.id}`;
      this.isLoading = true;
      this.axios.delete(api)
        .then((res) => {
          if (res.data.success) {
            this.getProducts(this.currentPage);
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
            title: '無法刪除產品，請再次確認!',
          });
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
