const ensureAuthenticated = require('../Middleware/authmi');
const express = require('express');
const router=express.Router();
router.get('/',ensureAuthenticated,(req,resp)=>{
    resp.status(200).json([
        {
            name:"Mobile",
            price:11000
        },
        {
            name:"Television",
            price:22000
        },
    ])
});
module.exports = router;