<script setup>
import apiClient from "@/api/axios.ts";
function formatDateToZonedDateTime(date) {
  if (!date) return null;
  const isoDate = new Date(date).toISOString();
  return isoDate.slice(0, -5) + "Z";
}
const data = {
  name: "",
  coordinates: {
    x: "",
    y: ""
  },
  area: "",
  population: "",
  establishmentDate: "",
  capital: "",
  metersAboveSeaLevel: "",
  climate: "",
  government: "",
  standardOfLiving: "",
  governor: {
    name: ""
  }
}
async function addCity() {
  try {
    data.establishmentDate = formatDateToZonedDateTime(data.establishmentDate);
    const response = await apiClient.post('cities', data);
  } catch (error) {
    this.errorMessage = error.response?.data?.message || 'Ошибка входа';
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="addCity">
      <div>
        <label>City Name:</label>
        <br>
        <input v-model="data.name" required>
      </div>
      <div>
        <label>Coordinates: </label>
        <br>
        x:
        <input v-model="data.coordinates.x" type="number">
        y:
        <input v-model="data.coordinates.y" type="number">
      </div>
      <div>
        <label>Area: </label>
        <br>
        <input v-model="data.area" type="number">
      </div>
      <div>
        <label>Population: </label>
        <br>
        <input v-model="data.population" type="number">
      </div>
      <div>
        <label>establishmentDate: </label>
        <br>
        <input v-model="data.establishmentDate" type="date">
      </div>
      <div>
        <label>Capital: </label>
        <br>
        <input v-model="data.capital" type="checkbox">
      </div>
      <div>
        <label>metersAboveSeaLevel: </label>
        <br>
        <input v-model="data.metersAboveSeaLevel" type="number">
      </div>
      <div>
        <label>climate: </label>
        <br>
        <select v-model="data.climate">
          <option>MONSOON</option>
          <option>TROPICAL_SAVANNA</option>
          <option>HUMIDCONTINENTAL</option>
          <option>SUBARCTIC</option>
          <option>DESERT</option>
        </select>
      </div>
      <div>
        <label>government: </label>
        <br>
        <select v-model="data.government">
          <option>GERONTOCRACY</option>
          <option>NOOCRACY</option>
          <option>THEOCRACY</option>
          <option>JUNTA</option>
          <option>ETHNOCRACY</option>
        </select>
      </div>
      <div>
        <label>standardOfLiving: </label>
        <br>
        <select v-model="data.standardOfLiving">
          <option>ULTRA_HIGH</option>
          <option>MEDIUM</option>
          <option>VERY_LOW</option>
        </select>
      </div>
      <div>
        <label>governor: </label>
        <br>
        <input v-model="data.governor.name">
      </div>
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<style scoped>

</style>