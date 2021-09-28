import styled from 'styled-components';

import { formatPrice, dollarPrice, convertUSDToCrypto } from '../utils/helperFunctions';

import { usePortfolioContext } from '../context/portfolio_context';

const CryptoCard = ({
	id,
	name: currencyName,
	symbol,
	image: coinLogo,
	current_price: price,
	price_change_percentage_24h: change,
	portfolio,
	portfolioWallet,
	currentAssetValue,
	assetPercentChange,
	flip_card
}) => {
	if (id === 'havven') {
		currencyName = 'Synthetix';
	}
	if (id === 'internet-computer') {
		currencyName = 'Internet Comp';
	}

	const { portfolioData } = usePortfolioContext();
	const { prices, amounts } = portfolioData;

	return (
		<Wrapper>
			<div className="card">
				<img
					className={portfolio ? 'portfolio-image' : ''}
					src={coinLogo}
					alt={`${currencyName} Logo`}
				/>

				<div
					className={
						portfolioWallet ? (
							'currency-name portfolio-currency'
						) : (
							'currency-name'
						)
					}
				>
					<h3 className="currency">{currencyName}</h3>
					{!flip_card && <p className="symbol">{symbol}</p>}
				</div>
				{portfolioWallet &&
				amounts[id] !== 0 && (
					<div className="portfolio-amounts">
						<p className="investing-amount">
							{dollarPrice(currentAssetValue())}{' '}
							<span className="lowpacity">
								{assetPercentChange() > 0 && '+'}
								{assetPercentChange()}%
							</span>
						</p>
						<p className="lowpacity">
							{convertUSDToCrypto(
								currentAssetValue(),
								null,
								prices[id]
							)}{' '}
							{symbol.toUpperCase()}
						</p>
					</div>
				)}
				<div className="price">
					<p>{formatPrice(price)}</p>
					<p className={change > 0 ? 'positive' : 'negative'}>
						{`${change > 0 ? '+' : ''}${change.toFixed(2)}%`}
					</p>
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	img {
		margin: 0 1.1rem 0 0;
		width: 36px;
		background-color: var(--white);
		border-radius: 18px;
		box-shadow: var(--image-backlight);
		justify-self: center;
	}
	.portfolio-image {
		margin: 0 0.6rem 0 -0.2rem;
	}

	.card {
		margin: 0.5rem 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--white);
		height: 50px;
	}

	.portfolio-currency {
		width: 38%;
		text-align: left;
	}
	.currency-name h3 {
		text-transform: capitalize;
		line-height: 1rem;
		margin: 0.9rem 0 0.1rem;
		font-weight: 300;
	}
	.currency-name .symbol {
		opacity: .7;
		text-align: left;
		line-height: 0rem;
		text-transform: uppercase;
	}

	.price {
		margin-left: auto;
		margin-right: -0.2rem;
	}

	.price p {
		margin: 0.4rem 0 0 0;
		text-align: right;
	}

	.portfolio-amounts {
		margin: 0.3rem 0 0.2rem 0;
	}

	.portfolio-amounts p {
		margin: 0.2rem 0 0.2rem 0;
	}
	.portfolio-amounts .lowpacity {
		font-size: 75%;
	}
	p.investing-amount {
		color: var(--electric-blue);
		font-size: 110%;
	}
	.investing-amount .lowpacity {
		font-size: 65%;
	}
	.investing-amount span {
		font-size: 62%;
	}

	@media (max-width: 420px) {
		img {
			margin-right: 0.8rem;
		}
		.currency-name {
			font-size: 80%;
		}
		p.investing-amount {
			font-size: 85%;
		}
		.portfolio-amounts .lowpacity {
			font-size: 70%;
		}
		.price {
			font-size: 85%;
		}
	}
	@media (max-width: 380px) {
		.currency-name {
			font-size: 75%;
		}

		p.investing-amount {
			font-size: 75%;
		}
		.portfolio-amounts .lowpacity {
			font-size: 65%;
		}
		.price {
			font-size: 78%;
		}
	}
`;

export default CryptoCard;
