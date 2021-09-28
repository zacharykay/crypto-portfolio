const tickerQueryOptions = {
    include_market_cap: true,
    include_24hr_vol: true,
    include_24hr_change: true,
    include_last_updated_at: true
}

const tickerOptionsString = Object.keys(tickerQueryOptions).map((option) => {
    return option + '=' + tickerQueryOptions[option]
}).join('&');

export const tickerRequestUrl = (baseCurrency, currenciesString) => {
    return `https://api.coingecko.com/api/v3/simple/price?ids=${currenciesString}&vs_currencies=${baseCurrency}&${tickerOptionsString}`
}