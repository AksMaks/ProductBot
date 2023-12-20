const Router = require('express');
const router = new Router();
const contriller = require("../contollers/authController")
const {check} = require("express-validator");
const authMiddleware = require('../middlewaree/authMiddleware')
const validatorMiddleware = require('../middlewaree/validatorMiddleware')

router.post("/registration", [
    check("login", "Логин не может быть пустым").notEmpty(),
    check("password", "Длина пароль должен быть в доапазаоне от 4 до 12").isLength({min:4, max: 12})
], validatorMiddleware, contriller.registration)
router.post("/login", [
    check("login", "Логин не может быть пустым").notEmpty(),
    check("password", "Пароль не может быть пустым").notEmpty()
], validatorMiddleware, contriller.login)
router.get("/user",  [
    check("userId", "userId не может быть пустым").notEmpty(),
    check("userId", "userId должен быть числом").isNumeric()
], validatorMiddleware, authMiddleware, contriller.getUser)

module.exports = router;