import * as Yup from 'yup';

const emailValidation = () => Yup.string()
  .test('valid-email', 'Invalid email format', (value) => (value ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : false))
  .required('Email is required');

const passwordValidation = () => Yup.string().min(8, 'Password must be at least 8 characters')
  .required('Password is required')
  .test('uppercase', 'Password must contain uppercase', (value) => /[A-Z]/.test(value))
  .test('number', 'Password must contain a number', (value) => /\d/.test(value))
  .test('special character', 'Password must contain a special character', (value) => /[!#$%&*@^_]/.test(value));

export const loginSchema = Yup.object().shape({
  email: emailValidation(),
  password: Yup.string().min(8, 'Your password is at least 8 characters').required('Password is required')
});

export const signUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .test('full-names', 'Full name must be first and last name', (value) => {
      if (!value) return false;
      const names = value.trim().split(' ');
      return names.length >= 2 && names.every((word) => word.length >= 3);
    })
    .required('Full name is required'),
  email: emailValidation(),
  password: passwordValidation(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match').required('Confirm Password is required'),
  agreedToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions')
    .required('You must agree to the terms and conditions')
});
