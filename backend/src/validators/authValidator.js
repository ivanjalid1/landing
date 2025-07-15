const yup = require('yup');

exports.registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede tener más de 100 caracteres'),
  
  email: yup
    .string()
    .required('El email es requerido')
    .email('Email inválido'),
  
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    ),
  
  passwordConfirmation: yup
    .string()
    .required('La confirmación de contraseña es requerida')
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
  
  role: yup
    .string()
    .oneOf(['admin', 'manager', 'user'], 'Rol inválido')
    .default('user')
});

exports.loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('El email es requerido')
    .email('Email inválido'),
  
  password: yup
    .string()
    .required('La contraseña es requerida')
});

exports.updatePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required('La contraseña actual es requerida'),
  
  newPassword: yup
    .string()
    .required('La nueva contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    )
    .notOneOf([yup.ref('currentPassword')], 'La nueva contraseña debe ser diferente a la actual'),
  
  passwordConfirmation: yup
    .string()
    .required('La confirmación de contraseña es requerida')
    .oneOf([yup.ref('newPassword'), null], 'Las contraseñas deben coincidir')
}); 