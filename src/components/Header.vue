<template>
  <header class="header">
    <h1>Horse Racing Game</h1>
    <div class="buttons">
      <button @click="$emit('generate')" :disabled="isRacing">
        GENERATE PROGRAM
      </button>
      <button @click="$emit('toggle-race')">
        {{ isRacing ? "PAUSE" : "START" }}
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    isRacing: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.header {
  background: #ffb6b6;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
  font-size: 24px;
}

.buttons {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  color: black;
}

button:hover {
  background: #f5f5f5;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
