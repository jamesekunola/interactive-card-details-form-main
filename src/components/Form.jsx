import { useRef, useState } from "react";
import { validateFormInputValue } from "./validateFormInput";

const errStyle = { borderColor: "#ff5252" };

const Form = () => {
  const [errorMsg, setErrorMsg] = useState({});
  const [inputValues, setInputValues] = useState({
    name: "",
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
  });

  const formatInputValues = (name, value) => {
    if (name === "cardNumber") {
      value = value.replace(/\D/g, ""); // remove whitespace from value

      value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Add a space after every 4 digits
      return value;
    }

    return value;
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setErrorMsg((prevErr) => ({ ...prevErr, [name]: false })); //reset error msg when user start typing

    const formattedValues = formatInputValues(name, value);

    setInputValues((prevInfo) => {
      return { ...prevInfo, [name]: formattedValues };
    });
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationResult = validateFormInputValue(inputValues);

    setErrorMsg(validationResult);
  };

  return (
    <article className="form__wrapper">
      <form onSubmit={handleSubmit}>
        {/* name input */}
        <div className="name__input">
          <label htmlFor="name">Cardholder name</label>
          <input
            style={errorMsg.name ? errStyle : null}
            type="text"
            name="name"
            placeholder="eg Jane Appleseed"
            id="name"
            value={inputValues.name}
            onChange={handleInputChange}
          />
          <span className={`error-msg ${errorMsg.name && "show"}`}>
            enter full name e.g Jane Appleseed
          </span>
        </div>

        {/* card number input */}
        <div className="cardNumber__input">
          <label htmlFor="cardNumber">Cardholder name</label>
          <input
            style={errorMsg.cardNumber ? errStyle : null}
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9123 0000"
            id="cardNumber"
            value={inputValues.cardNumber}
            onChange={handleInputChange}
            maxLength={19}
          />
          <span className={`error-msg ${errorMsg.cardNumber && "show"}`}>
            wrong format, number only
          </span>
        </div>

        {/*expiry date & cvc  */}
        <div className="card__exp__Info">
          {/*card exp date */}
          <div className="card__expDate__details">
            <label htmlFor="date">EXP.DATE (MM/YY)</label>
            <div className="card__exp__period">
              <input
                style={errorMsg.month ? errStyle : null}
                type="text"
                name="month"
                placeholder="MM"
                id="date"
                maxLength={2}
                value={inputValues.expMonth}
                onChange={handleInputChange}
                pattern="/^\d{2}$/"
              />
              <input
                style={errorMsg.year ? errStyle : null}
                type="text"
                name="year"
                placeholder="YY"
                id="date"
                maxLength={2}
                value={inputValues.expYear}
                onChange={handleInputChange}
                pattern="/^\d{2}$/"
              />
            </div>
            <span className={`error-msg ${errorMsg.date && "show"}`}>
              Can't be blank
            </span>
          </div>

          {/* cvc input*/}
          <div className="card__cvc_input">
            <label htmlFor="cvc">CVC</label>
            <input
              style={errorMsg.cvc ? errStyle : null}
              type="text"
              name="cvc"
              placeholder="e.g 123"
              id="cvc"
              value={inputValues.cvc}
              onChange={handleInputChange}
              maxLength={3}
              minLength={3}
              // pattern="/[0-9]{0,3}/"
            />
            <span className={`error-msg ${errorMsg.cvc && "show"}`}>
              Can't be blank
            </span>
          </div>
        </div>

        <button type="submit" className="btn">
          Confirm
        </button>
      </form>
    </article>
  );
};

export default Form;
