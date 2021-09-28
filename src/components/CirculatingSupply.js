import { digitLength } from '../utils/helperFunctions';

const CirculatingSupply = ({ circulating_supply, max_supply }) => {
	return (
		<p>
			<span className="midpacity">Circulation:</span>{' '}
			{digitLength(circulating_supply)}
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

export default CirculatingSupply;
