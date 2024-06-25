const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/worko/user', userController.listUsers);
router.get('/worko/user/:userId', userController.getUser);
router.post('/worko/user', userController.createUser);
router.put('/worko/user/:userId', userController.updateUser);
router.patch('/worko/user/:userId', userController.updateUser);
router.delete('/worko/user/:userId', userController.deleteUser);

module.exports = router;
