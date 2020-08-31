import Usuario from "../models/Usuario";
import Arquivo from "../models/Arquivo";

class ServidoresController {
  async index(req, res) {
    const servidor = await Usuario.findAll({
      where: {
        barbeiro: true,
      },
      attributes: ["id", "nome", "email", "avatar_id"],
      include: [{
        model: Arquivo,
        attributes: ["nome", "path", "url"],
      }, ],
    });
    return res.json(provider);
  }
}

export default new ServidoresController();