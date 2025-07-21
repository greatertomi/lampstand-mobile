import * as Yup from 'yup';

const emailValidation = () =>
  Yup.string()
    .test('valid-email', 'Invalid email format', (value) => (value ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : false))
    .required('Email is required');

const passwordValidation = (label = 'Password') =>
  Yup.string().min(6, ` ${label} must be at least 6 characters`).required(`${label} is required`);

const confirmPasswordValidation = () =>
  Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required');

const currentPasswordValidation = () => passwordValidation('Current password');

const phoneNumberValidation = () =>
  Yup.string()
    .required('Phone number is required')
    .min(8, 'Phone number must be exactly 11 digits')
    .test('number', 'Phone number must only be numbers', (value) => !!value && /^\d+$/.test(value));

const goalInSeconds = () =>
  Yup.number()
    .typeError('Reading time must be set')
    .required('Reading time is required')
    .test('min-10-minutes', 'Goal must be at least 10 minutes', (value) => value / 60 >= 10)
    .test('max-12-hours', 'Goal cannot exceed 12 hours (720 minutes)', (value) => value / 60 <= 720);

const goalReminder = () => Yup.string().typeError('Reminding time must be set').required('Reminding time is required');

const fullNameValidation = () =>
  Yup.string()
    .test('full-names', 'Full name must be first and last name', (value) => {
      if (!value) return false;
      const names = value.trim().split(' ');
      return names.length >= 2 && names.every((word) => word.length >= 3);
    })
    .required('Full name is required');

export const loginSchema = Yup.object().shape({
  email: emailValidation(),
  password: passwordValidation()
});

export const signUpSchema = Yup.object().shape({
  fullName: fullNameValidation(),
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

export const changePasswordSchema = Yup.object().shape({
  password: passwordValidation(),
  confirmPassword: confirmPasswordValidation(),
  currentPassword: currentPasswordValidation()
});

export const resetPasswordSchema = Yup.object().shape({
  email: emailValidation()
});

export const otpSchema = Yup.object().shape({
  otp: Yup.array()
    .required('OTP is required')
    .of(Yup.string().matches(/^\d$/, 'Must be a number'))
    .length(4, 'OTP must be 4 numbers')
});

export const phoneNumberSchema = Yup.object().shape({
  phoneNumber: phoneNumberValidation()
});

export const readingGoalSchema = Yup.object().shape({
  goalInSeconds: goalInSeconds(),
  reminderTime: goalReminder()
});

export const editProfileSchema = Yup.object().shape({
  fullName: fullNameValidation(),
  phoneNumber: phoneNumberValidation()
});
