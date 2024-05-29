import * as Yup from "yup";
export const validationSchema = Yup.object({
    email: Yup.string().email('Must be a valid email address.').required('Email address is required.'),
    password: Yup.string().min(8, 'Must be 8 characters or more').required('Password is required'),
  });