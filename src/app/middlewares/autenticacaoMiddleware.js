/*Esse middlewares fica responsavel por verificar se exite um token no Bearer do imnsominia
caso exista ele será validado, caso esteja ele permitira fazer o que for preciso onde exigir
o token*/

import jwt from "jsonwebtoken";
/*
o promisify permiti que funcoes que usar funções de calback antigas use o conceito de asyn/await
nesse caso o verify usaria o modulo antigo
*/
import { promisify } from "util";

import autenticacao from "../../config/autenticacao";

export default async (req, res, next) => {
  const autorizacaoHeader = req.headers.autorizacao;

  if (!autorizacaoHeader) {
    return res.status(401).json({ erro: "Token não fornecido!" });
  }

  const [, token] = autorizacaoHeader.split(" ");

  try {
    const decodifica = await promisify(jwt.verify)(token, autenticacao.secret);

    /**
   *importante: Acressenta o id do decodifica dentro do req.userId,
   assim é  possivel  usar esse id em outras rotas que precise de um
   id como um paramento para acessar os dados no banco, importante usar
   nos edits - tokens diferentes trazem o mesmo id desde que seja do mesmo usuario
   **/
    req.userId = decodifica.id; // o req aqui pertence a (req, res, next)
    //*Qualquer token pode ser usado, menos na edição pois nesse caso dira que o usuario já está  cadastrado

    console.log("Id do token: ", req.userId);

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
