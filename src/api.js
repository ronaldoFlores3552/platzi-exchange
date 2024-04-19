const url = 'https://api.coincap.io/v2'

function getAssets() {
  return fetch(`${url}/assets?limit=20`)
    .then((res) => res.json())
    .then((res) => res.data)
}

function getAsset(CoinDetail) {
  return fetch(`${url}/assets/${CoinDetail}`)
    .then((res) => res.json())
    .then((res) => res.data)
}

function getAssetHistory(CoinDetail) {
  const now = new Date()
  const end = now.getTime()
  now.setDate(now.getDate() - 1)
  const start = now.getTime()

  return fetch(
    `${url}/assets/${CoinDetail}/history?interval=h1&start=${start}&end=${end}`
  )
    .then((res) => res.json())
    .then((res) => res.data)
}
export default {
  getAssets,
  getAsset,
  getAssetHistory,
}
