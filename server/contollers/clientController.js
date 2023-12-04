const db = require("../db/db.js");

class clientController {
    async create(req, res) {
        try{
            const {firstName, lastName, chatId} = req.body

            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    INSERT INTO public.client
                    (first_name, last_name, chat_id)
                    VALUES(?, ?, ?);
                    `,
                    {replacements: [firstName, lastName, chatId]},
                    {
                    type: db.sequelize.QueryTypes.INSERT,
                    transaction: transaction
                    }
                ).then(result => {
                    if (result[0][0] == 0) {
                        return res.status(400).json({message: `Проверьте входные данные`})
                    }
                })
            })
            return res.json({message:"OK"})
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }

    async get(req, res) {
        try{
            const {clientId} = req.body

            let clients;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT 
                        id,
                        first_name,
                        last_name
                    FROM public.client      
                    WHERE id = ?;
                    `,
                    {replacements: [clientId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    clients = result[0]
                })
            })
            return res.json(clients)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async gets(req, res) {
        try{
            let clients;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT 
                        id,
                        first_name,
                        last_name
                    FROM public.client
                    `,
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    clients = result[0]
                })
            })
            return res.json(clients)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async update(req, res) {
        try{
            const {firstName, lastName, clientId} = req.body

            let clients;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(
                    `
                    UPDATE client
                    SET first_name = ?, last_name = ?
                    WHERE id = ?;
                    `,
                    {replacements: [firstName, lastName, clientId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    clients = result[0]
                })
            })
            return res.json(clients)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
}
module.exports = new clientController();