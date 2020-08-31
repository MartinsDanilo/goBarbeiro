import {
    startOfDay,
    endOfDay,
    parseISO
} from 'date-fns';
import {
    Op
} from 'sequelize';

import Agendamento from "../models/Agendamento";
import Usuario from "../models/Usuario";

class CompromissoController {
    async index(req, res) {

        // console.log(req.userId);

        // debugger

        const verificaServidor = await Usuario.findOne({
            where: {
                id: req.userId,
                barbeiro: true
            }
        })

        if (!(verificaServidor)) {
            return res.status(400).json({
                error: "Usuario nao eh um Servidor!"
            })
        }

        const {
            data
        } = req.query;
        const dataAnalizada = parseISO(data);

        const compromissos = await Agendamento.findAll({
            where: {
                servidor_id: req.userId,
                canceled_at: null,
                data: {
                    [Op.between]: [startOfDay(dataAnalizada), endOfDay(dataAnalizada)],
                },
            },
            include: [{
                model: Usuario,
                as: 'usuarios',
                attributes: ['id', 'nome'],
            }, ],
            order: ['data']
        })
        debugger

        return res.json(compromissos)
    }

}

export default new CompromissoController();