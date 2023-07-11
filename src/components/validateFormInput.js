export const validateFormInputValue = (values) => {
  const { name, cardNumber, month, year, cvc } = values;
  const errors = {};

  if (!name) {
    errors.name = true;
  }
  if (!/^[A-Za-z]+(?:\s[A-Za-z]+)?\s[A-Za-z]+$/.test(name)) {
    errors.name = true;
  }

  if (!cardNumber || cardNumber.length < 19) {
    errors.cardNumber = true;
  }

  if (!month) {
    errors.date = true;
    errors.month = true;
  }

  if (!year) {
    errors.date = true;
    errors.year = true;
  }

  if (!cvc) {
    errors.cvc = true;
  }

  return errors;
};
