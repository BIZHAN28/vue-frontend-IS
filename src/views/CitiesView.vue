<script setup>
import CityTable from "@/components/CityTable.vue";
import {onMounted, ref} from "vue";
import apiClient from "@/api/axios.ts";
import CalcDistanceForm from "@/components/CalcDistanceForm.vue";

const averageMetersAboveSeaLevel = ref('');
const distanceToCityLeastArea = ref('');
const leastGovernorData = ref('');

onMounted(async () => {
  await getAverageMetersAboveSeaLevel();
  await getDistanceToCityLeastArea();
  await getLeastGovernor();
})
async function getAverageMetersAboveSeaLevel() {
  try {
    const response = await apiClient.get("/cities/average-meters-above-sea-level");
    averageMetersAboveSeaLevel.value = response.data;
  } catch (error) {
    console.error(error);
  }
}
async function getDistanceToCityLeastArea() {
  try {
    const response = await apiClient.get("cities/distance-to-city-with-least-area");
    distanceToCityLeastArea.value = response.data;
  } catch (error) {
    console.error(error);
  }
}
async function getLeastGovernor() {
  try {
    const response = await apiClient.get("cities/least-governor");
    leastGovernorData.value = response.data;
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div>
    <city-table/>
    <div>Average meters above sea level: {{averageMetersAboveSeaLevel}}</div>
    <br>
    <div>Distance-to-city-with-least-area: {{distanceToCityLeastArea}}</div>
    <br>
    <calc-distance-form/>
    <br>
    <div>Least Governor:</div>
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
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="row in leastGovernorData">{{row}}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

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