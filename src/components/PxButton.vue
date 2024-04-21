<template>
  <button
    @click="buttonClick"
    class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-2 border border-green-500 hover:border-transparent rounded"
  >
    <Beatloader :loading="isLoading" :color="'#68d391'" :size="10" />
    <slot v-if="!isLoading"></slot>
  </button>
</template>

<script>
import Beatloader from 'vue-spinner/src/BeatLoader.vue'
export default {
  name: 'PxButton',
  components: {
    Beatloader,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    buttonClick() {
      this.$emit('custom-click')
    },
  },
}
</script>
