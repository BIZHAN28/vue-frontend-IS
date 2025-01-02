<script setup>
import LoginForm from "@/components/LoginForm.vue";
</script>

<template>
  <div>
    <login-form/>
    <p>Нет аккаунта? <router-link to="/register">Зарегистрируйтесь здесь</router-link>.</p>
  </div>
</template>

<style scoped>

</style>