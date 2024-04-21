<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <ring-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>
    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="
              asset.symbol
                ? `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
                : ''
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ dollarFilter(asset.priceUsd) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ dollarFilter(min) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ dollarFilter(max) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ dollarFilter(avg) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ parcentFilter(asset.changePercent24Hr) }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            @click="toggleConverter"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {{ fromUsd ? `USD a  ${asset.symbol}` : `${asset.symbol} a USD` }}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="convertValue"
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
              />
            </label>
          </div>

          <span class="text-xl"
            >{{ converResult }} {{ fromUsd ? asset.symbol : 'USD' }}</span
          >
        </div>
      </div>

      <line-chart
        class="my-10"
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="history.map((h) => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
      />

      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr
          v-for="m in markets"
          :key="`${m.exchangeId}-${m.priceUsd}`"
          class="border-b"
        >
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>
            {{ dollarFilter(m.priceUsd) }}
          </td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <td>
            <px-button
              :is-loading="m.isLoading || false"
              v-if="!m.url"
              @custom-click="getWebSite(m)"
            >
              <slot> Obtener Link </slot>
            </px-button>
            <a v-else class="hover:underline text-green-600" target="_blanck">
              {{ m.url }}
            </a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import PxButton from '@/components/PxButton.vue'
import api from '@/api'
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import { dollarFilter, parcentFilter } from '@/filters'

export default {
  name: 'CoinDetail',
  components: {
    RingLoader,
    PxButton,
  },
  data() {
    return {
      isLoading: false,
      asset: {},
      history: [],
      markets: [],
      fromUsd: true,
      convertValue: null,
    }
  },

  setup() {
    return {
      dollarFilter,
      parcentFilter,
    }
  },

  computed: {
    converResult() {
      if (!this.convertValue) return 0

      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd

      return result.toFixed(4)
    },
    min() {
      return Math.min(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    max() {
      return Math.max(
        ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    avg() {
      return (
        this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) /
        this.history.length
      )
    },
  },

  created() {
    this.getCoinDetail()
  },

  watch: {
    $route() {
      this.getCoinDetail()
    },
  },

  methods: {
    toggleConverter() {
      this.fromUsd = !this.fromUsd
    },
    getWebSite(exchange) {
      exchange.isLoading = true
      return api
        .getExchange(exchange.exchangeId)
        .then((res) => {
          if (res) {
            exchange.url = res.exchangeUrl
          } else {
            console.error('La respuesta de la API es undefined')
          }
        })
        .finally(() => {
          exchange.isLoading = false
        })
    },
    getCoinDetail() {
      const id = this.$route.params.id
      this.isLoading = true
      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id),
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset
          this.history = history
          this.markets = markets
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
