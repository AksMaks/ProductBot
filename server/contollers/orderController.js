const db = require("../db/db.js");

class clientController {
    async create(req, res) {
        try{
            const {clientId, address, date, list} = req.body

            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    INSERT INTO public.orders
                    (client_id, address, date)
                    VALUES(?, ?, ?);
                    `,
                    {replacements: [clientId, address, date]},
                    {
                    type: db.sequelize.QueryTypes.INSERT,
                    transaction: transaction
                    }
                )
                let orderId;
                await db.sequelize.query(`
                    SELECT id 
                    FROM public.orders
                    WHERE client_id = ? 
                    ORDER BY ID DESC
                    LIMIT 1
                    `,
                    {replacements: [clientId]},
                    {
                    type: db.sequelize.QueryTypes.INSERT,
                    transaction: transaction
                    }
                ).then(result => {
                    orderId = result[0][0]["id"]
                })
                console.log(orderId)
                //пербразование входящего массива в sql строку для загрузки в бд
                let sql_order_list = list.map(el => {
                    return "('"+orderId+"','"+el["variant_id"]+"','"+el["number"]+"')"
                }).join(',')

                await db.sequelize.query(`
                    INSERT INTO public.order_list
                    (order_id, variant_id, number)
                    VALUES`+sql_order_list,
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
            const {orderId} = req.body

            let orders_list;
            let order;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT id, order_id, variant_id
                    FROM public.order_list                  
                    WHERE order_id = ?;
                    `,
                    {replacements: [orderId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    orders_list = result[0]
                })

                await db.sequelize.query(`
                    SELECT id, address, client_id, "date", approved, delivered
                    FROM public.orders      
                    WHERE id = ?;
                    `,
                    {replacements: [orderId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    order = result[0]
                })
                
            })
            return res.json({...order[0], list: orders_list})
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async gets(req, res) {
        try{
            let orders;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT id, address, client_id, "date", approved, delivered
                    FROM public.orders;                
                    `,
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    orders = result
                })
            })
            return res.json(orders)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async update(req, res) {
        try{
            const {orderId, approved, delivered} = req.body

            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(
                    `
                    UPDATE orders
                    SET approved = ?, delivered = ?
                    WHERE id = ?;
                    `,
                    {replacements: [approved, delivered, orderId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
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
}
module.exports = new clientController();