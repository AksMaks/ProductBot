const Router = require('express');
const router = new Router();
const contriller = require("../contollers/productAdditiveController")
const {check} = require("express-validator");
const authMiddleware = require('../middlewaree/authMiddleware')
const validatorMiddleware = require('../middlewaree/validatorMiddleware')

router.post("/create", [
    check("variantId", "variantId не может быть пустым").notEmpty(),
    check("variantId", "variantId должен быть числом").isNumeric(),
    check("productAdditiveName", "productAdditiveName не может быть пустым").notEmpty(),
    check("productAdditiveName", "Длина productAdditiveName должен быть в дапазаоне от 4 до 30").isLength({min:4, max: 30})
], validatorMiddleware, authMiddleware, contriller.create)

router.get("/get", [
    check("productAdditiveId", "productAdditiveId не может быть пустым").notEmpty(),
    check("productAdditiveId", "productAdditiveId должен быть числом").isNumeric()
], validatorMiddleware, authMiddleware, contriller.get)

router.get("/gets", validatorMiddleware, authMiddleware, contriller.gets)

router.post("/update",  [
    check("productAdditiveId", "productAdditiveId не может быть пустым").notEmpty(),
    check("productAdditiveId", "productAdditiveId должен быть числом").isNumeric(),
    check("variantId", "variantId не может быть пустым").notEmpty(),
    check("variantId", "variantId должен быть числом").isNumeric(),
    check("productAdditiveName", "productAdditiveName не может быть пустым").notEmpty(),
    check("productAdditiveName", "Длина productAdditiveName должен быть в дапазаоне от 4 до 30").isLength({min:4, max: 30})
], validatorMiddleware, authMiddleware, contriller.update)

router.post("/delete",  [
    check("productAdditiveId", "productAdditiveId не может быть пустым").notEmpty(),
    check("productAdditiveId", "productAdditiveId должен быть числом").isNumeric()
], validatorMiddleware, authMiddleware, contriller.delete)

module.exports = router;