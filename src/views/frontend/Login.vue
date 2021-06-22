<template>
  <section class="login-bg d-flex align-items-center ">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <h2 class="text-center text-white fw-bold">登入後台頁面</h2>
          <Form v-slot="{ errors }" @submit="login">
            <div class="mb-3">
              <label for="account" class="form-label text-white">帳號</label>
              <Field
                type="text"
                class="form-control rounded-pill p-2 login-input"
                :class="{ 'is-invalid': errors['帳號'] }"
                name="帳號"
                id="account"
                rules="email|required"
                placeholder="請輸入帳號"
                v-model="user.username"
              ></Field>
              <ErrorMessage name="帳號" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label text-white">密碼</label>
              <Field
                type="password"
                class="form-control rounded-pill p-2 login-input"
                :class="{ 'is-invalid': errors['密碼'] }"
                name="密碼"
                id="password"
                rules="required"
                placeholder="請輸入密碼"
                v-model="user.password"
              >
              </Field>
              <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
            </div>
            <button class="btn btn-primary col-12 rounded-pill p-2 my-3" type="submit">登入</button>
            <router-link to="/" class="text-decoration-none">
              <span class="material-icons-outlined align-middle">
                arrow_back
              </span>
              回到starlightselection
            </router-link>
            <p ref="fail" class="text-danger h6 mt-3 fw-bold"></p>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      this.axios
        .post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `starlightselection=${token};expires=${new Date(expired)};`;
            this.$router.push('/admin/products');
          } else {
            this.$refs.fail.textContent = '登入失敗';
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
