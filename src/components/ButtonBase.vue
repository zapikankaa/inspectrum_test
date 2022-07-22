<template>
  <div class="button" :class="{
                      'button__red': btnStyle === 'red',
                      'button__red-ghost': btnStyle === 'red-ghost',
                      'button__blue': btnStyle === 'blue' 
                      }">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ButtonBase',
  props: {
    btnStyle: { // red, red-ghost, blue
      type: String,
      default: 'red'
    }
  }
}
</script>
<style lang="scss" scoped>
.button {
  font-family: var(--font-medium);
  font-size: 14px;
  line-height: 24px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  display: flex;

  &__red {
    color: #FFFFFF;
    background-color: #E31243;

    &-ghost {
      color: #E31243;
      background-color: transparent;
      border: 1px solid #E31243;
    }
  }

  &__blue {
    color: #FFFFFF;
    background-color: #128BE3;
  }

  &:hover {
    box-shadow: 0 3px 7px #999999;
  }
}
</style>