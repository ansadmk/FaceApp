const { age } = require('../controllers/user')
const router=require('express').Router()
router.post('/age',age)
module.exports=router