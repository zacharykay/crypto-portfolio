import { UPDATE_AMOUNT, UPDATE_INVESTMENT, PORTFOLIO_ERROR } from '../utils/actions';

const portfolio_reducer = (state, action) => {
	if (action.type === UPDATE_AMOUNT) {
		const { id, value } = action.payload;
		if ((id, value)) {
			return {
				...state,
				cryptoAmount: { ...state.cryptoAmount, [id]: value }
			};
		}
		return { ...state };
	}

	if (action.type === UPDATE_INVESTMENT) {
		return { ...state, initialInvestment: action.payload };
	}

	if (action.type === PORTFOLIO_ERROR) {
		return { ...state, portfolioError: action.payload };
	}
};

export default portfolio_reducer;
