<template>
  <div class="horse">
    <div class="horse-info">
      <span class="horse-name">{{ horse.name }}</span>
      <span class="horse-condition">Condition: {{ horse.condition }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Horse",
  props: {
    horse: {
      type: Object,
      required: true,
    },
    raceLength: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.horse {
  margin: 10px 0;
  padding: 10px;
  border: 2px solid;
  border-radius: 8px;
}

.horse-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.horse-name {
  font-weight: bold;
}

.horse-condition {
  color: #666;
}
</style>
