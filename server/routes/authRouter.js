const Router = require('express');
const router = new Router();
const contriller = require("../contollers/authController")
const {check} = require("express-validator");
const authMiddleware = require('../middlewaree/authMiddleware')

router.post("/registration", [
    check("login", "Логин не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть в доапазаоне от 4 до 12").isLength({min:4, max: 12})
], contriller.registration)
router.post("/login", contriller.login)
router.get("/user", authMiddleware, contriller.getUser)

module.exports = router;