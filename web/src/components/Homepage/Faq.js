import { Link } from "gatsby";
import React, { useState } from "react";
import styled from "styled-components";

import ChevronDown from "../../assets/icons/chevron-down.svg";
import ChevronUp from "../../assets/icons/chevron-up.svg";
import { device } from "../../styles/deviceSizes";
import { Button } from "../Button";
import { Overlay } from "../../components";

const FaqStyles = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 0 15% 10rem 15%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.laptopL} {
    padding: 10rem 15% 10rem 15%;
  }
  @media ${device.tablet} {
    padding: 5rem 1.5rem 10rem 1.5rem;
  }

  h2 {
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .heading {
    margin: 7rem 0 5rem 0rem;
  }

  .description {
    width: 40rem;
    /* margin-bottom: 5rem; */
    font-size: 1.8rem;
    color: #505050;

    @media ${device.tablet} {
      width: unset;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 7rem;

    li {
      padding: 1.5rem 3rem 1.5rem 3rem;
      text-align: left;
      width: 100%;
      border: 1px solid var(--grey);
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;

      transition: all 1s;
      box-shadow: none;
      min-height: 5rem;
      max-height: 10rem;
      outline: none;

      &.selected {
        box-shadow: 0px 59px 107px rgba(0, 0, 0, 0.05);
        border-color: #fff;
        min-height: 15rem;
        max-height: 60rem;
      }

      &:not(:last-of-type) {
        margin-bottom: 2rem;
        @media ${device.onlyMobileSm} {
          margin-bottom: 1rem;
        }
      }

      .question {
        font-size: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      svg {
        width: 2rem;
        height: 2rem;
      }

      .answer {
        margin-top: 5rem;
        color: var(--grey);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .btn {
    padding: 1.5rem 5rem;
  }
`;

const Faq = (props) => {
  const [selectedQuestion, setSelectedQuestion] = useState(-1);
  const { faq, path, onClick, slice, className } = props;

  return (
    faq && (
      <FaqStyles className={`faq__section ${className}`}>
        <Overlay className="parallax-overlay" bgColor="#fdf7ed" />
        <div className="heading">
          <h2>{faq.name}</h2>
          <p className="description">
            Browse our FAQ's below, if you can not find the answer you're
            looking for please contact us
          </p>
        </div>

        <ul>
          {faq?.faqQuestionsAnswers
            .slice(0, slice ? slice : 4)
            .map(({ question, answer }, index) => (
              <li
                className={`clickable ${
                  selectedQuestion === index ? "selected" : ""
                }`}
                key={question}
                onClick={() => {
                  if (selectedQuestion !== index) {
                    setSelectedQuestion(index);
                  } else {
                    setSelectedQuestion(-1);
                  }
                }}
              >
                <p className="question">
                  {question}{" "}
                  {selectedQuestion !== index ? <ChevronDown /> : <ChevronUp />}
                </p>

                {selectedQuestion === index && (
                  <p className="answer"> {answer}</p>
                )}
              </li>
            ))}
        </ul>

        {!slice && path === "/" ? (
          <Link to="/faq">
            <Button>View more...</Button>
          </Link>
        ) : slice < 100 && path === "/resort" ? (
          <Button onClick={onClick}>View more...</Button>
        ) : (
          ""
        )}
      </FaqStyles>
    )
  );
};

export default Faq;
