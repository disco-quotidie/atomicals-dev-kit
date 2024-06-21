import { getByTicker } from "./get-by-ticker"

export const checkFTTickerExistence = async (ticker: string) => {
  if (!ticker)
    return {
      success: false,
      result: "Parameter ticker is not valid"
    }
  
  const { success, result } = await getByTicker(ticker)
  
  if (!success || !result)
    return {
      success: false,
      result: "Unknown error while get-by-ticker"
    }
  
  const { atomical_id, status, type } = result
  if (atomical_id && type === "ticker") {
    return {
      success: true,
      result: true
    }
  }

  return {
    success: true,
    result: false
  }
}