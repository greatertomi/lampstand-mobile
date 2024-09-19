import * as Yup from 'yup';

const emailValidation = () =>
  Yup.string()
    .test('valid-email', 'Invalid email format', (value) => (value ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : false))
    .required('Email is required');

const passwordValidation = () =>
  Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
    .test('uppercase', 'Password must contain uppercase', (value) => /[A-Z]/.test(value))
    .test('number', 'Password must contain a number', (value) => /\d/.test(value))
    .test('special character', 'Password must contain a special character', (value) => /[!#$%&*@^_]/.test(value));

const confirmPasswordValidation = () =>
  Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required');

const phoneNumberValidation = () =>
  Yup.string()
    .required('Phone number is required')
    .min(11, 'Phone number must be exactly 11 digits')
    .max(11, 'Phone number must be exactly 11 digits')
    .test('number', 'Phone number must only be numbers', (value) => !!value && /^\d+$/.test(value));

const goalInMinutes = () => Yup.string().typeError('Reading time must be set').required('Reading time is required');

const goalReminder = () => Yup.string().typeError('Reminding time must be set').required('Reminding time is required');

export const loginSchema = Yup.object().shape({
  email: emailValidation(),
  password: passwordValidation()
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
  confirmPassword: confirmPasswordValidation(),
  agreedToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to terms of service and privacy policy')
    .required('Agreement to terms is required')
});

export const setPasswordSchema = Yup.object().shape({
  password: passwordValidation(),
  confirmPassword: confirmPasswordValidation()
});

export const resetPasswordSchema = Yup.object().shape({
  email: emailValidation()
});

export const otpSchema = Yup.object().shape({
  otp: Yup.array()
    .required('OTP is required')
    .of(Yup.string().matches(/^\d$/, 'Must be a number'))
    .length(6, 'OTP must be 6 numbers')
});

export const phoneNumberSchema = Yup.object().shape({
  phoneNumber: phoneNumberValidation()
});

export const readingGoalSchema = Yup.object().shape({
  goalInMinutes: goalInMinutes(),
  reminderTime: goalReminder()
});
