import React, { useContext, useEffect, useCallback, useReducer } from 'react';
import CoinGecko from 'coingecko-api';

import reducer from '../reducers/crypto_reducer';

import { objectifyArray } from '../utils/helperFunctions';

import {
	GET_DATA_BEGIN,
	GET_DATA_SUCCESS,
	FETCH_TICKER_DATA,
	FILTER_CRYPTOS,
	SET_REF_PRICES
} from '../utils/actions';

const CoinGeckoClient = new CoinGecko();

const CryptoContext = React.createContext();

const initialState = {
	dataLoading: false,
	baseCurrency: '',
	cryptoCurrencies: [],
	cryptoData: [],
	filteredData: [],
	priceData: {}
};

export const CryptoProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(reducer, initialState);

	const fetchCryptoData = useCallback(async () => {
		dispatch({ type: GET_DATA_BEGIN });

		try {
			const cryptoResponse = await CoinGeckoClient.coins.markets();

			dispatch({ type: FETCH_TICKER_DATA, payload: cryptoResponse.data });
			dispatch({ type: GET_DATA_SUCCESS });
		} catch (err) {}
	}, []);

	const filterCryptos = useCallback(
		async (currencies) => {
			const filtered_cryptos = state.cryptoData
				.filter(({ id }) => {
					return currencies.includes(id);
				})
				.sort((a, b) => b.market_cap - a.market_cap);

			dispatch({ type: FILTER_CRYPTOS, payload: filtered_cryptos });
		},
		[ state.cryptoData ]
	);

	const setRefPrices = async () => {
		if (state.filteredData) {
			const cryptoPrices = objectifyArray(
				state.filteredData,
				'id',
				'current_price'
			);
			dispatch({ type: SET_REF_PRICES, payload: cryptoPrices });
			return;
		}
		return;
	};

	useEffect(() => {
		fetchCryptoData();
		//eslint-disable-next-line
	}, []);

	useEffect(
		() => {
			setRefPrices();
		},
		//eslint-disable-next-line
		[ state.filteredData ]
	);

	return (
		<CryptoContext.Provider
			value={{ ...state, fetchCryptoData, filterCryptos, setRefPrices }}
		>
			{children}
		</CryptoContext.Provider>
	);
};

export const useCryptoContext = () => {
	return useContext(CryptoContext);
};
