<template>
  <Loading :isLoading="isLoading" />
  <section class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <CartStep :done="done" />
        <div class="row flex-row-reverse">
          <div class="col-lg-4 mb-3 mb-lg-0">
            <div class="bg-primary-light">
              <div v-for="item in carts.carts" :key="item.id" class="p-3 d-flex">
                <img
                  :src="item.product.imageUrl"
                  alt="產品圖片"
                  style="width: 100px; height: 100px"
                />
                <div class="ms-3">
                  <h3 class="h5">{{ item.product.title }}</h3>
                  <small>{{ $filters.dollarSignThousandth(item.product.price) }}</small>
                  <small> * {{ item.qty }}{{ item.product.unit }}</small>
                </div>
              </div>
              <div class="p-3">
                <div class="d-flex justify-content-between border-top pt-3">
                  <p class="h6 text-end">應付金額:</p>
                  <p v-if="carts.final_total" class="h5 text-end text-primary fw-bold">
                    {{ $filters.dollarSignThousandth(carts.final_total) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <span class="text-danger px-3">*為必填欄位</span>
            <Form @submit="createOrder" v-slot="{ errors }">
              <div class="card border-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="col mb-3">
                        <label for="name" class="form-label">聯絡人姓名</label>
                        <span class="text-danger">*</span>
                        <Field
                          type="text"
                          class="form-control form-input-bg"
                          id="name"
                          placeholder="請輸入姓名"
                          name="姓名"
                          :class="{ 'is-invalid': errors['姓名'] }"
                          rules="required"
                          v-model="form.user.name"
                          ref="name"
                        />
                        <ErrorMessage name="姓名" class="invalid-feedback" />
                      </div>
                      <div class="col mb-3">
                        <label for="tel" class="form-label">電話</label>
                        <span class="text-danger">*</span>
                        <Field
                          id="tel"
                          name="tel"
                          type="tel"
                          class="form-control form-input-bg"
                          :class="{ 'is-invalid': errors['tel'] }"
                          placeholder="請輸入手機或家用電話"
                          :rules="isPhone"
                          v-model="form.user.tel"
                        />
                        <ErrorMessage name="tel" class="invalid-feedback" />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="col mb-3">
                        <label for="email" class="form-label">Email</label>
                        <span class="text-danger">*</span>
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          class="form-control form-input-bg"
                          :class="{ 'is-invalid': errors['email'] }"
                          placeholder="請輸入Email"
                          rules="email|required"
                          v-model="form.user.email"
                        />
                        <ErrorMessage name="email" class="invalid-feedback" />
                      </div>
                      <div class="col mb-3">
                        <label for="payment" class="form-label">付款方式</label>
                        <span class="text-danger">*</span>
                        <Field
                          class="form-select form-input-bg"
                          aria-label="Default select example"
                          id="payment"
                          v-model="form.user.payment_method"
                          name="付款方式"
                          :class="{ 'is-invalid': errors['付款方式'] }"
                          rules="required"
                          as="select"
                        >
                          <option disabled value="">請選擇付款方式</option>
                          <option :value="item" v-for="(item, i) in payment" :key="i">
                            {{ item }}
                          </option>
                        </Field>
                        <ErrorMessage name="付款方式" class="invalid-feedback" />
                      </div>
                    </div>
                    <div class="col-12 mb-3">
                      <label for="address" class="form-label">聯絡人地址</label>
                      <span class="text-danger">*</span>
                      <Field
                        id="address"
                        name="地址"
                        type="text"
                        class="form-control form-input-bg"
                        :class="{ 'is-invalid': errors['地址'] }"
                        placeholder="請輸入地址"
                        rules="required"
                        v-model="form.user.address"
                      />
                      <ErrorMessage name="地址" class="invalid-feedback" />
                    </div>
                    <div class="col-12 mb-4">
                      <label for="message" class="form-label">備註</label>
                      <div class="form-floating">
                        <textarea
                          class="form-control form-input-bg"
                          id="message"
                          style="height: 75px"
                          v-model="form.message"
                        >
                        </textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between mt-3 align-items-center">
                <router-link to="/carts" class="text-decoration-none btn btn-outline-primary">
                  回到上一頁
                </router-link>
                <button class="btn btn-primary" type="submit" :class="{ disabled: checkForm }">
                  確認送出
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emitter from '@/methods/emitter';
import Loading from '@/components/Loading.vue';
import CartStep from '@/components/CartStep.vue';
import goTop from '@/methods/goTop';

export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          payment_method: '',
        },
        message: '',
      },
      payment: ['WebATM', 'ATM', 'CVS', 'Barcode', 'Credit', 'ApplePay', 'GooglePay'],
      carts: {},
      isLoading: false,
      done: this.$route.name,
    };
  },
  components: {
    Loading,
    CartStep,
  },
  methods: {
    createOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/order`;
      this.axios
        .post(api, { data: this.form })
        .then((res) => {
          if (res.data.success) {
            emitter.emit('emit-carts'); // 建立訂單後,購物車會清空,Menu需要重新取得購物車
            this.$router.push(`/payment/${res.data.orderId}`);
          }
        })
        .catch(() => {
          this.Toast.fire({
            icon: 'error',
            title: '無法建立訂單，請再次確認!',
          });
          this.isLoading = false;
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/ && /^\(?(\d{2})\)?[\s\]?(\d{4})\-?(\d{4})$/ && /^[0-9]{8,10}$/;
      return phoneNumber.test(value) ? true : '需輸入手機或家用電話';
    },
    getCarts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_APIPATH}/cart`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.carts = res.data.data;
          }
          goTop();
          this.isLoading = false;
        })
        .catch(() => {
          this.Toast.fire({
            icon: 'error',
            title: '無法取得資料，請再次確認!',
          });
          this.isLoading = false;
        });
    },
  },
  computed: {
    checkForm() {
      if (
        this.form.user.name === ''
        || this.form.user.email === ''
        || this.form.user.tel === ''
        || this.form.user.address === ''
        || this.form.user.payment_method === ''
      ) {
        return true;
      }
      return false;
    },
  },
  created() {
    this.getCarts();
  },
};
</script>
