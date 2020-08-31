import Sequelize, {
  Model
} from "sequelize";

console.log("Entrando no Model Usuario");
class Agendamento extends Model {
  static init(sequelize) {
    super.init({
      data: Sequelize.STRING,
      canceled_at: Sequelize.STRING,
    }, {
      sequelize,
    });

    return this;
  }
  static associacao(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "usuarios"
    });

    this.belongsTo(models.Usuario, {
      foreignKey: "servidor_id",
      as: "servidor"
    });
  }
}

export default Agendamento;