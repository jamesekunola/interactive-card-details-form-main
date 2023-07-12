export const validateFormInputValue = (values) => {
  const { name, cardNumber, month, year, cvc } = values;
  const errors = {};

  if (!/^[A-Za-z]+\s[A-Za-z]+$/.test(name)) {
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

  // validation for date
  if (!/^\d{2}$/.test(month) || month <= 0 || month > 12) {
    errors.month = true;
    errors.date = "Invalid month";
  }

  if (!month) {
    errors.date = "Can't be blank";
    errors.month = true;
  }

  if (!/^\d{2}$/.test(year)) {
    errors.year = true;
    errors.date = "Invalid year";
  }

  if (!year) {
    errors.date = "Can't be blank";
    errors.year = true;
  }

  if (!/^\d{3}$/.test(cvc)) {
    errors.cvc = "Invalid input";
  }

  if (!cvc) {
    errors.cvc = "Can't be blank";
  }

  return errors;
};
