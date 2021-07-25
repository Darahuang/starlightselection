<template>
  <section class="container py-5 ">
    <div class="row justify-content-center">
      <div class="col-md-10">
         <div class="row align-items-center">
           <div class="col-md-6">
              <h3 class="fw-bold">成立</h3>
              <p class="lh-base">
                WorldTrip，成立的初衷是希望以讓大家能透過旅行感受到幸福和滿足感,根據顧客的需求
                來規劃出各種多樣化的旅遊路線，嚴選國外的當地特色行程，精準而完整地呈現出不同國家的文化背景。
              </p>
              <h3 class="fw-bold">理念</h3>
              <p class="lh-base">
                「以顧客需求為出發，勇於創新並開發多元的旅遊路線」-這是從成立就不變的宗旨，來打造出令顧客滿意的旅遊產品。為了讓旅遊更加精緻豐富，近年來也推出各式各樣的「主題旅遊」，
                讓顧客們能夠根據自己的興趣來找到喜愛的旅遊方式。
              </p>
           </div>
           <div class="col-md-6">
             <div class="row">
               <div class="col-md-6 col-6">
                    <div
              class="bg-cover about-height"
              style="background-image:url(https://images.pexels.com/photos/3810792/pexels-photo-3810792.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)"
            >
            </div>
               </div>
               <div class="col-md-6 col-6 mt-md-6">
                 <div
              class="bg-cover about-height"
              style="background-image:url(https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)"
            >
            </div>
               </div>
             </div>
           </div>
         </div>
      </div>
    </div>
  </section>
  <section class="container-fluid mt-6 info-bg bg-cover">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col-md-8">
        <h3 class="text-center fw-bold">獲得優惠及最新消息</h3>
        <Form v-slot="{ errors }" @submit="subscribe" class="text-center">
          <Field
            id="subscribe-email"
            name="email"
            type="email"
            class="form-control d-inline w-50 me-3 "
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入您的Email"
            rules="email|required"
            v-model="email"
          ></Field>
          <button class="btn btn-slide-right mb-2 border-0" type="submit">確認送出</button>
          <ErrorMessage name="email" class="invalid-feedback fw-bold"></ErrorMessage>
        </Form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    };
  },
  inject: ['Toast'],
  methods: {
    subscribe() {
      this.Toast.fire({
        icon: 'success',
        title: '訂閱成功',
      });
    },
  },
};
</script>
