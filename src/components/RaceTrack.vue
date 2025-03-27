<template>
  <div class="race-track-section">
    <div class="race-track">
      <div v-for="lane in 10" :key="lane" class="track-lane">
        <div class="lane-number">{{ lane }}</div>
        <div class="lane-track">
          <!-- I get help from AI in this dynamic styling -->
          <div
            v-if="currentRace && currentRace.horses[lane - 1]"
            class="horse-icon"
            :style="{
              left: `${
                (currentRace.horses[lane - 1].currentPosition /
                  currentRace.length) *
                100
              }%`,
            }"
          >
            <span class="horse-emoji">🐎</span>
            <span class="horse-name">{{
              currentRace.horses[lane - 1].name
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="race-info">
      <div class="race-status">
        {{
          currentRace
            ? `Round #${currentRace.id} - ${currentRace.length}m`
            : "Ready to race"
        }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onUnmounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "RaceTrack",
  props: {
    currentRace: {
      type: Object,
      default: null,
    },
    isRacing: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const currentStep = ref(0);
    let animationFrameId = null;
    let lastTimestamp = null;
    let horseProgress = [];
    let isPaused = false;

    /* I get help from AI in this function for smooth and matematically correct animation */
    const simulateRace = () => {
      if (!props.currentRace) return;

      const totalSteps = 200;
      if (!isPaused) {
        currentStep.value = 0;
        horseProgress = props.currentRace.horses.map((horse) => ({
          ...horse,
          accumulatedMovement: 0,
        }));
      }
      isPaused = false;
      lastTimestamp = null;

      const updatePositions = (timestamp) => {
        if (!lastTimestamp) {
          lastTimestamp = timestamp;
          animationFrameId = requestAnimationFrame(updatePositions);
          return;
        }

        if (!props.isRacing) {
          isPaused = true;
          return;
        }

        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        const positions = horseProgress.map((horse) => {
          const baseSpeed = (horse.condition / 100) * 0.2 + 0.3;
          const randomFactor = Math.random() * 0.2 + 0.9;
          const movement = baseSpeed * randomFactor * (deltaTime / 16.67);

          horse.accumulatedMovement += movement;

          const currentPosition = Math.min(
            props.currentRace.length,
            (horse.accumulatedMovement / totalSteps) * props.currentRace.length
          );

          return currentPosition;
        });

        store.dispatch("updateHorsePositions", {
          raceId: props.currentRace.id,
          positions,
        });

        currentStep.value++;

        const allHorsesFinished = positions.every(
          (position) => position >= props.currentRace.length
        );

        if (allHorsesFinished) {
          const sortedResults = [...horseProgress]
            .sort((a, b) => b.accumulatedMovement - a.accumulatedMovement)
            .map((horse, index) => ({
              ...horse,
              position: props.currentRace.length,
              finalPosition: index + 1,
            }));

          emit("race-complete", {
            raceId: props.currentRace.id,
            results: sortedResults,
          });

          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
          return;
        }

        animationFrameId = requestAnimationFrame(updatePositions);
      };

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    watch(
      [() => props.currentRace, () => props.isRacing],
      ([newRace, isRacing]) => {
        if (newRace && isRacing) {
          simulateRace();
        }
      }
    );

    onUnmounted(() => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });

    return {
      currentStep,
    };
  },
};
</script>

<style scoped>
.race-track-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}

.race-track {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.track-lane {
  flex: 1;
  display: flex;
  align-items: center;
  border-bottom: 1px dashed #ddd;
  min-height: 50px;
  position: relative;
  overflow: hidden;
}

.lane-number {
  width: 30px;
  background-color: #4a7c59;
  color: white;
  text-align: center;
  padding: 5px;
  font-weight: bold;
  flex-shrink: 0;
}

.lane-track {
  flex: 1;
  position: relative;
  height: 100%;
  border-right: 2px solid #ff0000;
  overflow: hidden;
}

.horse-icon {
  position: absolute;
  top: 50%;
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 4px 8px;
  border: 1px solid black;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 1;
}

.horse-emoji {
  font-size: 1.5em;
  line-height: 1;
  transform: scaleX(-1);
}

.horse-name {
  font-size: 14px;
  color: #333;
}

.race-info {
  padding: 12px;
  background: #f5f5f5;
  border-top: 1px solid #ddd;
  flex-shrink: 0;
}

.race-status {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.progress {
  height: 100%;
  background: #4a7c59;
  transition: width 0.3s ease;
}
</style>
