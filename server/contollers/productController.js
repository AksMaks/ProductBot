const db = require("../db/db.js");

class clientController {
    async create(req, res) {
        try{
            const {productName, categoryId} = req.body

            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    INSERT INTO public.product
                    (name, category_id)
                    VALUES(?, ?);
                    `,
                    {replacements: [productName, categoryId]},
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
            const {productId} = req.body

            let products;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT 
                        id,
                        name,
                        category_id
                    FROM public.product      
                    WHERE id = ?;
                    `,
                    {replacements: [productId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    products = result[0]
                })
            })
            return res.json(products)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async gets(req, res) {
        try{
            let products;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT 
                        id,
                        name,
                        category_id
                    FROM public.product
                    `,
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    products = result[0]
                })
            })
            return res.json(products)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async update(req, res) {
        try{
            const {productId, categoryId, name} = req.body

            let products;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(
                    `
                    UPDATE product
                    SET name = ?, category_id = ?
                    WHERE id = ?;
                    `,
                    {replacements: [name, categoryId, productId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    products = result[0]
                })
            })
            return res.json(products)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async delete(req, res) {
        try{
            const {productId} = req.body

            let products;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(
                    `
                    UPDATE product
                    SET active = false
                    WHERE id = ?;
                    `,
                    {replacements: [productId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    products = result[0]
                })
            })
            return res.json(products)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
}
module.exports = new clientController();