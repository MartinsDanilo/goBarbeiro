import Sequelize, {
  Model
} from "sequelize";
import bcrypt from "bcryptjs";

console.log("Entrando no Model Usuario");
class Usuario extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      email: Sequelize.STRING,
      senha: Sequelize.VIRTUAL,
      senha_hash: Sequelize.STRING,
      barbeiro: Sequelize.STRING,
    }, {
      sequelize,
    });
    //beforeSave(antes de salvar) addHook(adicionar gancho)
    //cripitografando senha com bcryptjs
    this.addHook("beforeSave", async (usuario) => {
      if (usuario.senha) {
        usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
      }
    });

    return this;
  }

  static associacao(models) {
    this.belongsTo(models.Arquivo, {
      foreignKey: "avatar_id",
      as: "avatar"
    });
  }

  checaSenha(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }
}

export default Usuario;