<template>
  <Loading :isLoading="isLoading" />
  <div class="text-end mt-5">
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="openModal('new')"
    >
      建立新的優惠券
    </button>
  </div>
  <div class="table-responsive mt-3">
    <table class="table table-hover">
      <thead>
        <tr>
          <th class="d-none d-sm-table-cell">名稱</th>
          <th class="d-none d-sm-table-cell">優惠碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td class="d-none d-sm-table-cell">{{ item.title }}</td>
          <td class="d-none d-sm-table-cell">{{ item.code }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>{{ item.is_enabled === 1 ? "啟用" : "未啟用" }}</td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="openModal('edit', item)"
              >
                編輯
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
    <Pagination :pages="pagination" @emit-page="getCoupons" />
    <CouponModal
      ref="couponModal"
      :coupon="tempCoupon"
      :isNew="isNew"
      @emit-coupon="updateCoupon"
    />
    <DelModal ref="delModal" :item="tempCoupon" @emit-delete="deleteCoupon" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import CouponModal from '@/components/CouponModal.vue';
import DelModal from '@/components/DelModal.vue';
import Loading from '@/components/Loading.vue';

export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      isLoading: false,
      isNew: false,
      tempCoupon: {},
      currentPage: 1,
    };
  },
  components: {
    Pagination,
    CouponModal,
    DelModal,
    Loading,
  },
  inject: ['Toast'],
  methods: {
    getCoupons(page = 1) {
      this.currentPage = page;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/coupons?page=${this.currentPage}`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.coupons = res.data.coupons;
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
            title: '無法取得優惠碼，請再次確認!',
          });
          this.isLoading = false;
        });
    },
    openModal(status, item) {
      if (status === 'new') {
        this.isNew = true;
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000, // due_date格式為Unix Timestamp(10位數),所以要除1000
        };
        this.$refs.couponModal.openModal();
      } else if (status === 'edit') {
        this.isNew = false;
        this.tempCoupon = { ...item };
        this.$refs.couponModal.openModal();
      } else if (status === 'delete') {
        this.tempCoupon = { ...item };
        this.$refs.delModal.openModal();
      }
    },
    updateCoupon(item) {
      this.tempCoupon = item;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/coupon`;
      let httpMethod = 'post';
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/coupon/${this.tempCoupon.id}`;
        httpMethod = 'put';
      }
      this.isLoading = true;
      this.axios[httpMethod](api, { data: this.tempCoupon })
        .then((res) => {
          if (res.data.success) {
            this.getCoupons(this.currentPage);
            this.Toast.fire({
              icon: 'success',
              title: `${res.data.message}`,
            });
            this.$refs.couponModal.closeModal();
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
            title: '無法更新優惠碼，請再次確認!',
          });
          this.isLoading = false;
        });
    },
    deleteCoupon() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/coupon/${this.tempCoupon.id}`;
      this.axios
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            this.getCoupons(this.currentPage);
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
            title: '無法刪除優惠碼，請再次確認!',
          });
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
