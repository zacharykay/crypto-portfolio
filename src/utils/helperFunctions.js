export const digitLength = (number) => {
	const num = Math.floor(number).toString();
	if (4 <= num.length && num.length <= 6) {
		return `${num.slice(0, -3)}K`;
	} else if (7 <= num.length && num.length <= 9) {
		return `${num.slice(0, -6)}M`;
	} else if (10 <= num.length && num.length <= 12) {
		return `${num.slice(0, -9)}B`;
	} else if (13 <= num.length && num.length <= 15) {
		return `${num.slice(0, -12)}T`;
	} else if (16 <= num.length && num.length) {
		return `${num.slice(0, -15)}Q`;
	}
	return num;
};

export const convertUSDToCrypto = (cryptoAmount, id, price) => {
	let amount;
	if (id) {
		amount = cryptoAmount[id];
	} else {
		amount = parseInt(cryptoAmount);
	}

	if (amount === 0) {
		return 0;
	} else if (price > 100000) {
		return (amount / price).toFixed(5);
	} else if (price > 10000) {
		return (amount / price).toFixed(4);
	} else if (price > 1000) {
		return (amount / price).toFixed(3);
	} else if (price > 10) {
		return (amount / price).toFixed(2);
	} else if (price > 1) {
		return (amount / price).toFixed(1);
	} else if (price > 0 && price <= 1) {
		return (amount / price).toFixed(0);
	}
	return 0;
};

export const timeSinceInvestment = (investmentDate) => {
	const minutes = parseInt(
		(Date.now() - new Date(parseInt(investmentDate, 10))) / 1000 / 60
	);
	const hours = parseInt(minutes / 60);
	const minuteText = minutes % 60 === 1 ? ', 1 Minute' : `, ${minutes % 60} Minutes`;
	if (hours < 1) {
		return minutes < 2 ? '1 Minute' : `${minutes} Minutes`;
	} else if (hours < 24) {
		return `${hours} ${hours < 2 ? 'Hour' : 'Hours'}${minutes % 60 > 0
			? minuteText
			: ''}`;
	} else if (hours >= 24 && hours % 24 !== 0) {
		return `${(hours / 24).toFixed()} Days, ${hours % 24} Hours`;
	} else if (hours >= 24 && hours % 24 === 0) {
		return `${(hours / 24).toFixed()} Days`;
	}
	return;
};

export const portfolioBalance = async (balances, priceData, setCurrentBalance) => {
	if (Object.keys(priceData).length === 0) {
		return 0;
	}
	const balance = parseFloat(
		Object.keys(balances)
			.reduce((total, currency) => {
				const pricePoint = priceData[currency];
				const cryptoAmt = balances[currency];
				const usdAmt = pricePoint * cryptoAmt;
				return total + usdAmt;
			}, 0)
			.toFixed(2)
	);
	setCurrentBalance(balance);
	return balance;
};

export const formatPrice = (price, fullPrice) => {
	if (price < 1000 || fullPrice) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(price);
	} else if (price >= 1000) {
		return `$${Math.round(price).toLocaleString('en-US')}`;
	}
	return price;
};

export const dollarPrice = (price) => {
	return `$${Math.round(price).toLocaleString('en-US')}`;
};

export const objectifyArray = (array, key, value) => {
	if (key && value) {
		return array.reduce((obj, item) => {
			const keys = item[key];
			const values = item[value];
			return { ...obj, [keys]: values };
		}, {});
	} else if (!key && !value) {
		return array.reduce((obj, item) => {
			return { ...obj, [item]: 0 };
		}, {});
	} else if (!key && value) {
		return array.reduce((obj, item) => {
			return { ...obj, [item]: value };
		}, {});
	} else if (key && !value) {
		return array.reduce((obj, item) => {
			return { ...obj, [key]: item };
		}, {});
	}
	return;
};
