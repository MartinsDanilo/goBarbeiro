import * as Yup from "yup";
import {
    startOfHour,
    parseISO,
    isBefore,
    format,
    subHours
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Usuario from "../models/Usuario";
import Arquivo from "../models/Arquivo";
import Agendamento from "../models/Agendamento";
import Notificacao from "../schemas/Notificacao"

class AgendamentoController {
    async store(req, res) {
        const schema = Yup.object().shape({
            servidor_id: Yup.number().required(),
            data: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: "Validacao Falhou!",
            });
        }

        const {
            servidor_id,
            data
        } = req.body;

        const checarServidor = await Usuario.findOne({
            where: {
                id: servidor_id,
                barbeiro: true,
            },
        });

        if (!checarServidor) {
            return res.status(400).json({
                error: "Voce so pode agendar com servidores",
            });
        }

        const horaEscolhida = startOfHour(parseISO(data));

        console.log(horaEscolhida, new Date());

        if (isBefore(horaEscolhida, new Date())) {
            return res.status(400).json("Datas anteriores nao sao permitidas");
        }

        /*
                    Verifica se se eh um id de servidor, cancelado eh null
                    e se o horio no banco eh o mesmo que horarioEscolhido
                */
        const checarDisponibilidade = await Agendamento.findOne({
            where: {
                servidor_id,
                canceled_at: null,
                data: horaEscolhida,
            },
        });
        /*
                    Se checarDisponibilidade for verdade seiguinifa que o 
                    horaio nao esta disponivel
                */
        if (checarDisponibilidade) {
            res.status(400).json({
                error: "A data de compromisso nao esta disponivel",
            });
        }
        const agendamento = await Agendamento.create({
            usuario_id: req.userId,
            servidor_id,
            data,
        });

        return res.json(agendamento);
    }

    async index(req, res) {
        const {
            page = 1
        } = req.query;

        const agendamentos = await Agendamento.findAll({
            where: {
                usuario_id: req.userId,
                canceled_at: null, //pois so desejo mostrar o horaio de que esteja logado
            },
            order: ["data"],
            attributes: ["id", "data"],
            limit: 20,
            offset: (page - 1) * 20,

            /*Incluir o Model Arquivo fora do Include Usuario accarreta em erro */
            include: [{
                model: Usuario,
                as: "servidor",
                attributes: ["id", "nome"],
                include: [{
                    model: Arquivo,
                    as: "avatar",
                    attributes: ["id", "path", "url"],
                }, ],
            }, ],
        });

        /**
         * Criando Agendamento
         */
        const agendamento = await Agendamento.create({
            usuario_id: req.userId,
            servidor_id,
            data: hourStart,
        });

        /**
         * Notificando agendamento ao servidor
         */
        const usuario = await Usuario.findByPk(req.userId);
        const formattedDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', às' H:mm'h'", {
                locale: ptBR
            },
        );

        await Notificacao.create({
            content: `Novo agendamento de ${ usuario.nome } para ${ formattedDate }`,
            usuario: servidor_id,
        });

        return res.json(agendamentos);
    }
}

export default new AgendamentoController();