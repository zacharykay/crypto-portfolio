import styled from "styled-components";
import CryptoCard from "./CryptoCard";
import AllTimeHigh from "./AllTimeHigh";
import { digitLength } from "../utils/helperFunctions";

const CryptoDetails = ({
  back_card,
  circulating_supply,
  max_supply,
  market_cap,
  market_cap_rank,
  ath: allTimeHigh,
  ...props
}) => {
  return (
    <Wrapper>
      <div className="wrapper">
        <CryptoCard flip_card {...props} />
        <div className="card-data">
          <div className="high-cap">
            <AllTimeHigh price={props.current_price} allTimeHigh={allTimeHigh} />
            <p>Market Cap: ${digitLength(market_cap)}</p>
          </div>
          <div className="rank">
            <p>
              <span className="lowpacity">Rank:</span> #{market_cap_rank}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .wrapper {
    height: 90px;
    margin-top: -0.5rem;
  }

  .wrapper h3.currency {
    margin-top: -0.9rem;
  }

  .card-data {
    display: flex;
    justify-content: space-between;
  }

  .high-cap {
    color: var(--white);
    margin: -1.3rem 0.8rem 0 0;
    line-height: 0.4rem;
    text-align: left;
    font-size: 0.85rem;
  }

  .high-cap p {
    text-align: left;
    margin-left: 1rem;
  }

  .rank {
    margin-bottom: 0;
  }

  .rank p {
    display: inline-block;
    text-align: right;
    margin: 0.4rem 0.8rem 0 0;
  }
`;

export default CryptoDetails;
