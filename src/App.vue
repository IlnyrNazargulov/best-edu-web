<template>
  <div>
    <input required v-model="email" type="email" placeholder="Name" />
    <p>{{ message }}</p>
    <button type="button" @click="onClick">Some action</button>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";

export default Component({})(
  class App extends Vue {
    email = "";
    message = "";
    onClick() {
      this.message = "Письмо отправлено на почтовый адрес: " + this.email;
      let createRequestCode = {
        email: this.email,
      };
      axios({
        url: "https://best-edu.tk/api/v1/accounts/request-code/",
        data: createRequestCode,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
);
</script>
