const db = require("../db/db.js");

class clientController {
    async create(req, res) {
        try{
            const {productAdditiveName, variantId} = req.body

            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    INSERT INTO public.product_additive
                    (name, variant_id)
                    VALUES(?, ?);
                    `,
                    {replacements: [productAdditiveName, variantId]},
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
            const {productAdditiveId} = req.body

            let productAdditives;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT 
                        id,
                        name,
                        vatiant_id
                    FROM public.product_additive      
                    WHERE id = ?;
                    `,
                    {replacements: [productAdditiveId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    productAdditives = result[0]
                })
            })
            return res.json(productAdditives)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async gets(req, res) {
        try{
            let productAdditives;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT 
                        id,
                        name,
                        variant_id
                    FROM public.product_additive
                    `,
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    productAdditives = result[0]
                })
            })
            return res.json(productAdditives)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async update(req, res) {
        try{
            const {productAdditiveId, variantId, name} = req.body

            let productAdditives;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(
                    `
                    UPDATE product_additive
                    SET name = ?, variant_id = ?
                    WHERE id = ?;
                    `,
                    {replacements: [name, variantId, productAdditiveId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    productAdditives = result[0]
                })
            })
            return res.json(productAdditives)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async delete(req, res) {
        try{
            const {productAdditiveId} = req.body

            let productAdditives;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(
                    `
                    UPDATE product_additive
                    SET active = false
                    WHERE id = ?;
                    `,
                    {replacements: [productAdditiveId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    productAdditives = result[0]
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