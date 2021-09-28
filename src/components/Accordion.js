import React, { useState } from 'react';

import styled from 'styled-components';
import CryptoSimpleCard from './CryptoCard';
import CirculatingSupply from './CirculatingSupply';
import AllTimeHigh from './AllTimeHigh';

import { digitLength, dollarPrice, convertUSDToCrypto } from '../utils/helperFunctions';
import { usePortfolioContext } from '../context/portfolio_context';

const Accordion = ({
	circulating_supply,
	max_supply,
	market_cap,
	market_cap_rank,
	ath: allTimeHigh,
	...props
}) => {
	const [ accordionVisible, setAccordionVisible ] = useState(false);

	const { portfolioData } = usePortfolioContext();
	const { prices, amounts, investment } = portfolioData;
	const { id, current_price: price, symbol, portfolioWallet } = props;

	const toggleAccordion = () => {
		setAccordionVisible(!accordionVisible);
	};

	const currentAssetValue = () => {
		return amounts[id] * price / prices[id];
	};

	const assetPercentChange = () => {
		let sign = '';
		if (currentAssetValue() < amounts[id]) {
			sign = '-';
		}
		return parseFloat(
			sign + Math.abs((1 - currentAssetValue() / amounts[id]) * 100).toFixed(1)
		);
	};

	return (
		<Wrapper>
			<div
				className={accordionVisible ? 'accordion wrapper' : 'tab wrapper'}
				onClick={toggleAccordion}
			>
				<CryptoSimpleCard
					currentAssetValue={currentAssetValue}
					assetPercentChange={assetPercentChange}
					{...props}
				/>
				{accordionVisible && (
					<React.Fragment>
						<div className="card-data">
							<div className="supply">
								<p>
									<span className="midpacity">Market Cap:</span> ${digitLength(market_cap)}
								</p>
								<CirculatingSupply
									max_supply={max_supply}
									circulating_supply={circulating_supply}
								/>
							</div>
							<div className="rank">
								<AllTimeHigh
									percentage
									price={props.current_price}
									allTimeHigh={allTimeHigh}
								/>
								<p>
									<span className="lowpacity">Rank:</span> #{market_cap_rank}
								</p>
							</div>
						</div>
						{portfolioWallet &&
						amounts[id] !== 0 && (
							<div className="card-data">
								<p className="investment-info">
									<span className="midpacity">Investment:</span>{' '}
									{dollarPrice(amounts[id])}{' '}
									<span className="lowpacity">
										/{' '}
										{convertUSDToCrypto(
											amounts[id],
											null,
											prices[id]
										)}{' '}
										{symbol.toUpperCase()}
										&nbsp;{' | '}&nbsp;${prices[id]}
										{' | '}
										{(currentAssetValue() / investment * 100).toFixed(
											1
										)}%
									</span>
								</p>
							</div>
						)}
					</React.Fragment>
				)}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.wrapper {
		background: var(--dark-grey);
		border-radius: 12px;
		cursor: pointer;
		margin: 0.1rem 0;
		width: var(--tab-width);
		padding-bottom: 0.2rem;
	}

	.wrapper:hover {
		box-shadow: var(--shadow-thick);
	}

	.tab {
		height: 50px;
		transition: all ease-in-out .25s;
	}

	.accordion {
		min-height: 80px;
		transition: all ease-in-out .25s;
		box-shadow: var(--shadow-medium);
	}

	.card-data {
		color: var(--white);
		display: flex;
		justify-content: space-between;
	}

	.card-data p {
		text-align: left;
		margin: 0.8rem -0.8rem 0.8rem 0.8rem;
	}

	.rank p {
		text-align: right;
		margin: 0.8rem 0.8rem 0.8rem -0.8rem;
	}

	p.investment-info {
		margin: 0.4rem 0.8rem 0.8rem 0.8rem;
	}

	@media (max-width: 420px) {
		.rank p,
		.supply p {
			font-size: 85%;
		}
	}
	@media (max-width: 380px) {
		.rank p,
		.supply p {
			font-size: 75%;
		}
	}
`;

export default Accordion;
