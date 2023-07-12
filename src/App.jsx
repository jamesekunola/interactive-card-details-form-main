import React, { useState } from "react";
import Form from "./components/Form";
import Card from "./components/Card";

const App = () => {
  const [cardInfo, setCardInfo] = useState({
    name: "Jane Appleseed",
    cardNumber: "0000 0000 0000 0000",
    month: "00",
    year: "00",
    cvc: "000",
  });

  const updateCardInfo = (info) => {
    setCardInfo({ ...cardInfo, ...info });
  };

  return (
    <section className="hero">
      <Card {...cardInfo} />
      <Form updateCardInfo={updateCardInfo} />
    </section>
  );
};

export default App;
