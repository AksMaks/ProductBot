const db = require("../db/db.js");
const {validationResult} = require("express-validator");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require("dotenv").config();
const secret = process.env.SECRET_TOKEN;

const generateAccessToken = (userId) => {
    const payload = {
        userId
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Ошибки при регистрации', errors: errors})
            }

            const {login, password} = req.body

            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT id
                    FROM public.users
                    WHERE login = ? and password = ?;
                    `,
                    {replacements: [login, password]},
                    {
                    type: db.sequelize.QueryTypes.SELECT,
                    transaction: transaction
                    }
                ).then(result => {
                    if (result[0].length = 0){
                        res.status(400).json({message: 'Пользователь с таким именем уже существует'})
                    }
                })
            })

            const hashPassword = bcrypt.hashSync(password, saltRounds);
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    INSERT INTO public.users
                    (login, "password")
                    VALUES(?, ?);            
                    `,
                    {replacements: [login, hashPassword]},
                    {type: db.sequelize.QueryTypes.INSERT,transaction: transaction}
                ).then(result => {
                    if(result[1] > 0){
                        return res.json({message: "Пользователь успешно зарегистрирован"})
                    }
                })
            })
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req, res) {
        try{
            const {login, password} = req.body

            let user;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT id, password
                    FROM public.users
                    WHERE login = ?;
                    `,
                    {replacements: [login]},
                    {type: db.sequelize.QueryTypes.SELECT,transaction: transaction}
                ).then(result => {
                    if (result[0].length > 0){

                        const validPassword = bcrypt.compareSync(password, result[0][0]["password"])
                        if(!validPassword){
                            return res.status(400).json({message: `Проверьте логин или пароль`})
                        }
                        user = result[0][0];
                    }else{
                        user = null;
                    }
                })
            })

            if (!user) {
                return res.status(400).json({message: `Проверьте логин или пароль`})
            }
            const token = generateAccessToken(user["id"])
            return res.json({token: token})
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
    async getUser(req, res) {
        try{
            const {userId} = req.body

            let user;
            await db.sequelize.transaction(async  transaction => {
                await db.sequelize.query(`
                    SELECT id, login
                    FROM public.users
                    WHERE id = ?;
                    `,
                    {replacements: [userId]},
                    {type: db.sequelize.QueryTypes.SELECT,transaction: transaction}
                ).then(result => {
                    if (result[0].length > 0){
                        user = result[0][0];
                    }else{
                        user = null;
                    }
                })
            })

            if (!user) {
                return res.status(400).json({message: `Ошибка при получении данных пользователя.`})
            }
            return res.json(user)
        }catch(e){
            console.log(e)
            res.status(400).json({message: e})
        }
    }
}
module.exports = new authController();