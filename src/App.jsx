import React, { useState } from "react";
import Form from "./components/Form";
import Card from "./components/Card";

const App = () => {
  const [isFormSubmittedSuccessfully, setIsFormSubmittedSuccessfully] =
    useState(false);
  const [cardInfo, setCardInfo] = useState({
    name: "Jane Appleseed",
    cardNumber: "0000 0000 0000 0000",
    expMonth: "00",
    expYear: "00",
    cvc: "000",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setCardInfo((prevInfo) => {
      return { ...prevInfo, [name]: value };
    });
  };

  return (
    <section className="hero">
      <Card {...cardInfo} />
      <Form
        status={isFormSubmittedSuccessfully}
        setStatus={setIsFormSubmittedSuccessfully}
        handleInputChange={handleInputChange}
      />
    </section>
  );
};

export default App;
