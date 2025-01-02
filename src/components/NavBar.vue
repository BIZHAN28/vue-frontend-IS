<script setup>
import {token, setToken} from "@/auth";

function signOut() {
  setToken(null);
}
</script>

<template>
  <div>
    <div v-if="!token">
      <router-link to="/register">Зарегистрироваться</router-link>
      <router-link to="/login">Войти</router-link>
    </div>
    <div v-else>
      <router-link to="/cities">
        Города
      </router-link>
      <router-link to="/requests">
        Заявки админа
      </router-link>
      <router-link to="/add-city">
        Добавить город
      </router-link>
      <router-link @click="signOut" to="/login">
        Выйти
      </router-link>

    </div>
  </div>
</template>

<style scoped>
/* Ваши стили */
</style>
