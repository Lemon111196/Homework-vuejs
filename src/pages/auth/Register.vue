<template>
  <div class='register-container'>
    <div>
      <b-card>
        <h2>Register</h2>
        <div class="register-form">
          <ValidationObserver tag="form" ref="registerForm">
            <ValidationProvider rules="required|email" #default="{ errors }" name="tên đăng nhập">
              <b-form-group label="Username">
                <b-form-input v-model="formData.username"></b-form-input>
                <small class="error">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider rules="required" #default="{ errors }" name="tên">
              <b-form-group label="Name">
                <b-form-input v-model="formData.name"></b-form-input>
                <small class="error">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider rules="required" #default="{ errors }" name="mật khẩu">
              <b-form-group label="Password" v-model="formData.password">
                <b-form-input v-model="formData.password" type="password"></b-form-input>
                <small class="error">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider rules="required|confirmed:mật khẩu" #default="{ errors }" name="xác nhận mật khẩu">
              <b-form-group label="Confirm Password" v-model="formData.password">
                <b-form-input v-model="formData.confirmPassword" type="password"></b-form-input>
                <small class="error">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>
            <div class="btn">
              <!-- <b-button variant="secondary">Cancel</b-button> -->
              <b-button variant="success" @click="validateRegister">Register</b-button>
            </div>
          </ValidationObserver>
        </div>
        <div class="login-link">
          <router-link to="/auth/login" class="text-primary">
            Sign in?
          </router-link>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required, confirmed, email } from "@validations";
import { apiService } from "@/service/apiService";
// import { alertRegister } from "@/components/alertRegister.vue"
// import ToastInterface from "vue-toastification/dist/types/src/ts/interface";
export default {
  name: 'RegisterVue',
  props: {},
  components: {
    ValidationObserver, ValidationProvider,
  },
  data() {
    return {
      required,
      confirmed,
      email,
      formData: {
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
      },
      // isSuccess: false,
    }
  },
  methods: {
    async validateRegister() {
      const valid = await this.$refs["registerForm"].validate();
      console.log(valid);
      if (valid) {
        this.register();
      }
    },
    async register() {
      console.log(this.formData);
      try {
        const response = await apiService.post("/auth/register", this.formData)
        console.log(response);
        this.$toast.success(response.data.message);
        this.$router.push({ name: "login" });
      } catch (error) {
        this.$toast.error(error.response.data.message);
        // console.log(error);
        // this.$toast.error(error.message);
      }
    },

  },
}
</script>

<style lang='scss' scoped>
.register-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

}

.register-form {
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

.login-link {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .register-form {
    width: 300px;
  }
}
</style>