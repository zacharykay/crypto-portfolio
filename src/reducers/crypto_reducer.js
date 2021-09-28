import {
	GET_DATA_BEGIN,
	GET_DATA_SUCCESS,
	SET_CURRENCIES,
	FETCH_TICKER_DATA,
	FETCH_GLOBAL_DATA,
	FILTER_CRYPTOS,
	SET_REF_PRICES
} from '../utils/actions';

const crypto_reducer = (state, action) => {
	if (action.type === SET_CURRENCIES) {
		return { ...state, cryptoCurrencies: action.payload };
	}

	if (action.type === GET_DATA_BEGIN) {
		return { ...state, dataLoading: true };
	}

	if (action.type === GET_DATA_SUCCESS) {
		return { ...state, dataLoading: false };
	}

	if (action.type === FETCH_TICKER_DATA) {
		return { ...state, cryptoData: action.payload };
	}

	if (action.type === FETCH_GLOBAL_DATA) {
		return { ...state, globalData: action.payload };
	}

	if (action.type === FILTER_CRYPTOS) {
		return { ...state, filteredData: action.payload };
	}

	if (action.type === SET_REF_PRICES) {
		return { ...state, priceData: action.payload };
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default crypto_reducer;
