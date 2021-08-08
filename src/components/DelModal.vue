<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white" id="exampleModalLabel" v-if="item.title">
            刪除 {{ item.title }}
          </h5>
          <h5 class="modal-title text-white" id="exampleModalLabel" v-else>刪除訂單</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p v-if="item.title">
            是否刪除 <strong class="text-danger">{{ item.title }}</strong> (刪除後將無法恢復)。
          </p>
          <p v-else>
            是否刪除
            <strong class="text-danger">訂單編號 {{ item.id }}</strong> (刪除後將無法恢復)。
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('emit-delete')">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mixins: [modalMixin],
};
</script>
