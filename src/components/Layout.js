import React from 'react';
import styled from 'styled-components';
import FooterNav from './FooterNav';

import Navbar from './Navbar';

const Layout = ({ children }) => {
	return (
		<Wrapper>
			<Navbar />
			<div className="nav-spacer" />
			<section>{children}</section>
			<div className="footer-spacer" />
			<FooterNav />
		</Wrapper>
	);
};
const Wrapper = styled.main`
	background-color: var(--dark-black);
	section {
		background-color: var(--light-black);
	}
	.nav-spacer {
		height: var(--nav-height);
	}
	@media (max-width: 768px) {
		.footer-spacer {
			height: calc(var(--nav-height));
		}
	}
`;

export default Layout;
