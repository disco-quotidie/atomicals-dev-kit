import { isValidBitworkMinimum } from "../utils/is-valid-bitwork"
import { isValidOnChainImageURI } from "../utils/is-valid-onchain-image-uri"

export const request4InitFixedDft = async ({
  ticker,
  name,
  description,
  legal_terms,
  onchain_image_uri,
  max_mint,
  mint_amount,
  bitworkc,
  bitworkr,
  satsbyte
}: {
  ticker: string,
  name: string,
  description: string,
  legal_terms: string,
  onchain_image_uri: string,
  max_mint: number,
  mint_amount: number,
  bitworkc: string,
  bitworkr: string,
  satsbyte: number
}) => {
  const isValidBitwork = isValidBitworkMinimum(bitworkc)
  if (!isValidBitwork)
    return {
      success: false,
      result: "Invalid bitwork submitted"
    }
  
  if (max_mint > 10000000 || max_mint < 10000) {
    return {
      success: false,
      result: "Expect max mint to be between 10,000 and 10,000,000"
    }
  }
    
  if (mint_amount > 100000000 || mint_amount < 546) {
    return {
      success: false,
      result: "Expect mint amount to be between 546 and 100,000,000"
    }
  }

  if (!isValidOnChainImageURI(onchain_image_uri))
    return {
      success: false,
      result: "Not a valid on-chain image URI"
    }
}