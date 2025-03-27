<template>
  <div class="horse-list-section">
    <div class="horse-list-header">
      <h2>Horses</h2>
      <span class="count">({{ horses.length }})</span>
    </div>
    <div class="table-wrapper">
      <table class="horse-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in horses" :key="horse.id">
            <td>{{ horse.name }}</td>
            <td>{{ horse.condition }}%</td>
            <td>
              <div
                class="color-box"
                :style="{ backgroundColor: horse.color }"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorseList",
  props: {
    horses: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.horse-list-section {
  width: 300px;
  min-width: 300px;
  background-color: #fff;
  border: 1px solid #ddd;
}

.horse-list-header {
  background-color: #ffffa0;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.horse-list-header h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.count {
  color: #666;
  font-size: 14px;
}

.table-wrapper {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.horse-list-table {
  width: 100%;
  border-collapse: collapse;
}

.horse-list-table th,
.horse-list-table td {
  padding: 10px;
  border: 1px solid #f9f9f9;
  text-align: left;
}

.horse-list-table th {
  background-color: #f9f9f9;
  font-weight: 600;
}

.color-box {
  width: 20px;
  height: 20px;
  border: 1px solid #ddd;
}

tr:hover {
  background-color: #f9f9f9;
}
</style>
