<template>
  <div>
    Calculate distance:
    <form @submit.prevent="calc">
      <div>
        <label>first city id:</label>
        <input type="number" v-model="firstId" required>
      </div>
      <div>
        <label>second city id:</label>
        <input type="number" v-model="secondId" required>
      </div>
      <button type="submit">calc</button>
    </form>
    result: {{result}}
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>
<script>
import apiClient from '@/api/axios';

export default {
  data() {
    return {
      firstId: '',
      secondId: '',
      result: '',
      errorMessage: '',
    };
  },
  methods: {
    async calc() {
      try {
        const response = await apiClient.get('cities/distance-between?cityId1=' + this.firstId + '&cityId2=' + this.secondId);
        this.result = response.data;
      } catch (error) {
        this.errorMessage = error.response?.data;
      }
    },
  },
};
</script>
<style scoped>

</style>