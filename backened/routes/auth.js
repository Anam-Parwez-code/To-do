const { signup,login} = require('../Controller/authcont');
const { singupValidation, loginValidation } = require('../Middleware/authvalidation');
//const authvalidation = require('../Middleware/authvalidation');

const router = require('express').Router();
console.log({signup,login});
router.post('/login',loginValidation,login);
router.post('/signup',singupValidation,signup);
module.exports = router;