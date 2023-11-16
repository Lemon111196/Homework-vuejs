<template>
  <div class='navbar-container'>
    <div class="navbar-menu">
      <img width="30px" height="20px" :src="logo" alt="logo">
      <router-link to="/note/list">Note</router-link>
      <router-link to="/linkcard/link-card">Link card</router-link>
    </div>
    <div class="user-info">
      <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret right>
        <template #button-content>
          <b-avatar variant="primary" text="Oh" class="mr-3"></b-avatar>
        </template>
        <b-dropdown-item>Profile</b-dropdown-item>
        <b-dropdown-item @click="logout">Log out</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/logo.jpg'
export default {
  name: 'NavbarVue',
  props: {},
  components: {},
  data() {
    return {
      logo
    }
  },
  mounted() {
    console.log(this.$store.state.auth.isAuthenticated);
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'login' })
    }
  },
}
</script>

<style lang='scss' scoped>
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(83, 81, 81);
  padding: 17px;
}

.nav-menu {
  display: flex;
  gap: 15px;
  align-items: center;
}
</style>