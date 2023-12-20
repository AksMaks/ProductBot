const Router = require('express');
const router = new Router();
const contriller = require("../contollers/orderController")
const {check} = require("express-validator");
const authMiddleware = require('../middlewaree/authMiddleware')
const validatorMiddleware = require('../middlewaree/validatorMiddleware')

router.post("/create", [
    check("clientId", "clientId не может быть пустым").notEmpty(),
    check("clientId", "clientId должен быть числом").isNumeric(),
    check("address", "address не может быть пустым").notEmpty(),
    check("date", "date не может быть пустым").notEmpty()
], validatorMiddleware, authMiddleware, contriller.create)

router.get("/get", [
    check("orderId", "orderId не может быть пустым").notEmpty(),
    check("orderId", "orderId должен быть числом").isNumeric()
], validatorMiddleware, authMiddleware, contriller.get)

router.get("/gets", validatorMiddleware, authMiddleware, contriller.gets)

router.post("/update", [
    check("orderId", "orderId не может быть пустым").notEmpty(),
    check("orderId", "orderId должен быть числом").isNumeric(),
    check("approved", "orderId не может быть пустым").notEmpty(),
    check("delivered", "delivered не может быть пустым").notEmpty(),
], validatorMiddleware, authMiddleware, contriller.update)

module.exports = router;