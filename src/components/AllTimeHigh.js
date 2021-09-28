const AllTimeHigh = ({ price, allTimeHigh, percentage }) => {
	return (
		<p>
			<span className="lowpacity">Highest:</span> ${' '}
			{(Math.round(allTimeHigh * 100) / 100).toLocaleString('en-US')}{' '}
			{percentage && (
				<span className="lowpacity">
					{price / allTimeHigh > 1 ? (
						`(+${Math.floor((price / allTimeHigh - 1) * 100)}%)`
					) : (
						`(-${Math.floor((1 - price / allTimeHigh) * 100)}%)`
					)}
				</span>
			)}
		</p>
	);
};

export default AllTimeHigh;
