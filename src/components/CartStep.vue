<template>
  <div class="container mb-5">
    <div class="row position-relative">
      <div class="col">
        <div class="cart-step" :class="{ 'cart-done': done === 'Carts' || step2 || step3 }">
          <span class="material-icons-outlined align-middle fs-3">
            shopping_bag
          </span>
        </div>
        <p class="cart-text">確認購物車</p>
      </div>
      <div class="col">
        <div class="cart-step" :class="{ 'cart-done': done === 'Checkout' || step3 }">
          <span class="material-icons-outlined align-middle fs-3">
            list_alt
          </span>
        </div>
        <p class="cart-text">填寫資料</p>
      </div>
      <div class="col">
        <div class="cart-step" :class="{ 'cart-done': done === 'Payment' }">
          <span class="material-icons-outlined align-middle fs-3">
            local_atm
          </span>
        </div>
        <p class="cart-text">確認訂單</p>
      </div>
      <div class="cart-line">
        <div :class="{ 'cart-line-step2': step2, 'cart-line-step3': step3 }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    done: {
      type: String,
    },
  },
  computed: {
    step2() {
      return this.done === 'Checkout';
    },
    step3() {
      return this.done === 'Payment';
    },
  },
};
</script>
