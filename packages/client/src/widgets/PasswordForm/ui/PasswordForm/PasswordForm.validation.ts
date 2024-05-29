import * as yup from 'yup';

export const passwordValidationSchema = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,40}$/,
      'Password must be 8-40 characters long, contain at least one uppercase letter, one number, and may include special characters'
    )
    .required('New password is required'),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Please confirm your new password'),
});
