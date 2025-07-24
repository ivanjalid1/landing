const yup = require('yup');

exports.contentSchema = yup.object().shape({
  section: yup
    .string()
    .required('La sección es requerida')
    .oneOf(['hero', 'benefits', 'services', 'faq', 'contact', 'seo'], 'Sección inválida'),
  
  key: yup
    .string()
    .required('La clave es requerida')
    .min(2, 'La clave debe tener al menos 2 caracteres')
    .max(50, 'La clave no puede tener más de 50 caracteres'),
  
  value: yup
    .string()
    .required('El valor es requerido'),
  
  type: yup
    .string()
    .oneOf(['text', 'html', 'image', 'json'], 'Tipo inválido')
    .default('text'),
  
  language: yup
    .string()
    .min(2, 'El código de idioma debe tener al menos 2 caracteres')
    .max(5, 'El código de idioma no puede tener más de 5 caracteres')
    .default('es'),
  
  order: yup
    .number()
    .min(0, 'El orden debe ser un número positivo')
    .default(0),
  
  is_active: yup
    .boolean()
    .default(true)
});

exports.reorderSchema = yup.object().shape({
  items: yup.array().of(
    yup.object().shape({
      id: yup.string().uuid('ID inválido').required('ID requerido'),
      order: yup.number().min(0, 'El orden debe ser un número positivo').required('Orden requerido')
    })
  ).required('Items requeridos')
}); 