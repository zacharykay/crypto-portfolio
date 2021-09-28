import { useState, useEffect } from 'react';
import { useCryptoContext } from '../context/crypto_context';
import { usePortfolioContext } from '../context/portfolio_context';

import styled from 'styled-components';

import {
	timeSinceInvestment,
	portfolioBalance,
	formatPrice,
	dollarPrice
} from '../utils/helperFunctions';
import Loading from '../components/Loading';
import Accordion from '../components/Accordion';

import { supportedCryptos as currencies } from '../utils/supportedCryptos';

const Portfolio = () => {
	const {
		cryptoData,
		dataLoading,
		filteredData,
		filterCryptos,
		priceData
	} = useCryptoContext();
	const { portfolioData } = usePortfolioContext();

	const { cryptos, investment, investment_date } = portfolioData;

	const [ currentBalance, setCurrentBalance ] = useState(0);

	const assetPercentChange = () => {
		let sign = '';
		if (currentBalance < investment) {
			sign = '-';
		}
		return parseFloat(
			sign + Math.abs((1 - currentBalance / investment) * 100).toFixed(1)
		);
	};

	useEffect(
		() => {
			filterCryptos(currencies);
		},
		//eslint-disable-next-line
		[ cryptoData ]
	);

	useEffect(
		() => {
			portfolioBalance(cryptos, priceData, setCurrentBalance);
		},
		[ cryptos, priceData ]
	);

	if (dataLoading) {
		return <Loading />;
	}

	if (filteredData) {
		return (
			<Wrapper>
				<header>
					<h3 className="portfolio-value">
						Portfolio Value:{' '}
						<span className="balance">
							{formatPrice(currentBalance, 'fullPrice')}&nbsp;{' '}
							<span className="lowpacity">
								{assetPercentChange() > 0 && '+'}
								{assetPercentChange()}%
							</span>
						</span>
					</h3>
					<h3 className="investment-amount">
						Investment: <span>{dollarPrice(investment)}</span> &nbsp;
						<span className="lowpacity">
							| &nbsp;{timeSinceInvestment(investment_date)} Ago
						</span>
					</h3>
				</header>
				<div className="card-container">
					{filteredData.map((crypto, index) => {
						return <Accordion portfolioWallet key={index} {...crypto} />;
					})}
				</div>
			</Wrapper>
		);
	}
};

const Wrapper = styled.section`
	header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: var(--dark-black);
		color: var(--white);
		padding-bottom: var(--footer-spacer);
	}

	header h3 {
		width: var(--tab-width);
		text-align: center;
	}

	.portfolio-value {
		font-size: 1.5rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		margin: 0 0 0.5rem 0;
		position: fixed;
		top: var(--nav-height);
		z-index: 10;
		background-color: var(--dark-black);
	}

	.investment-amount {
		font-size: 1rem;
		opacity: 80%;
		margin: 3rem 0 0 0;
	}

	.balance {
		color: var(--electric-blue);
	}
	.balance span {
		font-size: 62%;
	}

	@media (max-width: 420px) {
		.portfolio-value {
			font-size: 120%;
		}
		.investment-amount {
			margin-top: 2.5rem;
			font-size: 90%;
		}
	}
	@media (max-width: 360px) {
		.portfolio-value {
			font-size: 110%;
		}
		.investment-amount {
			margin-top: 2.2rem;
			font-size: 80%;
		}
	}
`;

export default Portfolio;
