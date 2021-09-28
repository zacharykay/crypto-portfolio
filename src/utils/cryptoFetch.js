import CoinGecko from 'coingecko-api';
import axios from 'axios';

// Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

const queryOptions = {
    include_market_cap: true,
    include_24hr_vol: true,
    include_24hr_change: true,
    include_last_updated_at: true
}

const optionsString = Object.keys(queryOptions).map((option) => {
    return option + '=' + queryOptions[option]
}).join('&');


export const fetchTickerData = async (baseCurrency, currencies) => {
    try {
        const currencyString = currencies.map((currency) => {
            return currency
        }).join('%2C');

        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${currencyString}&vs_currencies=${baseCurrency}&${optionsString}`;

        const response = await axios.get(url, {accept: 'application/json'})
        const cryptos = response.data;

        console.log('CRYPTOS', cryptos)
    }
    catch (err) {
        console.log('TICKER ERROR', err)
    }
}

export const fetchGlobalCryptoData = async () => {
    try {
        const data = await CoinGeckoClient.global()

        console.log('GLOBAL_DATA', data);
    } catch (err) {
        console.log('GLOBAL ERROR', err)
    }
}