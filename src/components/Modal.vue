<template>
    <div class='modal-container'>
        <h3>
            <slot name="header"></slot>
        </h3>
        <slot name="body"></slot>
        <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {},
  methods: {},
}
</script>

<style  scoped>
.modal-container{
    width: 500px;
    height: 100px;
    border: 1px solid black;
}
</style>