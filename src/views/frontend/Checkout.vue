<template>
   <section class="container my-5 py-5 bg">
        <h2 class="text-center">填寫資料</h2>
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <Form @submit="createOrder" v-slot="{errors}">
              <div class="card">
                <div class="card-header">顧客資料</div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-6 mb-3">
                      <label for="name" class="form-label">聯絡人姓名</label>
                      <span class="text-danger">*</span>
                      <Field
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="請輸入姓名"
                        name="姓名"
                        :class="{'is-invalid':errors['姓名']}"
                        rules="required"
                        v-model="form.user.name"
                        ref="name"
                      ></Field>
                      <ErrorMessage
                        name="姓名"
                        class="invalid-feedback"
                      ></ErrorMessage>
                    </div>
                    <div class="col-lg-6 mb-3">
                      <label for="tel" class="form-label">電話</label>
                      <span class="text-danger">*</span>
                      <Field
                        id="tel"
                        name="tel"
                        type="tel"
                        class="form-control"
                        :class="{ 'is-invalid': errors['tel'] }"
                        placeholder="請輸入手機或家用電話"
                        :rules="isPhone"
                        v-model="form.user.tel"
                      ></Field>
                      <ErrorMessage
                        name="tel"
                        class="invalid-feedback"
                      ></ErrorMessage>
                    </div>
                    <div class="col-12 mb-3">
                      <label for="email" class="form-label">Email</label>
                      <span class="text-danger">*</span>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        class="form-control"
                        :class="{ 'is-invalid': errors['email'] }"
                        placeholder="請輸入Email"
                        rules="email|required"
                        v-model="form.user.email"
                      ></Field>
                      <ErrorMessage
                        name="email"
                        class="invalid-feedback"
                      ></ErrorMessage>
                    </div>

                    <div class="col-12 mb-3">
                      <label for="address" class="form-label">聯絡人地址</label>
                      <span class="text-danger">*</span>
                      <Field
                        id="address"
                        name="地址"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': errors['地址'] }"
                        placeholder="請輸入地址"
                        rules="required"
                        v-model="form.user.address"
                      ></Field>
                      <ErrorMessage
                        name="地址"
                        class="invalid-feedback"
                      ></ErrorMessage>
                    </div>
                    <div class="col-12 mb-3">
                      <label for="payment" class="form-label">付款方式</label>
                      <span class="text-danger">*</span>
                      <Field
                        class="form-select"
                        aria-label="Default select example"
                        id="payment"
                        v-model="payment_method"
                        name="付款方式"
                        :class="{ 'is-invalid': errors['付款方式'] }"
                        rules="required"
                        as="select"
                      >
                        <option disabled value="">請選擇付款方式</option>
                        <option
                          :value="item"
                          v-for="(item,i) in payment"
                          :key="i"
                        >
                          {{item}}
                        </option>
                      </Field>
                      <ErrorMessage
                        name="付款方式"
                        class="invalid-feedback"
                      ></ErrorMessage>
                    </div>
                    <div class="col-12 mb-3">
                      <label for="message" class="form-label">備註</label>
                      <div class="form-floating">
                        <textarea
                          class="form-control"
                          id="message"
                          style="height: 100px"
                          v-model="form.message"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <span class="text-danger">*為必填欄位</span>
                </div>

              </div>

              <div
                class="d-flex justify-content-between mt-3 align-items-center"
              >
                <a
                  href="index.html"
                  class="text-decoration-none btn btn-primary"
                >
                  回到上一頁</a
                >
                <button class="btn btn-primary" type="submit" :class="{'disabled':checkForm }">
                    確認送出</button>
              </div>
            </Form>
          </div>
        </div>
      </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      payment_method: '',
      payment: [
        'WebATM',
        'ATM',
        'CVS',
        'Barcode',
        'Credit',
        'ApplePay',
        'GooglePay',
      ],
    };
  },
  computed: {
    checkForm() {
      if (this.form.user.name === '' || this.form.user.email === '' || this.form.user.tel === '' || this.form.user.address === '' || this.payment_method === '') {
        return true;
      }
      return false;
    },
  },
//   mounted() {
//     this.checkForm = Object.values(this.form.user);
//     console.log(this.checkForm);
//   },
};
</script>
