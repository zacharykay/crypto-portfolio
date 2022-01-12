import React, { useState } from "react";
import styled from "styled-components";

import { usePortfolioContext } from "../context/portfolio_context";

import CryptoCard from "../components/CryptoCard";
import CryptoDetails from "./CryptoDetails";
import { convertUSDToCrypto } from "../utils/helperFunctions";

const FlipCard = ({ ...currency }) => {
  const { id, current_price: price, symbol } = currency;
  const { updateAmount, cryptoAmount } = usePortfolioContext();
  const [ flipped, setFlipped ] = useState(false);

  return (
    <Wrapper>
      <div
        className={
          flipped ? (
            "portfolio-currency-container flip-card"
          ) : (
            "portfolio-currency-container"
          )
        }
        onClick={() => setFlipped(!flipped)}
        data-test={id}
      >
        <div className="front-card">
          <label htmlFor={id}>
            <CryptoCard portfolio id={id} {...currency} />
          </label>
          <div className="currency-row">
            <div className="input-container">
              <span>$</span>
              <input
                required
                className="currency-input"
                data-test={`${id}-input`}
                type="number"
                name={id}
                max="100000"
                value={cryptoAmount[id].toString()}
                onChange={updateAmount(price)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="conversion-container">
              <p>
                {convertUSDToCrypto(cryptoAmount, id, price)} {symbol.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
        <div className="back-card">
          <CryptoDetails back_card portfolio {...currency} />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .portfolio-currency-container {
    transform-style: preserve-3d;
    transition: all 0.6s ease;
    position: relative;
    justify-content: center;
  }

  .portfolio-currency-container * {
    cursor: pointer;
  }

  .input-container {
    position: relative;
    text-align: left;
    margin-left: 1.5rem;
    padding: 0;
  }
  .input-container span {
    position: absolute;
    left: -6%;
    bottom: 10%;
    padding: 0;
  }
  .conversion-container {
    margin-left: auto;
    margin-right: 1rem;
    text-align: right;
  }
  .conversion-container p {
    display: inline-block;
    margin: 0.2rem -0.2rem 0 -3.4rem;
  }
  .currency-input {
    background-color: var(--light-grey);
    color: var(--white);
    text-align: left;
    width: 55%;
    font-size: 16px;
    border-radius: 10px;
    padding: 0.2rem 0rem 0.1rem 0.5rem;
    cursor: text;
    outline: none;
  }

  .currency-input:hover {
    box-shadow: var(--shadow-thin);
  }
  .currency-input:focus {
    box-shadow: var(--shadow-thin);
  }

  .flip-card {
    transform: rotateY(180deg);
  }
  .currency-row {
    display: flex;
  }
  .front-card,
  .back-card {
    backface-visibility: hidden;
    /* mix-blend-mode: multiply; */
    min-width: 275px;
    background: var(--dark-grey);
    border-radius: 12px;
    height: 90px;
    margin: 0.5rem;
  }

  .back-card {
    transform: rotateY(180deg);
    position: absolute;
    top: -0.5rem;
  }

  .front-card:focus-within {
    box-shadow: var(--shadow-thick);
  }
  .front-card:hover,
  .back-card:hover {
    box-shadow: var(--shadow-thick);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    display: none;
  }

  @media (max-width: 600px) {
    div.front-card,
    div.back-card {
      width: 90vw;
      margin: 0.5rem 1rem;
    }
    div.back-card {
      right: 0;
    }
  }
`;

export default FlipCard;
