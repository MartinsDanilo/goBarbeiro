import jwt from "jsonwebtoken";
import autenticacao from "../../config/autenticacao";
import * as Yup from "yup";
import Usuario from "../models/Usuario";

class LoginController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().min(6).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: "Validção Falhou!" });
    }

    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ erro: "Usuario não cadastrado!" });
    }

    //verificando se a senha digitada bate com o rash da senha do banco
    if (!(await usuario.checaSenha(senha))) {
      return res.status(401).json({ error: "Senha incorreta!" });
    }

    const { id, nome } = usuario;

    return res.json({
      usuario: {
        id,
        nome,
        email,
      },
      //gerandon um token no momento do cadastro. O mesmo não fica armazenado
      token: jwt.sign({ id }, autenticacao.secret, {
        expiresIn: autenticacao.expiresIn,
      }),
    });
  }
}
export default new LoginController();
