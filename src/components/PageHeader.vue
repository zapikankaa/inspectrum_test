<template>
<header class="page-header">
  <div class="page-header__left">
    <router-link to="/">
      <img src="../assets/back.svg" class="page-header__back-btn" />
    </router-link>
    <span class="page-header__title">{{ this.$store.state.currentPageTitle }}</span>
  </div>
  <div class="page-header__right">
    <div class="page-header__account account">
      <img v-if="this.$store.state.account.userpic" :src="this.$store.state.account.userpic" class="account__userpic" alt="">
      <div v-else class="account__userpic-placeholder">Т</div>
      <p class="account__name">{{ this.$store.state.account.name }}</p>
    </div>
    <div class="page-header__cart cart">
      <img src="../assets/cart.svg" class="cart__icon" alt="">
      <p class="cart__counter" v-if="this.$store.state.account.cart.length > 0">{{ this.$store.state.account.cart.length }}</p>
    </div>
  </div>
  
</header>
</template>
<script>
export default {
  name: 'PageHeader'
}
</script>
<style lang="scss" scoped>
.page-header {
  width: 100%;
  display: flex;
  justify-content: space-between;

  &__back-btn {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }

  &__title {
    margin-left: 16px;
    font-family: var(--font-medium);
    font-size: 16px;
    line-height: 22px;
    color: #999999;
  }

  &__right {
    display: flex;
  }
}

.account {
  display: flex;
  margin-right: 39px;

  &__userpic {
    width: 24px;
    height: 24px;
    border-radius: 50%;

    &-placeholder {
      width: 24px;
      border-radius: 50%;
      line-height: 24px;
      background-color: #128BE3;
      color: #FFFFFF;
      font-size: 16px;
      text-align: center;
      font-weight: 900;
    }
  }

  &__name {
    font-family: var(--font-medium);
    font-size: 14px;
    line-height: 24px;
    color: #353535;
    margin-left: 8px;
  }
}

.cart {
  display: flex;
  align-items: center;

&__icon {
    width: 16px;
    height: 16px;
  }

  &__counter {
    margin-left: 8px;
    width: 24px;
    height: 24px;
    color: #FFFFFF;
    font-family: var(--font-medium);
    text-align: center;
    font-size: 14px;
    line-height: 24px;
    background-color: #E31243;
    border-radius: 50%;
  }
}
</style>