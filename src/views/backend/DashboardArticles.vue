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
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="openModal('new')"
    >
      新增貼文
    </button>
  </div>
  <div class="table-responsive mt-3">
    <table class="table">
      <thead>
        <tr>
          <th style="width: 150px">標題</th>
          <th style="width: 150px">作者</th>
          <th>描述</th>
          <th style="width: 150px">建立時間</th>
          <th style="width: 150px">是否公開</th>
          <th style="width: 150px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in articles" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.author}}</td>
          <td>{{item.description}}</td>
          <td>{{$filters.date(item.create_at)}}</td>
          <td>{{item.isPublic? '已上架': '未上架'}}</td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
              <button type="button" class="btn btn-outline-primary"
              @click="getArticle(item.id)">編輯</button>
              <button type="button" class="btn btn-outline-danger"
              @click="openModal('delete', item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ArticleModal ref="articleModal" :article="tempArticles" :isNew="isNew"
  @emit-article="updateArticle"></ArticleModal>
  <DelModal ref="delModal" :item="tempArticles" @emit-delete="deleteArticle"></DelModal>
  <Pagination :pages="pagination" @emit-page="getArticles"></Pagination>
</template>

<script>
import ArticleModal from '@/components/ArticleModal.vue';
import Pagination from '@/components/Pagination.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  data() {
    return {
      articles: [],
      pagination: {},
      isLoading: false,
      currentPage: 1,
      isNew: false,
      tempArticles: {},
    };
  },
  inject: ['Toast'],
  components: {
    ArticleModal,
    Pagination,
    DelModal,
  },
  methods: {
    getArticles(page = 1) {
      this.currentPage = page;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/articles?page=${this.currentPage}`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        if (res.data.success) {
          this.articles = res.data.articles;
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
    getArticle(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/article/${id}`;
      this.isLoading = true;
      this.axios.get(api)
        .then((res) => {
          if (res.data.success) {
            this.openModal('edit', res.data.article);
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
      if (status === 'new') {
        this.isNew = true;
        this.tempArticles = {
          create_at: Date.now() / 1000,
          tag: [],
          isPublic: false,
        };
        this.$refs.articleModal.openModal();
      } else if (status === 'edit') {
        this.isNew = false;
        this.tempArticles = { ...item };
        this.$refs.articleModal.openModal();
      } else if (status === 'delete') {
        this.tempArticles = { ...item };
        this.$refs.delModal.openModal();
      }
    },
    updateArticle(item) {
      this.tempArticles = item;
      this.isLoading = true;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/article`;
      let httpMethod = 'post';
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/article/${this.tempArticles.id}`;
        httpMethod = 'put';
      }
      this.axios[httpMethod](api, { data: this.tempArticles })
        .then((res) => {
          if (res.data.success) {
            this.getArticles(this.currentPage);
            this.Toast.fire({
              icon: 'success',
              title: `${res.data.message}`,
            });
            this.$refs.articleModal.closeModal();
          } else {
            this.Toast.fire({
              icon: 'error',
              title: `${res.data.message}`,
            });
          }
          this.isLoading = false;
        });
    },
    deleteArticle() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/admin/article/${this.tempArticles.id}`;
      this.axios.delete(api)
        .then((res) => {
          if (res.data.success) {
            this.getArticles(this.currentPage);
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
        });
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
