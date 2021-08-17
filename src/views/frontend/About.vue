<template>
  <section class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="row align-items-center">
          <div class="col-md-6" data-aos="fade-right">
            <h3 class="fw-bold mb-3">成立</h3>
            <p class="lh-base">
              WorldTrip，成立的初衷是希望以讓大家能透過旅行感受到幸福和滿足感，根據顧客的需求來規劃出
              各種多樣化的旅遊路線，嚴選國外的當地特色行程，精準而完整地呈現出不同國家的文化背景。
            </p>
            <h3 class="fw-bold mb-3">理念</h3>
            <p class="lh-base">
              「以顧客需求為出發，勇於創新並開發多元的旅遊路線」-這是從成立就不變的宗旨，來打造出令顧客滿意的旅遊產品。為了讓旅遊更加精緻豐富，近年來也推出各式各樣的「主題旅遊」，
              讓顧客們能夠根據自己的興趣來找到喜愛的旅遊方式。
            </p>
          </div>
          <div class="col-md-6" data-aos="fade-left">
            <div class="row">
              <div class="col-md-6 col-6">
                <div class="bg-cover about-height about-bg"></div>
              </div>
              <div class="col-md-6 col-6 mt-md-6">
                <div class="bg-cover about-height about-bg2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container mt-6" data-aos="fade-down">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <h3 class="fw-bold mb-3">經營指針</h3>
        <ul class="row list-unstyled">
          <li class="col-md-3 col-6">
            <div class="feature text-center bg-white">
              <div class="feature-icon">
                <span class="material-icons-outlined">
                  public
                </span>
              </div>
              <div class="feature-text">
                <h3 class="text-primary h4">嚴選的行程</h3>
                <p>為您把關行程品質</p>
              </div>
            </div>
          </li>
          <li class="col-md-3 col-6">
            <div class="feature text-center">
              <div class="feature-icon">
                <span class="material-icons-outlined">
                  airplane_ticket
                </span>
              </div>
              <div class="feature-text">
                <h3 class="text-primary h4">多樣化的選擇</h3>
                <p>滿足顧客的需求</p>
              </div>
            </div>
          </li>
          <li class="col-md-3 col-6">
            <div class="feature text-center">
              <div class="feature-icon">
                <span class="material-icons-outlined">
                  volunteer_activism
                </span>
              </div>
              <div class="feature-text">
                <h3 class="text-primary h4">核心價值</h3>
                <p>誠實、負責</p>
              </div>
            </div>
          </li>
          <li class="col-md-3 col-6">
            <div class="feature text-center">
              <div class="feature-icon">
                <span class="material-icons-outlined">
                  outlined_flag
                </span>
              </div>
              <div class="feature-text">
                <h3 class="text-primary h4">未來願景</h3>
                <p>打造全方位旅遊服務平台</p>
              </div>
            </div>
          </li>
        </ul>
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
            class="form-control d-inline w-50 me-3"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入您的Email"
            rules="email|required"
            v-model="email"
          />
          <button class="btn btn-slide-right mb-2 border-0" type="submit">確認送出</button>
          <ErrorMessage name="email" class="invalid-feedback fw-bold" />
        </Form>
      </div>
    </div>
  </section>
</template>

<script>
import goTop from '@/methods/goTop';

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
  created() {
    goTop();
  },
};
</script>
