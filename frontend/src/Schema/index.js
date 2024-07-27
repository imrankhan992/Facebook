import * as Yup from "yup";
export const validationSchema = Yup.object({
    email: Yup.string().email('Must be a valid email address.').required('Email address is required.'),
    password: Yup.string().required('Password is required'),
  });

  // registration validation schema
  export const registrationValidationSchema = Yup.object({
    first_name: Yup.string().required('What\'s your name?.').min(2, 'First name must be between 2 and 16 characters.').max(20, 'First name must be between 2 and 16 characters.').matches(/^[a-zA-Z]+$/, 'First name must contain only letters.'),
    last_name: Yup.string().required('What\'s your last name?.').min(2, 'Last name must be between 2 and 16 characters.').max(20, 'Last name must be between 2 and 16 characters.').matches(/^[a-zA-Z]+$/, 'Last name must contain only letters.'),
    email: Yup.string().required('you\' need this when you log in and if you ever need to reset your password.').email('Must be a valid email address.'),
    password: Yup.string().min(8, 'Password Must be 8 characters or more').required('Enter a combination of at least six numbers, letters and punctuation marks (like ! and &).'),
    bYear: Yup.string().required('Year is required'),
    bMonth: Yup.string().required('Month is required'),
    bDay: Yup.string().required('Day is required'),
  });