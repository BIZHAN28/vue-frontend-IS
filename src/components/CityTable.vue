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
          <th>Id</th>
          <th>Name</th>
          <th>Coordinates</th>
          <th>Area</th>
          <th>Population</th>
          <th>Establishment Date</th>
          <th>Capital</th>
          <th>Meters Above Sea Level</th>
          <th>Climate</th>
          <th>Government</th>
          <th>Standard Of Living</th>
          <th>Governor</th>
          <th>Owner</th>
          <th>Creation Date</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in cityData">
          <td v-for="data in row">{{data}}</td>
          <td>
            <button v-if="user === row.owner.username" @click="deleteCity(row.id)">delete</button>
            <button v-if="user === row.owner.username" @click="editCity(row); showDialog = true">edit</button>
          </td>
        </tr>
      </tbody>
    </table>
    <br>
    <edit-window :data="editData" @update:show="showDialog = $event" :show="showDialog" />
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import apiClient from "@/api/axios.ts";
import EditWindow from "@/components/EditWindow.vue";

const user = localStorage.getItem('username');
const cityData = ref('');
const governorName = ref('');
const editData = ref('');
const showDialog = ref(false);

onMounted(async () => {
  await loadCities();
})

function editCity(row) {
  editData.value = row;
}

watch(showDialog, (newVal) => {
  if (!newVal) {
    loadCities();
  }
})
function parseZonedDateTimeToDate(zonedDateTime) {
  if (!zonedDateTime) return null;
  const normalizedDateTime = zonedDateTime.endsWith("Z")
      ? zonedDateTime.slice(0, -1)
      : zonedDateTime;
  return new Date(normalizedDateTime).toLocaleDateString();
}

async function loadCities() {
  try {
    const response = await apiClient.get("/cities", {
      page: 0,
      size: 1000,
    });
    cityData.value = response.data.content;
    for (let i = 0; i < response.data.content.length; i++) {
      cityData.value[i].establishmentDate = parseZonedDateTimeToDate(cityData.value[i].establishmentDate);
    }
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