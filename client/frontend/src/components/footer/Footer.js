import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="section bg-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="">
              <h6 className="footer-heading text-uppercase">
                Information
              </h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <a href="">Pages</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="">
              <h6 className="footer-heading text-uppercase">
                Resources
              </h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <a href="https://en.wikipedia.org/wiki/Blog">Wikipedia </a>
                </li>
                <li>
                  <a href="">Term &amp; Service</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2">
            <div className="">
              <h6 className="footer-heading text-uppercase">Help</h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <a href="/signup">Sign Up </a>
                </li>
                <li>
                  <a href="/signin">Login</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="">
              <h6 className="footer-heading text-uppercase">
                Contact Us
              </h6>
              <p className="contact-info mt-4">
                Contact us:
              </p>
              <p className="contact-info">+91 9999999999</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-2">
        <p className="footer-alt mb-0 f-14">2024 © VNR, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;