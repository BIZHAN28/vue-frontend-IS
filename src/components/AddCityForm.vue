<script setup>

</script>

<template>
  <div>
    <form>
      <div>
        <label>City Name:</label>
        <br>
        <input>
      </div>
      <div>
        <label>Coordinates: </label>
        <br>
        x:
        <input type="number">
        y:
        <input type="number">
      </div>
      <div>
        <label>Area: </label>
        <br>
        <input type="number">
      </div>
      <div>
        <label>Population: </label>
        <br>
        <input type="number">
      </div>
      <div>
        <label>establishmentDate: </label>
        <br>
        <input type="date">
      </div>
      <div>
        <label>Capital: </label>
        <br>
        <input type="checkbox">
      </div>
      <div>
        <label>metersAboveSeaLevel: </label>
        <br>
        <input type="number">
      </div>
      <div>
        <label>climate: </label>
        <br>
        <select>
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
        <select>
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
        <select>
          <option>ULTRA_HIGH</option>
          <option>MEDIUM</option>
          <option>VERY_LOW</option>
        </select>
      </div>
      <div>
        <label>governor: </label>
        <br>
        <input>
      </div>
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<style scoped>

</style>