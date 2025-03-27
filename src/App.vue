<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Header from "./components/Header.vue";
import HorseList from "./components/HorseList.vue";
import RaceTrack from "./components/RaceTrack.vue";
import RaceResults from "./components/RaceResults.vue";

export default {
  name: "App",
  components: {
    Header,
    HorseList,
    RaceTrack,
    RaceResults,
  },
  setup() {
    const store = useStore();

    const horses = computed(() => store.state.horses);
    const races = computed(() => store.state.races);
    const isRacing = computed(() => store.state.isRacing);
    const currentRace = computed(() => store.state.currentRace);
    const raceResults = computed(() => store.state.raceResults);

    const generateProgram = () => {
      if (isRacing.value) {
        store.dispatch("pauseRace");
      }
      store.dispatch("resetGame");
      store.dispatch("generateHorses");
      store.dispatch("generateRaceSchedule");
    };

    const toggleRace = () => {
      if (!races.value.length) return;

      if (isRacing.value) {
        store.dispatch("pauseRace");
      } else if (currentRace.value) {
        store.dispatch("resumeRace");
      } else {
        const nextRace = races.value.find((race) => race.status === "pending");
        if (nextRace) {
          store.dispatch("startRace", nextRace.id);
        }
      }
    };

    const handleRaceComplete = (payload) => {
      store.dispatch("updateRaceResult", payload);
    };

    return {
      horses,
      races,
      isRacing,
      currentRace,
      raceResults,
      generateProgram,
      toggleRace,
      handleRaceComplete,
    };
  },
};
</script>

<template>
  <div class="app">
    <Header
      :is-racing="isRacing"
      @generate="generateProgram"
      @toggle-race="toggleRace"
    />

    <main class="main-content">
      <HorseList :horses="horses" />
      <RaceTrack
        :current-race="currentRace"
        :is-racing="isRacing"
        @race-complete="handleRaceComplete"
      />
      <RaceResults :races="races" :race-results="raceResults" />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow: hidden;
}

.app {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.main-content {
  display: flex;
  flex: 1;
  gap: 20px;
  min-height: 0;
  color: black;
  width: 100%;
  justify-content: center;
}
</style>
