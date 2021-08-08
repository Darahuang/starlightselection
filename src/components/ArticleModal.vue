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
          <h5 class="modal-title" id="exampleModalLabel" v-if="isNew">新增貼文</h5>
          <h5 v-else>編輯貼文</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                  v-model="tempArticle.title"
                />
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  placeholder="請輸入圖片網址"
                  v-model="tempArticle.image"
                />
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">作者</label>
                <input
                  type="text"
                  class="form-control"
                  id="author"
                  placeholder="請輸入作者名字"
                  v-model="tempArticle.author"
                />
              </div>
              <div class="mb-3">
                <label for="create_at" class="form-label">文章建立日期</label>
                <input
                  type="date"
                  class="form-control"
                  id="create_at"
                  placeholder="請輸入作者名字"
                  v-model="create_at"
                />
              </div>
            </div>
            <div class="col-sm-8">
              <label for="tag" class="form-label">標籤</label>
              <div class="row gx-2 mb-3">
                <div class="col-md-3 mb-1" v-for="(label, key) in tempArticle.tag" :key="key">
                  <div class="input-group input-group-sm">
                    <input
                      type="text"
                      class="form-control form-control"
                      id="tag"
                      v-model="tempArticle.tag[key]"
                      placeholder="請輸入標籤"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="tempArticle.tag.splice(key, 1)"
                    >
                      <span class="material-icons-outlined ">
                        close
                      </span>
                    </button>
                  </div>
                </div>
                <div
                  class="col-md-2 mb-1"
                  v-if="tempArticle.tag[tempArticle.tag.length - 1] || !tempArticle.tag.length"
                >
                  <button
                    type="button"
                    class="btn btn-outline-primary d-block w-100"
                    @click="tempArticle.tag.push('')"
                  >
                    新增標籤
                  </button>
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="3"
                  v-model="tempArticle.description"
                ></textarea>
              </div>
              <div class="mb-3">
                <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="tempArticle.content"
                ></ckeditor>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="isPublic"
                    checked
                    v-model="tempArticle.isPublic"
                  />
                  <label class="form-check-label" for="isPublic">
                    是否公開
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="$emit('emit-article', tempArticle)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  props: {
    article: {
      type: Object,
      default() {
        return {};
      },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tempArticle: {
        tag: [''],
      },
      create_at: '',
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'typing', 'bold', 'italic', '|', 'link'], // The configuration of the editor.
      },
    };
  },
  watch: {
    article() {
      this.tempArticle = {
        ...this.article,
        tag: this.article.tag || [],
        isPublic: this.article.isPublic || false,
      };
      const dateAndTime = new Date(this.tempArticle.create_at * 1000).toISOString().split('T');
      [this.create_at] = dateAndTime;
    },
    create_at() {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000);
    },
  },
  mixins: [modalMixin],
};
</script>
