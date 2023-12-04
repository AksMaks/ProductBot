const db = require("../db/db.js");

class clientController {
    async create(req, res) {
        try{
            const {productVariantName, productId} = req.body

            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    INSERT INTO public.product_variant
                    (name, product_id)
                    VALUES(?, ?);
                    `,
                    {replacements: [productVariantName, productId]},
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
            const {productVariantId} = req.body

            let productVariants;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT 
                        id,
                        name,
                        product_id
                    FROM public.product_variant      
                    WHERE id = ?;
                    `,
                    {replacements: [productVariantId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    productVariants = result[0]
                })
            })
            return res.json(productVariants)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async gets(req, res) {
        try{
            let productVariants;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT 
                        id,
                        name,
                        product_id
                    FROM public.product_variant
                    `,
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    productVariants = result[0]
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
            const {productVariantId, productId, name} = req.body

            let productVariants;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(
                    `
                    UPDATE product_variant
                    SET name = ?, product_id = ?
                    WHERE id = ?;
                    `,
                    {replacements: [name, productId, productVariantId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    productVariants = result[0]
                })
            })
            return res.json(productVariants)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async delete(req, res) {
        try{
            const {productVariantId} = req.body

            let productVariants;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(
                    `
                    UPDATE product_variant
                    SET active = false
                    WHERE id = ?;
                    `,
                    {replacements: [productVariantId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    productVariants = result[0]
                })
            })
            return res.json(productVariants)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
}
module.exports = new clientController();