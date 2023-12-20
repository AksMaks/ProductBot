const Router = require('express');
const router = new Router();
const contriller = require("../contollers/clientController")
const {check} = require("express-validator");
const authMiddleware = require('../middlewaree/authMiddleware')
const validatorMiddleware = require('../middlewaree/validatorMiddleware')

router.post("/create", [
    check("firstName", "firstName не может быть пустым").notEmpty(),
    check("lastName", "lastName не может быть пустым").notEmpty(),
    check("chatId", "chatId не может быть пустым").notEmpty(),
    check("chatId", "chatId должен быть числом").isNumeric()
], validatorMiddleware, authMiddleware, contriller.create)

router.get("/get", [
    check("clientId", "clientId не может быть пустым").notEmpty(),
    check("clientId", "clientId должен быть числом").isNumeric()
], validatorMiddleware, authMiddleware, contriller.get)

router.get("/gets", validatorMiddleware, authMiddleware, contriller.gets)

router.post("/update",  [
    check("firstName", "firstName не может быть пустым").notEmpty(),
    check("lastName", "lastName не может быть пустым").notEmpty(),
    check("clientId", "clientId не может быть пустым").notEmpty(),
    check("clientId", "clientId должен быть числом").isNumeric()
], validatorMiddleware, authMiddleware, contriller.update)

module.exports = router;