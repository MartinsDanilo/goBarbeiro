import jwt from "jsonwebtoken";
import autenticacao from "../../config/autenticacao";

export class JwtHelper {
  static sign(id) {
    return jwt.sign({ id }, autenticacao.secret, {
      expiresIn: autenticacao.expiresIn,
    })
  }
}