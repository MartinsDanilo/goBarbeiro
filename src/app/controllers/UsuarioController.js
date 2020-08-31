import Usuario from "../models/Usuario"
import * as Yup from "yup";
class UsuarioController {
  //Yup é usado para validar os dados
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().min(6).required(),
    });


    /*isValid é a função do yup que está no schema que verifica 
    se os dados são válidos de acordo o exigido no schema */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "A validação Falhou!"
      });
    }

    //Verifica se o Usuario já existe
    const usuarioExistente = await Usuario.findOne({
      where: {
        email: req.body.email
      },
    });

    //Se usuario existir retorna status 400
    if (usuarioExistente) {
      return res.status(400).json({
        error: "Usuario já cadastrado!"
      });
    }

    //Destruturando dados à exibir no Json de Usuario
    const {
      id,
      nome,
      email,
      barbeiro
    } = await Usuario.create(req.body);

    //Dados a serem exibidos
    return res.json({
      id,
      nome,
      email,
      barbeiro,
    });
  }

  //update será usado para modificar email, nome e senha
  async update(req, res) {
    console.log(req.body)

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senhaAnterior: Yup.string().required().min(6),
      senha: Yup.string()
        .min(6)
        .when("senhaAnterior", (senhaAnterior, field) =>
          senhaAnterior ? field.required() : field
        ),
      confirmarSenha: Yup.string().when("senha", (senha, field) =>
        senha ? field.required().oneOf([Yup.ref("senha")]) : field
      ),
    }); //When= Quando| arrowFunction((parametro1, parametro2)=>{}) | Ternario = condition ? expr1 : expr2    

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "A validação falhou!"
      });
    }

    //Pegando o usuario pelo Primary Key usando o params do req
    const usuario = await Usuario.findByPk(
      req.userId /*req.userId pertence ao autenticaMiddleware*/
    );

    //destruturando o body para verificar se não já está usando os mesmos dados na edição
    const {
      email,
      senhaAnterior
    } = req.body;

    if (email !== usuario.email) {
      //verificando se o email digitado não já está em uso
      const emailExistente = Usuario.findOne({
        where: {
          email
        }
      });
      debugger;

      if (emailExistente) {
        return res.status(400).json({
          erro: "Email já cadastrado"
        });
      }
    }

    if (senhaAnterior && !(await usuario.checaSenha(senhaAnterior))) {
      return res.status(401).json({
        error: "Senha incorreta!"
      });
    }

    const {
      nome,
      barbeiro
    } = await usuario.update(req.body);


    const dadosUser = req.body;


    return res.json({
      nome,
      email,
      barbeiro
    });
  }

  async index(req, res) {
    const {
      page
    } = req.query;

    //console.log("Pagina", page);
    const usuario = await Usuario.findAll({
      attributes: ["id", "nome", "email", "barbeiro"],
      offset: (page - 1) * 10,
      limit: 10,
    });

    return res.json(usuario);
  }
}

export default new UsuarioController();