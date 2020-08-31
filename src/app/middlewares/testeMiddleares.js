export default async (req, res, next) => {
  console.log("Testando o funcionamento dos Middleares!");
  const autorizacaoHeader = req.headers.autorizacao;

  if (!autorizacaoHeader) {
    return res.status(401).json({ error: "Token não fornecido!" });
  }
  //removendo o Bearer do token
  const [, token] = autorizacaoHeader.split(" ");

  console.log("Autorização:", autorizacaoHeader);

  return next();
};
