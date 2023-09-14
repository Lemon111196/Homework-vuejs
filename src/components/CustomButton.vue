<template>
  <span class='custom-button-container' @click="$emit('click')" :class="getVariant(variant)">
    <span class="custom-btn">
      <slot></slot>
    </span>
  </span>
</template>

<script>
export default {
  name: '',
  props: {
    variant: {
      type: String,
      default: 'primary'
    },
  },
  mounted(){
    console.log(this.variant);
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    handleClick(variant) {
      switch (variant) {
        case 'success':
          return 'success'
        case 'warning':
          return 'warning'
        case 'error':
          return 'error'
        case 'primary':
          return 'primary'
        default:
          break;
      }
    }
  }
}
</script>

<style scoped>
  .custom-button-container {
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 1px black;
    color: white;
  }
  .primary{
    background-color: gray;
  }
  .waring{
    background-color: orange;
  }
  .error{
    background-color: crimson;
  }
  .success{
    background-color: rgb(29, 218, 29);
  }
</style>