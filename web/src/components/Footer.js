import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import LogoIcon from "../assets/logo.svg";
import { device } from "../styles/deviceSizes";
import PhoneIcon from "../assets/icons/phone.svg";
import EmailIcon from "../assets/icons/email.svg";
import Location from "../assets/icons/location.svg";
import { Logo } from "./header";

const FooterStyles = styled.footer`
  width: 100%;
  display: inline-block;
  // background: var(--lightOrange);
  text-align: center;
 
  // text-decoration: underline;

  .footer-distributed {
    background: #444;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    // font: bold 16px sans-serif;
    padding: 65px 50px;
  }

  .footer-distributed .footer-left,
  .footer-distributed .footer-center,
  .footer-distributed .footer-right {
    display: inline-block;
    vertical-align: top;
  }

  /* Footer left */

  .footer-distributed .footer-left {
    width: 40%;
  }

  /* The company logo */

  .footer-distributed h3 {
    color: #ffffff;
    // font: normal 36px "Open Sans", cursive;
    margin: 0;
    font-size: 3rem;
  }

  .footer-distributed h3 span {
    color: #666;
  }

  /* Footer links */

  .footer-distributed .footer-links {
    color: #ffffff;
    margin: 20px 0 12px;
    padding-left: 0;
  }

  .footer-distributed .footer-links a {
    display: inline-block;
    line-height: 1.8;
    font-weight: 800;
    text-decoration: none;
    color: inherit;
  }

  .footer-distributed .footer-company-name {
    color: #666;
    font-size: 14px;
    // font-weight: normal;
    // margin: 0;
  }

  /* Footer Center */

  .footer-distributed .footer-center {
    width: 35%;
  }

  .footer-distributed .footer-center i {
    color: #ffffff;
    font-size: 25px;
    width: 38px;
    height: 38px;
    text-align: center;
    line-height: 42px;
    margin: 10px 15px;
    vertical-align: middle;
  }

  .footer-distributed .footer-center i.fa-envelope {
    font-size: 17px;
    line-height: 38px;
  }

  .footer-distributed .footer-center p {
    display: inline-block;
    color: #ffffff;
    // font-weight: 400;
    vertical-align: middle;
    margin: 0;
  }

  .footer-distributed .footer-center p span {
    display: block;
    font-weight: normal;
    font-size: 14px;
    line-height: 2;
  }

  .footer-distributed .footer-center p a {
    color: lightseagreen;
    text-decoration: none;
  }

  .footer-distributed .footer-links a:before {
    content: "|";
    font-weight: 300;
    font-size: 20px;
    left: 0;
    color: #fff;
    display: inline-block;
    padding-right:15px;
    padding-left:15px;
  }

  .footer-distributed .footer-links .link-1:before {
    content: none;
  }

  /* Footer Right */

  .footer-distributed .footer-right {
    width: 20%;
  }

  .footer-distributed .footer-company-about {
    line-height: 20px;
    color: #92999f;
    font-size: 13px;
    font-weight: normal;
    margin: 0;
  }

  .footer-distributed .footer-company-about span {
    display: block;
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .footer-distributed .footer-icons {
    margin-top: 25px;
  }

  .footer-distributed .footer-icons a {
    display: inline-block;
    width: 35px;
    height: 35px;
    cursor: pointer;
    background-color: #33383b;
    border-radius: 2px;

    font-size: 20px;
    color: #ffffff;
    text-align: center;
    line-height: 35px;

    margin-right: 3px;
    margin-bottom: 5px;
  }

  /* If you don't want the footer to be responsive, remove these media queries */

  @media (max-width: 880px) {
    .footer-distributed {
      font: bold 14px sans-serif;
    }

    .footer-distributed .footer-left,
    .footer-distributed .footer-center,
    .footer-distributed .footer-right {
      display: block;
      width: 100%;
      margin-bottom: 40px;
      text-align: center;
    }

    .footer-distributed .footer-center i {
      margin-left: 0;
    }
  }
  
`;

const Footer = ({ logo, contactUs }) => {
  return (
    <FooterStyles>
      <footer className="footer-distributed">
        <div className="footer-left">
          <h3>
            BOUNDLESS<span>MALDIVES</span>
          </h3>

          <p className="footer-links">

            <Link to="/" className="link-1">
              Home
            </Link>

            <Link to="/magazine" className="link-2">
              Magazine
            </Link>

          </p>

          <p className="footer-company-name">Boundless Maldives © 2022</p>
        </div>

        <div className="footer-center">
          <div>
            {/* <Location></Location> */}
            <p>
              <span>H.Rujehige Maafannu</span> Male' City, Maldives
            </p>
          </div>

          <div>
            {/* <PhoneIcon></PhoneIcon> */}
            <p>+960 1259876</p>
          </div>

          <div>
            {/* <EmailIcon></EmailIcon> */}
            <p>
              <a href="mailto:support@company.com">hi@boundlessmaldives.com</a>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>Everything means Everything</span>
            At Boundles, our heart and soul is to provide you with the finest of experiences,
            where we will cater to your every whim and every need. Ask us for the stars.
          </p>

          <div className="footer-icons">
            <a href="#">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="#">
              <i className="fa fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </FooterStyles>
  );
};

export default Footer;
