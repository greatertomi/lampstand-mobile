import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .test('valid-email', 'Invalid email format', (value) => value ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : false)
    .required('Email is required'),
  password: Yup.string().required('Password is required')
});

export const SignUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .test('full-names', 'Full name must be first and last name', (value) => {
      if (!value) return false;
      const names = value.trim().split(' ');
      return names.length >= 2 && names.every((word) => word.length >= 3);
    })
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email')
    .test('valid-email', 'Invalid email format', (value) => value ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : false)
    .required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match').required('Confirm Password is required'),
  agreedToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions')
    .required('You must agree to the terms and conditions')
});
