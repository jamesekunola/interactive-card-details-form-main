import { useRef, useState } from "react";
import { validateFormInputValue } from "./validateFormInput";
import Complected from "./Completed";

const errStyle = { borderColor: "#ff5252" };

const Form = ({ updateCardInfo }) => {
  const [errorMsg, setErrorMsg] = useState({});
  const [inputValues, setInputValues] = useState({
    name: "",
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
  });
  const [isFormSubmittedSuccessfully, setIsFormSubmittedSuccessfully] =
    useState(false);
  const yearRef = useRef();
  const cvcRef = useRef();

  const formatInputValues = (name, value) => {
    if (name === "cardNumber") {
      value = value.replace(/\D/g, ""); // remove whitespace from value

      value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Add a space after every 4 digits
    }
    return value;
  };

  const autoFocusOnExpiryDateAndCvc = (name, value) => {
    if (name === "month" && value.length === 2) {
      yearRef.current.focus();
    }

    if (name === "year" && value.length === 2) {
      cvcRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setErrorMsg((prevErr) => ({ ...prevErr, [name]: false })); //on keydown: reset error msg of the particular input user focuses on,

    const formattedValues = formatInputValues(name, value); // get formatted values

    autoFocusOnExpiryDateAndCvc(name, value);

    setInputValues((prevInfo) => {
      return { ...prevInfo, [name]: formattedValues };
    });
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationResults = validateFormInputValue(inputValues);
    setErrorMsg(validationResults);

    const result = {};

    Object.keys(inputValues)
      .filter((prop) => !Object.keys(validationResults).includes(prop))
      .forEach((item) => {
        result[item] = inputValues[item];
      }); // get the correct input values entered.

    if (Object.keys(result).length > 0) {
      updateCardInfo(result);
    } // Update the UI with the user's input when it is correct

    // Show complected component when validation is error-free.
    if (!Object.keys(validationResults).length) {
      setIsFormSubmittedSuccessfully(true);
    }
  };

  return (
    <section className="form__wrapper">
      {!isFormSubmittedSuccessfully && (
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
              {errorMsg.name}
            </span>
          </div>

          {/* card number input */}
          <div className="cardNumber__input">
            <label htmlFor="cardNumber">Cardholder number</label>
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
              {errorMsg.cardNumber}
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
                  ref={yearRef}
                />
              </div>
              <span className={`error-msg ${errorMsg.date && "show"}`}>
                {errorMsg.date}
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
                ref={cvcRef}
              />
              <span className={`error-msg ${errorMsg.cvc && "show"}`}>
                {errorMsg.cvc}
              </span>
            </div>
          </div>

          <button type="submit" className="btn">
            Confirm
          </button>
        </form>
      )}

      {isFormSubmittedSuccessfully && <Complected />}
    </section>
  );
};

export default Form;
