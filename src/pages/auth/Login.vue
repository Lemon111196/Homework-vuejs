<template>
  <div class='login-container'>
      <b-card>
        <h2>Login</h2>
        <div class="login-form">
          <ValidationObserver tag="form" ref="loginForm">
            <ValidationProvider rules="required|email" #default="{ errors }" name="tên đăng nhập">
              <b-form-group label="Username">
                <b-form-input v-model="formData.username"></b-form-input>
                <small class="error">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider rules="required" #default="{ errors }" name="mật khẩu">
              <b-form-group label="Password" v-model="formData.password">
                <b-form-input v-model="formData.password" type="password"></b-form-input>
                <small class="error">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>
            </ValidationObserver>
            <div class="btn">
              <b-button variant="secondary">Cancel</b-button>
              <b-button variant="success" @click="validateLogin">Sign in</b-button>
            </div>
            <div class="go-sign-up">
              <router-link to="/auth/register" class="text-primary">
                Sign up
              </router-link>
            </div>
        </div>
      </b-card>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required, confirmed, email } from "@validations";
import apiService from "@/service/apiService";
export default {
  name: 'LoginVue',
  props: {},
  components: {
    ValidationObserver, ValidationProvider,
  },
  data() {
    return {
      formData: {
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
      },
      required,
      confirmed,
      email,
    }
  },
  methods: {
    async validateLogin() {
      const valid = await this.$refs["loginForm"].validate();
      console.log(valid);
      if (valid) {
        this.login();
      }
    },
    async login() {
      console.log(this.formData);
      try {
        const response = await apiService.post("/auth/login", this.formData)
        console.log(response);
        this.$toast.success(response.data.message);
        localStorage.setItem('token', response.data.accessToken);
        this.$router.push({ name: "note-list" });
      } catch (error) {
        // this.$toast.error(error);
        console.log(error);
        // this.$toast.error(error.message);
      }
    },
  }
}
</script>

<style lang='scss' scoped>
.login-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 500px;
}

.btn {
  display: flex;
  justify-content: end;
}

h2 {
  text-align: center;
}

button {
  margin: 5px;
}

.go-sign-up {
  display: flex;
  justify-content: end;
  text-decoration: underline;
  color: blue
}

@media (max-width: 768px) {
  .login-form {
    width: 300px;
  }
}
</style>