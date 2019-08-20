import * as yup from "yup";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .required()
    .min(6)
    .max(32)
});

const registerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3)
    .max(16),
  email: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .required()
    .min(6)
    .max(32)
});

export const isLoginValid = (email, password) => {
  return loginValidationSchema
    .validate({
      email,
      password
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const isRegisterValid = (name, email, password) => {
  return registerValidationSchema
    .validate({
      name,
      email,
      password
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
