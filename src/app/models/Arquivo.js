import Sequelize, {
  Model
} from "sequelize";

class Arquivo extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      path: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3000/arquivos/${this.path}`;
        },
      },
    }, {
      sequelize,
    });

    return this;
  }
}
export default Arquivo;