<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center mt-5">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePage(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="(item, key) in pages.total_pages"
        :key="key"
        :class="{ active: pages.current_page === item }"
      >
        <a class="page-link" href="#" @click.prevent="$emit('emit-page', item)">{{ item }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="changePage(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pages: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
