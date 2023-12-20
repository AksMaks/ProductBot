const {validationResult} = require("express-validator");
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: 'Ошибки во входных данных', errors: errors})
        }
        next()
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: "Ошибки во входных данных"})
    }
};