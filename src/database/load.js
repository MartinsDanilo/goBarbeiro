import Sequelize from "sequelize";
import mongoose from 'mongoose';

import Usuario from "../app/models/Usuario";
import Arquivo from "../app/models/Arquivo";
import Agendamento from "../app/models/Agendamento"

import configuracaoBanco from "../config/database";

console.log("Entrando no load");

const models = [Usuario, Arquivo, Agendamento];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }
  init() {
    this.connection = new Sequelize(configuracaoBanco);

    models
      .map((m) => m.init(this.connection))
      .map((m) => m.associacao && m.associacao(this.connection.models)); // o primeiro m.associate é um condiciona, so faz ISSO se ISSO existir
  }
  mongo() {
    this.conexaoMongo = mongoose.connect(
      'mongodb://localhost:27017/gobarbeiro', {
        useNewUrlParser: true,
        useFindAndModify: true
      }
    );
  }
}

export default new Database();