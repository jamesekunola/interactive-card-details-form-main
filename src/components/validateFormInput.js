export const validateFormInputValue = (values) => {
  const { name, cardNumber, month, year, cvc } = values;
  const errors = {};

  if (!/^[A-Za-z]+(?:\s[A-Za-z]+)?\s[A-Za-z]+$/.test(name)) {
    errors.name = "invalid format. enter full name e.g jane appleseed";
  }

  if (!name) {
    errors.name = "Can't be blank";
  }

  if (cardNumber.length < 19) {
    errors.cardNumber = "invalid card number";
  }

  if (!cardNumber) {
    errors.cardNumber = "Can't be blank";
  }

  if (!month) {
    errors.date = "Can't be blank";
    errors.month = true;
  }

  if (!year) {
    errors.date = "Can't be blank";
    errors.year = true;
  }

  if (!cvc) {
    errors.cvc = "Can't be blank";
  }

  return errors;
};
