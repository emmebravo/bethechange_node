import Validator from 'validator';
import isEmpty from 'is-empty';

export default function validateLoginInput(data) {
  const errors = {};

  // covert empty fields to empty string to use validator fcns
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // checks email input
  if (Validator.isEmpty(data.email)) errors.email = 'Email field is required';
  else if (!Validator.isEmpty(data.email)) errors.email = 'Email is invalid';

  // checks password input
  if (Validator.isEmpty(data.password))
    errors.password = 'Password is required';

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
