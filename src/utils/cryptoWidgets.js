import { digitLength } from './utils/helperFunctions';

export const CirculatingSupply = ({ circulating_supply, max_supply }) => {
	return (
		<p>
			Circulation: {digitLength(circulating_supply)}
			<span className="lowpacity"> / </span>
			{max_supply ? digitLength(max_supply) : '∞'}
			{max_supply && (
				<span className="lowpacity">
					{'   '}
					{`(${Math.floor(circulating_supply / max_supply * 100)}%)`}
				</span>
			)}
		</p>
	);
};

export const AllTimeHighAndPercentage = ({ price, allTimeHigh }) => {
	return (
		<p>
			<span className="lowpacity">Highest:</span> ${' '}
			{(Math.round(allTimeHigh * 100) / 100).toLocaleString('en-US')}{' '}
			<span className="lowpacity">
				{price / allTimeHigh > 1 ? (
					`(+${Math.floor((price / allTimeHigh - 1) * 100)}%)`
				) : (
					`(-${Math.floor((1 - price / allTimeHigh) * 100)}%)`
				)}
			</span>
		</p>
	);
};

export const MarketCap = ({ market_cap }) => {
	return <p>Market Cap: ${digitLength(market_cap)}</p>;
};

export const MarketCapRank = ({ market_cap_rank }) => {
	return (
		<p>
			<span className="lowpacity">Rank:</span> #{market_cap_rank}
		</p>
	);
};

export const AllTimeHigh = ({ allTimeHigh }) => {
	return (
		<p>
			<span className="lowpacity">Highest:</span> ${' '}
			{(Math.round(allTimeHigh * 100) / 100).toLocaleString('en-US')}{' '}
		</p>
	);
};

export const AllTimeHighPercentage = ({ ath_change_percentage }) => {
	return (
		<p className="lowpacity">
			{price / ath_change_percentage > 1 ? (
				`(+${ath_change_percentage.toFixed(2)}%)`
			) : (
				`(-${ath_change_percentage.toFixed(2)}%)`
			)}
		</p>
	);
};
