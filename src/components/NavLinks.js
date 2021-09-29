import { useUserContext } from '../context/user_context';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { GiTakeMyMoney } from 'react-icons/gi';
import { IoStatsChart, IoWallet } from 'react-icons/io5';

const NavLinks = () => {
	const { myUser } = useUserContext();

	return (
		<Wrapper>
			<ul>
				{!myUser && (
					<li>
						<NavLink exact to={'/'} activeClassName="nav-link-active">
							Markets&nbsp; <IoStatsChart />
						</NavLink>
					</li>
				)}
				<li>
					<NavLink exact to={'/invest'} activeClassName="nav-link-active">
						Invest&nbsp; <GiTakeMyMoney />
					</NavLink>
				</li>
				{myUser && (
					<li>
						<NavLink
							exact
							to={'/portfolio'}
							activeClassName="nav-link-active"
						>
							Portfolio&nbsp; <IoWallet />
						</NavLink>
					</li>
				)}
			</ul>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	ul {
		width: var(--tab-width);
		display: flex;
		margin: 0;
		padding: 0;
		align-content: center;
	}

	li {
		list-style: none;
		text-transform: uppercase;
		padding: 0;
		font-size: var(--nav-font-size);
		line-height: var(--nav-height);
	}

	li a {
		text-decoration: none;
		text-align: center;
		color: var(--white);
		width: calc(var(--tab-width) / 2);
		padding: 0;
		height: 100%;
		display: inline-block;
	}

	li:hover {
		background-color: var(--dark-grey);
		border-radius: 12px;
	}

	svg {
		font-size: 120%;
		vertical-align: -10%;
	}

	@media (max-width: 768px) {
		li:hover {
			border-radius: 0;
		}
	}
`;

export default NavLinks;
