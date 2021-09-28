import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Error = () => {
	return (
		<Wrapper>
			<main>
				<h3>
					Page does not exist... <Link to="/">Return Home?</Link>
				</h3>
			</main>
		</Wrapper>
	);
};

const Wrapper = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;

	h3 {
		color: var(--medium-grey);
		text-transform: none;
		margin-bottom: 2rem;
	}
`;

export default Error;
