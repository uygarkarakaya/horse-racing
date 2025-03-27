<template>
  <div class="program-results-section">
    <div class="tables-container">
      <div class="program-column">
        <h3>Program</h3>
        <div v-for="race in races" :key="race.id" class="race-table">
          <div class="table-header">
            {{ race.id }}ST Round - {{ race.length }}m
          </div>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Condition</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(horse, index) in race.horses" :key="horse.id">
                <td>{{ index + 1 }}</td>
                <td>{{ horse.name }}</td>
                <td>{{ horse.condition }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="results-column">
        <h3>Results</h3>
        <div
          v-for="result in raceResults"
          :key="result.raceId"
          class="race-table"
        >
          <div class="table-header">
            {{ result.raceId }}ST Round - {{ races[result.raceId - 1].length }}m
          </div>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="horse in result.results" :key="horse.id">
                <td>{{ horse.finalPosition }}</td>
                <td>{{ horse.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RaceResults",
  props: {
    races: {
      type: Array,
      required: true,
    },
    raceResults: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.program-results-section {
  width: 500px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
}

.tables-container {
  display: flex;
  gap: 10px;
}

.program-column,
.results-column {
  flex: 1;
}

.race-table {
  margin-bottom: 10px;
  background: white;
  border: 1px solid #ddd;
}

.table-header {
  background: #ffb6b6;
  padding: 5px 10px;
  font-weight: bold;
  color: black;
}
</style>
