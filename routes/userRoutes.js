const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateSelf,
  deleteSelf,
} = require('../controllers/userController');
const {
  signup,
  login,
  protect,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authController');

//Router
const router = express.Router();

//Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.patch('/resetpassword/:token', resetPassword);
router.patch('/updatepassword', protect, updatePassword);
router.patch('/updateself', protect, updateSelf);
router.delete('/deleteSelf', protect, deleteSelf);
router.route('/').get(protect, getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
