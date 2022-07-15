import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Facebook from "../assets/icons/facebook.svg";
import Instagram from "../assets/icons/instagram.svg";
import Twitter from "../assets/icons/twitter.svg";
import Github from "../assets/icons/github.svg";

const FooterStyles = styled.div`
  width: 100%;
  overflow: hidden !important;
  display: inline-block;
  margin-bottom: -10px;
  text-align: center;
  .footer-distributed {
    background: #f4f4f5;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    // font: bold 16px sans-serif;
    padding: 65px 50px 0px 65px;
    color: #8c704c;
  }
  .footer-distributed section {
    padding: 40px 25px;
  }

  @media (max-width: 880px) {
    .content-wrapper {
      flex-direction: column;
    }
    .social-links {
      margin-bottom: 30px;
    }
  }

  .social-links {
    margin-top: 30px;
    a {
      margin-right: 2px;
    }
  }

  .social-links svg {
    width: 30px;
    height: 30px;
  }

  .footer-copyright {
    margin-top: 30px;
    text-align: center;
  }

  .content-wrapper {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  .footer-distributed h3 {
    color: #8c704c;
    // font: normal 36px "Open Sans", cursive;
    margin: 0;
    font-size: 2rem;
    text-align: center;
    font-weight: 100;
  }

  .footer-distributed h3 span {
    color: #666;
    font-weight: 900;
  }
  .footer-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 400;
  }
  .footer-right {
    display: flex;
    flex-direction: column;
  }
`;

const Footer = ({ logo, contactUs }) => {
  return (
    <FooterStyles>
      <footer className="footer-distributed">
        <h3>
          BOUNDLESS<span>MALDIVES</span>
        </h3>
        <section>
          <div className="content-wrapper">
            <div className="footer-left">
              <Link to="/" style={{ lineHeight: "22px" }}>
                Home
              </Link>
              <Link to="/magazine" style={{ lineHeight: "22px" }}>
                Magazine
              </Link>
              <div className="social-links">
                <a>
                  <Facebook />
                </a>
                <a href="#">
                  <Instagram />
                </a>
                <a href="#">
                  <Twitter />
                </a>
                <a href="#">
                  <Github />
                </a>
              </div>
            </div>
            <div className="footer-right">
              <div>
                <span>H.Rujehige Maafannu</span> Male' City, Maldives
              </div>
              <div>+960 1259876</div>
              <div>
                <a href="mailto:support@company.com">
                  hi@boundlessmaldives.com
                </a>
              </div>
            </div>
          </div>
          <div className="footer-copyright">Boundless Maldives © 2022</div>
        </section>
      </footer>
    </FooterStyles>
  );
};

export default Footer;
