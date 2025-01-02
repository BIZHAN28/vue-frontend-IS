<template>
  <div class="login">
    <h2>Вход</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Имя:</label>
        <input v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Войти</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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
    };
  },
  methods: {
    async login() {
      try {
        const response = await apiClient.post('auth/login', {
          username: this.username,
          password: this.password,
        });
        setToken(response.data.accessToken);
        localStorage.setItem('username', this.username);
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Ошибка входа';
      }
    },
  },
};
</script>

<style>
.error {
  color: red;
}
</style>
