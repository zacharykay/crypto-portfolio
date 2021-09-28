import { useEffect } from 'react';
import { useCryptoContext } from '../context/crypto_context';

import Loading from '../components/Loading';
import Accordion from '../components/Accordion';

import { supportedCryptos as currencies } from '../utils/supportedCryptos';

const PriceCharts = () => {
	const { cryptoData, dataLoading, filteredData, filterCryptos } = useCryptoContext();

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
			<div className="card-container">
				{filteredData.map((crypto, index) => {
					return <Accordion key={index} {...crypto} />;
				})}
			</div>
		);
	}
};

export default PriceCharts;
