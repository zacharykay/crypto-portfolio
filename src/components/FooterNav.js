import styled from "styled-components";
import NavLinks from "./NavLinks";

const FooterNav = () => {
  return (
    <Wrapper className="bottom-nav-wrapper">
      <NavLinks />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    display: block;
    height: var(--nav-height);
    width: 100vw;
    display: flex;
    align-content: center;
    align-items: center;
    background-color: var(--dark-black);
    justify-content: center;
    z-index: 20;
    margin: 0 auto;
    margin: 0;
  }
`;

export default FooterNav;
