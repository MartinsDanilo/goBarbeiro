import * as Yup from "yup";
import Usuario from "../models/Usuario";

class LoginController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().min(6).required(),
    });

    const isSchemaValid = await schema.isValid(req.body)
    if (!isSchemaValid) {
      return res.status(400).json({ erro: "Validção Falhou!" });
    }

    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ erro: "Usuario não cadastrado!" });
    }

    //verificando se a senha digitada bate com o rash da senha do banco
    const isPasswordCorrect = await usuario.checaSenha(senha)
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Senha incorreta!" });
    }

    const { id, nome } = usuario;
    const token = JwtHelper.sign(id)

    return res.json({
      usuario: {
        id,
        nome,
        email,
      },
      // gerando um token no momento do cadastro. O mesmo não fica armazenado
      token,
    });
  }
}
export default new LoginController();
