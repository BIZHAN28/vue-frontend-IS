<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>approve</th>
        <th>deny</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in cityData">
        <td v-for="data in row">{{data}}</td>
        <td>
          <button @click="approveAdmin(row.id)">approve</button>
        </td>
        <td>
          <button @click="denyAdmin(row.id)">deny</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import apiClient from "@/api/axios.ts";

const cityData = ref('');
onMounted(async () => {
  await loadRequests();
})
async function loadRequests() {
  try {
    const response = await apiClient.get("/admin/registration-requests", {
      page: 0,
      size: 1000,
    });
    cityData.value = response.data.content;
    console.log(cityData.value)
  } catch (error) {
    console.error(error);
  }
}
async function approveAdmin(id) {
  try {
    const response = await apiClient.put("/admin/registration-requests/" + id);
    await loadRequests();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
async function denyAdmin(id) {
  try {
    const response = await apiClient.delete("/admin/registration-requests/" + id);
    await loadRequests();
    return true;
  } catch (error) {
    console.error(error);
    return false;
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