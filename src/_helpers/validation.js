import * as yup from "yup";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string("You have entered an invalid username or password")
    .required("Please enter your email")
    .email("Please enter your email address in format: yourname@example.com"),
  password: yup
    .string("You have entered an invalid username or password")
    .required("Please enter your password")
    .min(6, "Password is too short")
    .max(32, "Password is too long")
});

const registerValidationSchema = yup.object().shape({
  name: yup
    .string("Please enter your name")
    .required("Please enter your name")
    .min(3, "Name is too short")
    .max(16, "Name is too long"),
  email: yup
    .string("Please enter your email address in format: yourname@example.com")
    .required("Please enter your email")
    .email("Please enter your email address in format: yourname@example.com"),
  password: yup
    .string("Please enter password")
    .required("Please enter password")
    .min(6, "Password is too short")
    .max(32, "Password is too long")
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
