<template>
  <h1 @click="onClick">
    {{ message }}
  </h1>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

export default Component({})(
  class App extends Vue {
    message = "Карина";
    onClick() {
      this.message = "жопка";
    }
  }
);
</script>
