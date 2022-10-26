/**
 *
 * @param supply The supply of the collection
 * @param floorPrice The floor price of a collection
 * @param usdConversion The price of ETH
 */
 export default function calculateMarketCap(
    supply: number,
    floorPrice: number,
    multiplier: number,
    usdConversion: number,
  ) {
   let marketCap =  Number(supply) * Number(floorPrice) * multiplier * usdConversion;
  
   !marketCap
  
   let result = {
      marketCap: marketCap,
      displayMarket: '-',
   }
  
   if (!marketCap) {
    result.displayMarket = '-';
   } else if (marketCap >= 1000000000) {
      result.displayMarket = `$${(marketCap / 1000000000).toFixed(2)}B`;
   } else if (marketCap >= 1000000) {
      result.displayMarket = `$${(marketCap / 1000000).toFixed(2)}M`;
   } else {
      result.displayMarket = `$${(marketCap / 1000).toFixed(0)}K`;
   }
  
  return result; 
  }