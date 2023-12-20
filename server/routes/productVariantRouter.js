const Router = require('express');
const router = new Router();
const contriller = require("../contollers/productVariantController")
const {check} = require("express-validator");
const authMiddleware = require('../middlewaree/authMiddleware')
const validatorMiddleware = require('../middlewaree/validatorMiddleware')

router.post("/create", [
    check("productId", "productId не может быть пустым").notEmpty(),
    check("productId", "productId должен быть числом").isNumeric(),
    check("productVariantName", "productVariantName не может быть пустым").notEmpty(),
    check("productVariantName", "Длина productVariantName должен быть в дапазаоне от 4 до 30").isLength({min:4, max: 30})
], validatorMiddleware, authMiddleware, contriller.create)

router.get("/get", [
    check("productVariantId", "productId не может быть пустым").notEmpty(),
    check("productVariantId", "productId должен быть числом").isNumeric()
], validatorMiddleware, authMiddleware, contriller.get)

router.get("/gets", validatorMiddleware, authMiddleware, contriller.gets)

router.post("/update",  [
    check("productVariantId", "productVariantId не может быть пустым").notEmpty(),
    check("productVariantId", "productVariantId должен быть числом").isNumeric(),
    check("productId", "productId не может быть пустым").notEmpty(),
    check("productId", "productId должен быть числом").isNumeric(),
    check("productVariantName", "productVariantName не может быть пустым").notEmpty(),
    check("productVariantName", "Длина productVariantName должен быть в дапазаоне от 4 до 30").isLength({min:4, max: 30})
], validatorMiddleware, authMiddleware, contriller.update)

router.post("/delete",  [
    check("productVariantId", "productVariantId не может быть пустым").notEmpty(),
    check("productVariantId", "productVariantId должен быть числом").isNumeric()
], validatorMiddleware, authMiddleware, contriller.delete)

module.exports = router;