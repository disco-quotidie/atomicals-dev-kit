const { getByTicker, checkFTTickerExistence } = require('./dist/index.js')

const test = async () => {
  const result = await getByTicker("atomasdfasdg")
  console.log(result)
}

const test_checkFTTickerExistence = async () => {
  const { success, result: exists } = await checkFTTickerExistence('infinity')
  console.log(success && exists)
}

// test_getByTicker()
test_checkFTTickerExistence()