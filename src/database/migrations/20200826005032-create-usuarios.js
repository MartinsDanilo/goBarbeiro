"use strict";

console.log("Entrando no Model Migration create-usuario");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("usuarios", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        alowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        alowNull: false,
        unique: true,
      },
      senha_hash: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      barbeiro: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("usuarios");
  },
};
