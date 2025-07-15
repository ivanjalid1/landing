const { User } = require('../models');
const { generateToken } = require('../middleware/auth');
const { registerSchema, loginSchema } = require('../validators/authValidator');

exports.register = async (req, res, next) => {
  try {
    // Validar datos de entrada
    const validatedData = await registerSchema.validate(req.body);

    // Verificar si el email ya existe
    const existingUser = await User.findOne({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'El email ya está registrado'
      });
    }

    // Crear usuario
    const user = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      password_hash: validatedData.password,
      role: validatedData.role || 'user'
    });

    // Generar token
    const token = generateToken(user);

    // Responder sin incluir password_hash
    const { password_hash, ...userData } = user.toJSON();

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: userData,
      token
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    // Validar datos de entrada
    const validatedData = await loginSchema.validate(req.body);

    // Buscar usuario
    const user = await User.findOne({
      where: { email: validatedData.email }
    });

    if (!user || !(await user.validatePassword(validatedData.password))) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    if (!user.is_active) {
      return res.status(401).json({
        error: 'Usuario desactivado'
      });
    }

    // Actualizar último login
    await user.update({
      last_login: new Date()
    });

    // Generar token
    const token = generateToken(user);

    // Responder sin incluir password_hash
    const { password_hash, ...userData } = user.toJSON();

    res.json({
      message: 'Login exitoso',
      user: userData,
      token
    });
  } catch (error) {
    next(error);
  }
};

exports.me = async (req, res, next) => {
  try {
    const { password_hash, ...userData } = req.user.toJSON();
    res.json(userData);
  } catch (error) {
    next(error);
  }
}; 