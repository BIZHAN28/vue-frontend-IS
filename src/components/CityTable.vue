<template>
  <div>
    <form @submit.prevent="filterByGovernorName">
      Filter by governor name:
      <input v-model="governorName">
      <button type="submit">Filter</button>
    </form>
    <form @submit.prevent="loadCities">
      CancelFilter:
      <button type="submit">cancel</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>coordinates</th>
          <th>area</th>
          <th>population</th>
          <th>establishmentDate</th>
          <th>capital</th>
          <th>metersAboveSeaLevel</th>
          <th>climate</th>
          <th>government</th>
          <th>standardOfLiving</th>
          <th>governor</th>
          <th>owner</th>
          <th>creationDate</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in cityData">
          <td v-for="data in row">{{data}}</td>
          <td>
            <button v-if="user === row.owner.username" @click="deleteCity(row.id)">delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <br>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import apiClient from "@/api/axios.ts";

const user = localStorage.getItem('username');
const cityData = ref('');
const governorName = ref('');

onMounted(async () => {
  await loadCities();
})

async function loadCities() {
  try {
    const response = await apiClient.get("/cities", {
      page: 0,
      size: 1000,
    });
    cityData.value = response.data.content;
    console.log(cityData.value)
  } catch (error) {
    console.error(error);
  }
}
async function deleteCity(id) {
  try {
    const response = await apiClient.delete("/cities/" + id);
    await loadCities();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
async function filterByGovernorName() {
  try {
    const response = await apiClient.get("cities/governor-name-less-than?governorName=" + governorName.value);
    cityData.value = response.data;
    console.log(cityData.value)
  } catch (error) {
    console.error(error);
  }
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

</style>