import { Link } from 'react-router-dom';

import LoginLogoutButton from '../components/LoginLogoutButton';
import NavLinks from './NavLinks';

import styled from 'styled-components';
import { FaEthereum } from 'react-icons/fa';

const Navbar = () => {
	return (
		<NavContainer>
			<Link to="/">
				<button className="site-logo" type="button">
					<FaEthereum />
				</button>
			</Link>
			{/* <h2>CryptoTracker</h2> */}
			<div className="links-wrapper">
				<NavLinks />
			</div>

			<LoginLogoutButton />
		</NavContainer>
	);
};

const NavContainer = styled.nav`
	height: var(--nav-height);
	width: 100vw;
	display: flex;
	align-items: center;
	background-color: var(--dark-black);
	justify-content: space-between;
	position: fixed;
	z-index: 20;

	/* h2 {
		color: var(--white);
	} */

	.site-logo {
		height: var(--nav-height);
		width: var(--nav-height);
		filter: invert(100%);
		padding: 0;
		margin: 0 calc(var(--auth-button-width) - var(--nav-height)) 0 0;
	}

	@media (max-width: 768px) {
		.links-wrapper {
			display: none;
		}
	}
`;

export default Navbar;
