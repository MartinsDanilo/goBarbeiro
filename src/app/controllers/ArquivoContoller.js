import Arquivo from "../models/Arquivo";

class ArquivoController {
  async store(req, res) {
    const {
      originalname: nome,
      filename: path
    } = req.file;
    //return res.json({ ok: true });

    const arquivo = await Arquivo.create({
      nome,
      path,
    });

    return res.json(arquivo);
  }
}

export default new ArquivoController();