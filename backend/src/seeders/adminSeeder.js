const { User } = require('../models');

async function seedAdmin() {
  try {
    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({
      where: { email: 'admin@admin.com' }
    });

    if (existingAdmin) {
      console.log('El usuario admin ya existe');
      return;
    }

    // Crear usuario admin
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@admin.com',
      password_hash: 'Admin1234', // Se hasheará automáticamente por el hook del modelo
      role: 'admin',
      is_active: true
    });

    console.log('Usuario admin creado exitosamente:', admin.email);
    console.log('Contraseña: Admin1234');
  } catch (error) {
    console.error('Error al crear el usuario admin:', error);
  }
}

seedAdmin(); 