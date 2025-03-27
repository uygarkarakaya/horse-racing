import { createStore } from "vuex";

export default createStore({
  state: {
    horses: [],
    races: [],
    currentRace: null,
    raceResults: [],
    isRacing: false,
    raceLengths: [1200, 1400, 1600, 1800, 2000, 2200],
    availableHorses: 20,
  },
  mutations: {
    generateHorses(state) {
      const colors = [
        /* I get help from AI in this function for color palette */
        "#FF0000",
        "#0000FF",
        "#FFFF00",
        "#008000",
        "#800080",
        "#FFA500",
        "#FF69B4",
        "#4B0082",
        "#008080",
        "#800000",
        "#FFD700",
        "#32CD32",
        "#FF4500",
        "#9370DB",
        "#20B2AA",
        "#FF1493",
        "#4682B4",
        "#8B4513",
        "#483D8B",
        "#2F4F4F",
      ];
      /* I get help from AI in this function for horse names */
      const names = [
        "Ace",
        "Bolt",
        "Comet",
        "Dash",
        "Echo",
        "Flash",
        "Glory",
        "Hero",
        "Iron",
        "Jet",
        "King",
        "Luna",
        "Magic",
        "Nova",
        "Orbit",
        "Pulse",
        "Quest",
        "Rush",
        "Storm",
        "Thunder",
      ];

      state.horses = Array.from(
        { length: state.availableHorses },
        (_, index) => ({
          id: index + 1,
          name: names[index],
          color: colors[index],
          condition: Math.floor(Math.random() * 100) + 1,
          position: 0,
        })
      );
    },
    generateRaceSchedule(state) {
      state.races = state.raceLengths.map((length, index) => ({
        id: index + 1,
        length,
        horses: this.getters.getRandomHorses,
        status: "pending",
      }));
      state.raceResults = [];
      state.currentRace = null;
    },
    startRace(state, raceId) {
      const race = state.races.find((race) => race.id === raceId);
      if (race) {
        state.currentRace = {
          ...race,
          horses: race.horses.map((horse) => ({
            ...horse,
            position: 0,
            currentPosition: 0,
          })),
        };
        state.isRacing = true;
      }
    },
    pauseRace(state) {
      state.isRacing = false;
    },
    resumeRace(state) {
      if (state.currentRace) {
        state.isRacing = true;
      }
    },
    /* I get help from AI in this function for race result */
    updateRaceResult(state, { raceId, results }) {
      const raceIndex = state.races.findIndex((race) => race.id === raceId);
      if (raceIndex !== -1) {
        state.races[raceIndex].status = "completed";

        state.raceResults.push({
          raceId,
          results: results.map((horse) => ({
            ...horse,
            position: horse.finalPosition,
          })),
        });

        state.currentRace = null;
        state.isRacing = false;

        const nextRace = state.races.find((race) => race.status === "pending");
        if (nextRace) {
          setTimeout(() => {
            state.currentRace = {
              ...nextRace,
              horses: nextRace.horses.map((horse) => ({
                ...horse,
                position: 0,
                currentPosition: 0,
              })),
            };
            state.isRacing = true;
          }, 2000);
        }
      }
    },
    updateHorsePositions(state, { raceId, positions }) {
      if (state.currentRace && state.currentRace.id === raceId) {
        state.currentRace.horses.forEach((horse, index) => {
          horse.currentPosition = positions[index];
        });
      }
    },
    resetGame(state) {
      state.horses = [];
      state.races = [];
      state.currentRace = null;
      state.raceResults = [];
      state.isRacing = false;
    },
  },
  getters: {
    getRandomHorses: (state) => {
      const horses = [...state.horses];
      const selected = [];

      for (let i = 0; i < 10; i++) {
        const index = Math.floor(Math.random() * 20);
        selected.push(horses[index]);
        horses.splice(index, 1);
      }

      return selected;
    },
    getCurrentRace: (state) => state.currentRace,
    getRaceResults: (state) => state.raceResults,
    isRacing: (state) => state.isRacing,
  },
  actions: {
    generateHorses({ commit }) {
      commit("generateHorses");
    },
    generateRaceSchedule({ commit }) {
      commit("generateRaceSchedule");
    },
    startRace({ commit }, raceId) {
      commit("startRace", raceId);
    },
    pauseRace({ commit }) {
      commit("pauseRace");
    },
    resumeRace({ commit }) {
      commit("resumeRace");
    },
    updateRaceResult({ commit }, payload) {
      commit("updateRaceResult", payload);
    },
    updateHorsePositions({ commit }, payload) {
      commit("updateHorsePositions", payload);
    },
    resetGame({ commit }) {
      commit("resetGame");
    },
  },
});
