import React, { useState, useEffect, useRef } from "react";
import { Card } from "./cards";
import "./home.css";

const Home = () => {
  const itemsRef = useRef([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [animatePopup, setAnimatePopup] = useState(false);

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const handleScroll = () => {
    itemsRef.current.forEach((item) => {
      if (item && isElementInViewport(item)) {
        if (!item.classList.contains("in-view")) {
          item.classList.add("in-view");
        }
      } else if (item && item.classList.contains("in-view")) {
        item.classList.remove("in-view");
      }
    });
  };

  const handleButtonClick = (content) => {
    setPopupContent(content);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setAnimatePopup(false);
  };

  useEffect(() => {
    window.addEventListener("load", handleScroll);
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("load", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (popupVisible) {
      setTimeout(() => {
        setAnimatePopup(true);
      }, 10);
    }
  }, [popupVisible]);

  return (
    <>
      <section className="timeline">
        <ul>
          {Card.map((card, index) => (
            <li key={index} ref={(el) => (itemsRef.current[index] = el)}>
              <div>
                <time>{card.title}</time>
                <div>
                  <h1>{card.subTitle}</h1>
                  <p>{card.description}</p>
                </div>
                <div>
                  <button
                    className="button-80"
                    onClick={() => handleButtonClick(card)}
                  >
                    {card.btn}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      {popupVisible && (
        <div
          className={`popup-overlay ${animatePopup ? "popup-visible" : ""}`}
          onClick={closePopup}
        >
          <div
            className={`popup gb-popup-scale ${
              animatePopup ? "popup-visible" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={popupContent.img} className="detail-img" alt="" />
            <h2>{popupContent.activity}</h2>
            <p>{popupContent.detail}</p>
            <button className="button-55" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
