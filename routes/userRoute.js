const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verify = require('../middlewares/authVerify')

router.put('/:id',verify, userController.updateUserById)
router.delete('/:id', verify, userController.deleteUserById)
router.post('/', verify, userController.createUser)
router.get('/', verify,userController.getAllUsers)
router.get('/:id', verify,userController.getUserById)

module.exports = router