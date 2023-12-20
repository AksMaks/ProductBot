const Router = require('express');
const router = new Router();
const contriller = require("../contollers/categoryController")
const {check} = require("express-validator");
const authMiddleware = require('../middlewaree/authMiddleware')
const validatorMiddleware = require('../middlewaree/validatorMiddleware')

router.post("/create", [
    check("categoryName", "Название не может быть пустым").notEmpty(),
    check("categoryName", "Длина названия должен быть в дапазаоне от 4 до 30").isLength({min:4, max: 30})
], validatorMiddleware, authMiddleware, contriller.create)

router.get("/get", [
    check("categoryId", "categoryId не может быть пустым").notEmpty(),
    check("categoryId", "categoryId должен быть числом").isNumeric()
], validatorMiddleware, authMiddleware, contriller.get)

router.get("/gets", validatorMiddleware, authMiddleware, contriller.gets)

router.post("/update",  [
    check("categoryId", "categoryId не может быть пустым").notEmpty(),
    check("categoryId", "categoryId должен быть числом").isNumeric(),
    check("categoryName", "categoryName не может быть пустым").notEmpty(),
    check("categoryName", "Длина categoryName должен быть в дапазаоне от 4 до 30").isLength({min:4, max: 30})
], validatorMiddleware, authMiddleware, contriller.update)

router.post("/delete",  [
    check("categoryId", "categoryId не может быть пустым").notEmpty(),
    check("categoryId", "categoryId должен быть числом").isNumeric()
], validatorMiddleware, authMiddleware, contriller.delete)

module.exports = router;