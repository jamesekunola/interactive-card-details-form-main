import React from "react";
import checkIcon from "../images/icon-complete.svg";

const Completed = () => {
  return (
    <article className="completed">
      <img src={checkIcon} alt="completed icon" />
      <h1>Thank you</h1>
      <p>We've added your card details</p>
      <button className="btn">Continue</button>
    </article>
  );
};

export default Completed;
