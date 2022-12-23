import React from "react";
import "./Footer.css";

import { useTranslation } from "react-i18next";

const Footer = () => {
  const {  i18n } = useTranslation();

  if (i18n.language === "ar") {
    return (
      <div className="myfooter">
        <footer dir="rtl" className="ali   ">
          {/*        */}
          تم التصميم والبرمجة بواسطة على حسن
          <span>
            {" "}
            <i className="fa-solid fa-heart"></i>{" "}
          </span>
        </footer>
      </div>
    );
  }

  if (i18n.language === "en") {
    return (
      <div className="myfooter">
        <footer className="ali   ">
          Designed and developed by Courses4Arab.com
          <span>
            {" "}
            <i className="fa-solid fa-heart"></i>{" "}
          </span>
        </footer>
      </div>
    );
  }

  if (i18n.language === "fr") {
    return (
      <div className="myfooter">
        <footer className="ali   ">
          Conçu et développé par Courses4Arab.com
          <span>
            {" "}
            <i className="fa-solid fa-heart"></i>{" "}
          </span>
        </footer>
      </div>
    );
  }
};

export default Footer;
