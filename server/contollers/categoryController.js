const db = require("../db/db.js");

class clientController {
    async create(req, res) {
        try{
            const {categoryName} = req.body

            let Row;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    INSERT INTO public.category
                    (name)
                    VALUES(?);
                    `,
                    {replacements: [categoryName]},
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
            const {categoryId} = req.body

            let categories;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT 
                        id,
                        name
                    FROM public.category      
                    WHERE id = ?;
                    `,
                    {replacements: [categoryId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    categories = result[0]
                })
            })
            return res.json(categories)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async gets(req, res) {
        try{
            let categories;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT 
                        id,
                        name
                    FROM public.category
                    `,
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    categories = result[0]
                })
            })
            return res.json(categories)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async update(req, res) {
        try{
            const {categoryId, name} = req.body

            let categories;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(
                    `
                    UPDATE category
                    SET name = ?
                    WHERE id = ?;
                    `,
                    {replacements: [name, categoryId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    categories = result[0]
                })
            })
            return res.json(categories)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    
    async delete(req, res) {
        try{
            const {categoryId} = req.body

            let categories;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(
                    `
                    UPDATE category
                    SET active = false
                    WHERE id = ?;
                    `,
                    {replacements: [categoryId]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    categories = result[0]
                })
            })
            return res.json(categories)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }

    
}
module.exports = new clientController();