import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import { supportedCryptos as currencies } from '../utils/supportedCryptos';
import FlipCard from '../components/FlipCard';
import Loading from '../components/Loading';
import { FaUserPlus } from 'react-icons/fa';

import { dollarPrice } from '../utils/helperFunctions';

import { useCryptoContext } from '../context/crypto_context';
import { usePortfolioContext } from '../context/portfolio_context';
import { useUserContext } from '../context/user_context';

const Invest = () => {
	const {
		cryptoData,
		dataLoading,
		filteredData,
		filterCryptos,
		creatingPortfolio
	} = useCryptoContext();

	const {
		initialInvestment,
		totalCryptoAmount,
		updateInvestment,
		createPortfolio,
		portfolioError
	} = usePortfolioContext();

	const { loginWithRedirect, myUser } = useUserContext();

	const history = useHistory();

	const remainingAmount = parseInt(initialInvestment) - totalCryptoAmount;

	useEffect(
		() => {
			filterCryptos(currencies);
		},
		//eslint-disable-next-line
		[ cryptoData ]
	);

	if (dataLoading) {
		return <Loading />;
	}

	if (filteredData) {
		return (
			<Wrapper>
				<main className="invest">
					<h2>Create your Portfolio + Start Tracking your Gains Today!</h2>

					<form onSubmit={(e) => e.preventDefault()}>
						<h3>
							<label htmlFor="initial_investment">
								<span className="lowpacity">STEP 1:</span> Choose your
								initial investment
							</label>{' '}
						</h3>

						<select
							required
							autoFocus
							value={initialInvestment}
							name="initial_investment"
							id="initial_investment"
							onChange={updateInvestment}
						>
							<option value="500">$500</option>
							<option value="1000">$1,000</option>
							<option value="5000">$5,000</option>
							<option value="10000">$10,000</option>
							<option value="25000">$25,000</option>
							<option value="50000">$50,000</option>
							<option value="100000">$100,000</option>
						</select>
						<span> &nbsp;USD</span>
						<h3>
							<span className="lowpacity">STEP 2:</span> Choose your
							cryptocurrencies &nbsp;&nbsp;&nbsp;{' '}
							<span className="amount-counters">
								<span
									className={
										remainingAmount < 0 ? (
											'negative'
										) : remainingAmount === 0 ? (
											'positive'
										) : (
											''
										)
									}
								>
									{dollarPrice(totalCryptoAmount)}{' '}
									<span className="lowpacity">Invested</span>
								</span>{' '}
								<span>
									&nbsp;&nbsp;{' '}
									{remainingAmount >= 0 ? (
										dollarPrice(remainingAmount)
									) : (
										0
									)}{' '}
								</span>
								<span className="lowpacity">Remaining</span>
							</span>
						</h3>
						<div className="invest-currency-section">
							{filteredData.map((currency, index) => {
								return <FlipCard key={index} {...currency} />;
							})}
						</div>
						<div className="create-portfolio">
							<h3>
								<span className="lowpacity">STEP 3:</span> Confirm your
								selections
							</h3>
							<div className="create-portfolio-btn">
								{myUser ? (
									<button
										type="button"
										onClick={(e) => {
											createPortfolio(e);
											if (!creatingPortfolio) {
												history.push('/portfolio');
											}
										}}
									>
										Create Portfolio
									</button>
								) : (
									<span className="lowpacity">
										<button
											className="inline-login"
											type="button"
											onClick={loginWithRedirect}
										>
											Login to Create Portfolio <FaUserPlus />
										</button>
									</span>
								)}

								{portfolioError === 'budgetError' &&
								remainingAmount < 0 && (
									<span className="negative">
										&nbsp;&nbsp;{' '}
										{dollarPrice(Math.abs(remainingAmount))}{' '}
										<span className="lowpacity">Over Budget</span>
									</span>
								)}
								{portfolioError === 'budgetError' &&
								remainingAmount > 0 &&
								remainingAmount < initialInvestment && (
									<span className="negative">
										&nbsp;&nbsp; {dollarPrice(remainingAmount)}{' '}
										<span className="lowpacity">
											Budget Remaining
										</span>
									</span>
								)}
							</div>
						</div>
					</form>
				</main>
			</Wrapper>
		);
	}
};

const Wrapper = styled.main`
	form {
		max-width: 100vw;
	}
	.invest {
		background-color: var(--light-black);
		color: var(--white);
		margin: 0 0.5rem -0.5rem 0.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 1.5rem;
	}
	.invest-currency-section {
		display: grid;
		grid-template-columns: repeat(4, auto);
	}
	.create-portfolio h3 {
		display: inline-block;
		margin-right: 1.5rem;
	}
	.inline-login {
		font-size: 130%;
		color: white;
		background: transparent;
		border-color: transparent;
		cursor: pointer;
		margin-top: -0.5rem;
		margin-left: -0.5rem;
		padding: 0.5rem;
	}
	.inline-login:hover {
		color: var(--electric-blue);
	}

	h2,
	h3,
	select {
		margin-left: 0.5rem;
		margin-right: 0.5rem;
	}
	.create-portfolio-btn {
		display: inline-block;
	}

	@media (max-width: 1170px) {
		.invest-currency-section {
			grid-template-columns: repeat(3, auto);
		}
	}

	@media (max-width: 900px) {
		.invest-currency-section {
			grid-template-columns: repeat(2, auto);
		}
		.amount-counters {
			display: block;
			margin-top: 1rem;
		}
	}

	@media (max-width: 600px) {
		.invest-currency-section {
			grid-template-columns: repeat(1, auto);
		}
		h2,
		h3,
		select {
			margin-left: 1rem;
			margin-right: 1rem;
		}

		h2 {
			font-size: 1.25rem;
			margin-bottom: 0.2rem;
		}
		h3,
		select {
			font-size: 100%;
		}
		.create-portfolio-btn {
			display: block;
			margin: 0 0 0 1rem;
		}
	}
`;

export default Invest;
