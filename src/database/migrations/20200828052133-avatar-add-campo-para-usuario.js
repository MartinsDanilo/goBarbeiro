"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    //criando um campo na tabela usuarios de nome avatar_id
    return queryInterface.addColumn("usuarios", "avatar_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "arquivos",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn("usuarios", "avatar_id");
  },
};