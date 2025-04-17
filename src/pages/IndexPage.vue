<template>
  <div class="index">
    <div class="login" v-if="!loggedIn">
      <q-input
        no-caps
        label="username"
        v-model="loginForm.username"
        class="input"
      />
      <q-input
        no-caps
        label="password"
        type="password"
        v-model="loginForm.password"
        class="input"
      />
      <q-btn no-caps label="login" @click="login" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { login } from "boot/apiCalls.js";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loggedIn: false,
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.loggedIn = true;
    }
  },
  methods: {
    login() {
      login(this.loginForm).then((data) => {
        if (data) {
          this.loggedIn = true;
        }
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  .login {
    .input {
      width: 300px;
    }
  }
}
</style>
