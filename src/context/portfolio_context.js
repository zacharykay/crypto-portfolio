import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/portfolio_reducer';

import { useCryptoContext } from '../context/crypto_context';

import { UPDATE_AMOUNT, UPDATE_INVESTMENT, PORTFOLIO_ERROR } from '../utils/actions';

import { objectifyArray } from '../utils/helperFunctions';
import { supportedCryptos as currencies } from '../utils/supportedCryptos';

const getLocalStorage = () => {
	let investmentData = localStorage.getItem(`crypto-portfolio-investment`);
	if (investmentData) {
		return JSON.parse(localStorage.getItem(`crypto-portfolio-investment`));
	} else {
		return {};
	}
};

const initialState = {
	cryptoAmount: objectifyArray(currencies),
	cryptoBalances: objectifyArray(currencies),
	cryptoPrice: [],
	totalCryptoAmount: 0,
	initialInvestment: 10000,
	portfolioData: getLocalStorage(),
	portfolioError: '',
	creatingPortfolio: false,
	portfolioExists: false
};

const PortfolioContext = React.createContext();

export const PortfolioProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(reducer, initialState);

	const { priceData } = useCryptoContext();

	useEffect(
		() => {
			if (state.portfolioData !== {}) {
				state.portfolioExists = true;
			}
		},
		//eslint-disable-next-line
		[ state.portfolioData ]
	);

	const updateAmount = (price) => (e) => {
		let id = e.target.name;
		let value = e.target.value;

		let parsedValue = value === '' ? 0 : parseInt(value);

		if (parsedValue >= 0 && parsedValue <= 100000) {
			let crypto = parseFloat(value / price).toFixed(6);

			state.cryptoBalances[id] = crypto;
			state.cryptoAmount[id] = parsedValue;

			state.totalCryptoAmount = Object.values(state.cryptoAmount).reduce(
				(a, b) => a + b
			);

			value = parsedValue;

			if (value >= 0) {
				dispatch({ type: UPDATE_AMOUNT, payload: id, value });
			}
		}
	};

	const updateInvestment = (e) => {
		let value = e.target.value;
		dispatch({ type: UPDATE_INVESTMENT, payload: value });
	};

	const createPortfolio = (e) => {
		e.preventDefault();
		state.creatingPortfolio = true;
		const remainingAmount =
			parseInt(state.initialInvestment) - parseInt(state.totalCryptoAmount);
		if (remainingAmount !== 0) {
			dispatch({ type: PORTFOLIO_ERROR, payload: 'budgetError' });
		}
		if (remainingAmount === 0) {
			dispatch({ type: PORTFOLIO_ERROR, payload: '' });
			const portfolioValues = {
				investment: state.initialInvestment,
				prices: priceData,
				amounts: state.cryptoAmount,
				cryptos: state.cryptoBalances,
				investment_date: Date.now()
			};

			localStorage.setItem(
				`crypto-portfolio-investment`,
				JSON.stringify(portfolioValues)
			);
		}
		state.portfolioData = getLocalStorage();
		state.creatingPortfolio = false;
		state.portfolioExists = true;
	};

	return (
		<PortfolioContext.Provider
			value={{ updateAmount, updateInvestment, createPortfolio, ...state }}
		>
			{children}
		</PortfolioContext.Provider>
	);
};

export const usePortfolioContext = () => {
	return useContext(PortfolioContext);
};
