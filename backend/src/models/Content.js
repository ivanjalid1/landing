const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Content = sequelize.define('Content', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    section: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      comment: 'Nombre de la sección (hero, services, accounts, etc.)'
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
      comment: 'Datos de la sección en formato JSON'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: 'Si la sección está activa'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'contents',
    timestamps: true,
    underscored: false, // Cambiar a false para SQLite
    indexes: [
      {
        unique: true,
        fields: ['section']
      }
    ]
  });

  return Content;
}; 