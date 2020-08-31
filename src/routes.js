import UsuarioController from "./app/controllers/UsuarioController";
import {
    Router
} from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import LoginController from "./app/controllers/LoginController";
//import testeMiddleares from "./app/middlewares/testeMiddleares";
import autenticacaoMiddleare from "./app/middlewares/autenticacaoMiddleware";
import ArquivoContoller from "./app/controllers/ArquivoContoller";
import ServidoresController from "./app/controllers/ServidoresController";
import AgendamentoController from "./app/controllers/AgendamentoController";
import CompromissoController from "./app/controllers/CompromissoController"

console.log("Entrando no routes");

const routes = new Router();
const subindo = multer(multerConfig);

routes.post("/usuario", UsuarioController.store);
routes.post("/login", LoginController.store);

//o que precisa de autenticação tem que está abaixo do middleware de autenticação
//routes.use(testeMiddleares);

routes.use(autenticacaoMiddleare);

routes.put("/usuario", /*req.userId implicito*/ UsuarioController.update);

routes.get("/servidores", ServidoresController.index);

routes.post("/agendamento", AgendamentoController.store)
routes.get("/agendamentos", AgendamentoController.index)

routes.get("/compromissos", CompromissoController.index)

routes.get("/index", UsuarioController.index);

routes.post("/arquivos", subindo.single("arquivo"), ArquivoContoller.store);
//return res.json(req.file);

module.exports = routes;