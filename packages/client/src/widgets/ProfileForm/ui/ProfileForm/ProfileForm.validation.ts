import * as yup from 'yup';

export const profileValidationSchema = yup.object().shape({
  first_name: yup
    .string()
    .matches(
      /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
      'First name must start with a capital letter and contain only letters and hyphens'
    )
    .required('First name is required'),
  second_name: yup
    .string()
    .matches(
      /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
      'Second name must start with a capital letter and contain only letters and hyphens'
    )
    .required('Second name is required'),
  login: yup
    .string()
    .matches(
      /^(?!\d+$)[a-zA-Z0-9-_]{3,20}$/,
      'Login must be 3-20 characters long and can contain letters, numbers, hyphens, and underscores'
    )
    .required('Login is required'),
  email: yup.string().email('Must be a valid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, 'Phone must be 10-15 digits and can start with a plus sign')
    .required('Phone is required'),
});
