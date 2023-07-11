import logo from "../images/card-logo.svg";

const Card = ({ name, cardNumber, expMonth, expYear, cvc }) => {
  return (
    <article className="card">
      {/* card back */}
      <div className="card__wrapper card__back">
        <span className="card__cvc"> {cvc}</span>
      </div>

      {/* card front */}
      <div className="card__wrapper card__front">
        <img src={logo} alt="card logo" className="logo" />

        <div className="card__front__Info">
          <span className="cardNumber">{cardNumber}</span>

          <div className="card__front__info_bottom">
            <span className="cardName">{name}</span>
            <span className="card__expDate">
              {expMonth}/{expYear}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
