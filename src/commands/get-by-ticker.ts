const { callElectrumx } = require('../utils/call-electrumx')

export const getByTicker = async (ticker: string) => {
  const response = await callElectrumx("blockchain.atomicals.get_by_ticker", [ticker])
  if (!response)
    return {
      success: false,
      result: "Error while proxy call"
    }
  return {
    success: true,
    result: response.result
  }
}