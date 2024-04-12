<template>
  <div>
    <px-assets-table />
  </div>
</template>

<script>
import api from '@/api'
import PxAssetsTable from '@/components/PxAssetsTable'

export default {
  name: 'HomePage',
  components: { PxAssetsTable },
}
</script>
