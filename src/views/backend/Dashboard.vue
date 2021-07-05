<template>
<DashboardMenu></DashboardMenu>
  <div class="container-fluid px-5">
        <router-view v-if="check"></router-view>
  </div>

</template>

<script>
import DashboardMenu from '../../components/DashboardMenu.vue';

export default {
  data() {
    return {
      check: false,
    };
  },
  components: {
    DashboardMenu,
  },
  inject: ['Toast'],
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)starlightselection\s*=\s*([^;]*).*$)|^.*$/, '$1'); // 讀取token
    this.axios.defaults.headers.common.Authorization = `${token}`;
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    this.axios.post(api)
      .then((res) => {
        if (res.data.success) {
          this.check = true;
          this.Toast.fire({
            icon: 'success',
            title: '登入成功',
          });
        } else {
          this.$router.push('/login');
        }
      });
  },
};
</script>
