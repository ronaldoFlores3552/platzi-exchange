<template>
  <div>
    <ring-loader :loading="isLoading" :color="'#68d391'" :size="100" />

    <px-assets-table v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
import api from '@/api'
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import PxAssetsTable from '@/components/PxAssetsTable'

export default {
  name: 'HomePage',
  components: { PxAssetsTable, RingLoader },
  data() {
    return {
      isLoading: false,
      assets: [],
    }
  },
  created() {
    this.isLoading = true
    api
      .getAssets()
      .then((assets) => {
        this.assets = assets
      })
      .finally(() => {
        this.isLoading = false
      })
  },
}
</script>
