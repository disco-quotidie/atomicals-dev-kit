export const isValidOnChainImageURI = (uri: string): boolean => {
  const re = /atom\:btc\:dat\:[a-f0-9]{64}i0\/.*\.(png|jpeg|svg|jpg|gif|webp)/
  return re.test(uri)
}