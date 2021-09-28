import React from 'react';
import styled from 'styled-components';
import { useUserContext } from '../context/user_context';
import { FaUserMinus, FaUserPlus } from 'react-icons/fa';

const LoginButton = () => {
	const { loginWithRedirect, myUser, logout } = useUserContext();

	return (
		<Wrapper>
			{myUser ? (
				<button
					type="button"
					className="auth-btn"
					onClick={() => {
						localStorage.removeItem('user');
						logout({ returnTo: window.location.origin });
					}}
				>
					Logout
					<FaUserMinus />
				</button>
			) : (
				<button className="auth-btn" type="button" onClick={loginWithRedirect}>
					Login
					<FaUserPlus />
				</button>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.auth-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border-color: transparent;
		font-size: var(--nav-font-size);
		width: var(--auth-button-width);

		cursor: pointer;
		text-transform: uppercase;
		color: var(--white);
		height: var(--nav-height);
		svg {
			margin-left: 0.5rem;
		}
	}

	.auth-btn:hover {
		background-color: var(--dark-grey);
	}
`;

export default LoginButton;
