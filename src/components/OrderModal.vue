<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title" id="exampleModalLabel">訂單細節</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-5">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th style="width: 80px">姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-sm-7">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody v-if="tempOrder">
                  <tr>
                    <th style="width: 80px">訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ $filters.date(tempOrder.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>{{ tempOrder.payment_method }}</td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <span v-if="tempOrder.is_paid" class="text-success">已付款 </span>
                      <span v-else class="text-muted"> 未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ $filters.dollarSignThousandth(tempOrder.total) }}</td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <tbody v-if="tempOrder">
                  <tr v-for="product in tempOrder.products" :key="product.id">
                    <th>{{ product.product.title }}</th>
                    <td>{{ product.qty }}/{{ product.product.unit }}</td>
                    <td class="text-end">
                      {{ $filters.dollarSignThousandth(product.final_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="form-check float-end">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="payment"
                  v-model="tempOrder.is_paid"
                />
                <label class="form-check-label" for="payment">
                  {{ tempOrder.is_paid ? "已付款" : "未付款" }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('emit-change', tempOrder)">
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '../mixins/modalMixin';

export default {
  props: {
    order: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      tempOrder: {},
    };
  },
  mixins: [modalMixin],
  watch: {
    order() {
      this.tempOrder = this.order;
    },
  },
};
</script>
