"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("agendamentos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
      },
      data: {
        type: Sequelize.STRING,
        alowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "usuarios",
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      servidor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "usuarios",
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      canceled_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("agendamentos");
  },
};