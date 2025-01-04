<script setup>
import { defineProps, ref, watch, reactive } from 'vue';
import apiClient from "@/api/axios.ts";

const props = defineProps({
  show: Boolean,
  data: {
    type: Object,
    default: () => ({
      id: "",
      name: "",
      coordinates: {
        x: 0,
        y: 0,
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
    })
  }
});

function closeDialog() {
  emit('update:show', false);
}

const emit = defineEmits(['update:show']);
const dialogRef = ref(null);

watch(
    () => props.show,
    (newShow) => {
      if (newShow) {
        dialogRef.value?.showModal();
      } else {
        dialogRef.value?.close();
      }
    }
);

async function update() {
  try {
    dialogRef.value?.close();
    const { id, owner, creationDate, ...dataWithoutId } = props.data;
    dataWithoutId.establishmentDate = formatDateToZonedDateTime(dataWithoutId.establishmentDate);
    const response = await apiClient.put('cities/' + props.data.id, dataWithoutId);
  } catch (error) {
    this.errorMessage = error.response?.data?.message || 'Ошибка входа';
  }
}
function formatDateToZonedDateTime(date) {
  if (!date) return null;
  const isoDate = new Date(date).toISOString();
  return isoDate.slice(0, -5) + "Z";
}
</script>

<template>
  <dialog ref="dialogRef" @close="closeDialog">
    <form @submit.prevent="update" >
      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>X Coordinate</th>
          <th>Y Coordinate</th>
          <th>Area</th>
          <th>Population</th>
          <th>Establishment Date</th>
          <th>Capital</th>
          <th>Meters Above Sea Level</th>
          <th>Climate</th>
          <th>Government</th>
          <th>Standard Of Living</th>
          <th>Governor</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{ props.data.id }}</td>
          <td><input v-model="props.data.name" /></td>
          <td><input v-if="props.data.coordinates" v-model="props.data.coordinates.x" type="number" /></td>
          <td><input v-if="props.data.coordinates"  v-model="props.data.coordinates.y" type="number" /></td>
          <td><input v-model="props.data.area" type="number" /></td>
          <td><input v-model="props.data.population" type="number" /></td>
          <td><input v-model="props.data.establishmentDate" type="date" /></td>
          <td><input v-model="props.data.capital" type="checkbox" /></td>
          <td><input v-model="props.data.metersAboveSeaLevel" type="number" /></td>
          <td><input v-model="props.data.climate" /></td>
          <td><input v-model="props.data.government" /></td>
          <td><input v-model="props.data.standardOfLiving" /></td>
          <td><input v-if="props.data.governor"  v-model="props.data.governor.name" /></td>
        </tr>
        </tbody>
      </table>
      <button type="submit">update</button>
    </form>
  </dialog>
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
