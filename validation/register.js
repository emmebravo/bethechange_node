import Validator from 'validator';
import isEmpty from 'is-empty';

export default function validateRegister(data) {
  const errors = {};

  // convert empty fields to empty string to use validator fcns
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // checks name input
  if (Validator.isEmpty(data.name)) errors.name = 'Name field is required';

  // checks email input
  if (Validator.isEmpty(data.email)) errors.email = 'Email field is required';
  else if (!Validator.isEmpty(data.email)) errors.email = 'Email is invalid';

  // checks password input
  if (Validator.isEmpty(data.password))
    errors.password = 'Password is required';
  if (Validator.isEmpty(data.password2))
    errors.password2 = 'Confirmed password field is required';
  if (!Validator.isLength(data.password, { min: 8, max: 20 }))
    errors.password = 'Password must be at least 8 characters long';
  if (!Validator.equals(data.password, data.password2))
    errors.password2 = 'Passwords must match';

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
