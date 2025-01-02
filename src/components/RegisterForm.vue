<template>
  <div class="register">
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <div>
        <label for="username">Имя:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <div>
        <label for="admin-request">Хочу стать админом</label>
        <input type="checkbox" v-model="adminRequest" id="admin-request">/>
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import apiClient from '@/api/axios';
import {setToken} from "@/auth.ts";

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      successMessage: '',
      adminRequest: false,
    };
  },
  methods: {
    async register() {
      try {
        if (this.adminRequest){
          const response = await apiClient.post('auth/register-admin', {
            username: this.username,
            password: this.password,
          });
          localStorage.setItem('username', this.username);
          setToken(response.data.accessToken);
          this.$router.push('/');
        } else {
          const response = await apiClient.post('auth/register', {
            username: this.username,
            password: this.password,
          });
          setToken(response.data.accessToken);
          localStorage.setItem('username', this.username);
          this.$router.push('/');
        }
      } catch (error) {
        this.errorMessage = error.response?.data;
      }
    },
  },
};
</script>

<style>
.error {
  color: red;
}
.success {
  color: green;
}
</style>