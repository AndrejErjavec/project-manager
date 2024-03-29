const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const {errorHandler} = require('../middleware/errorMiddlewre');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
  const {firstName, lastName, username, email, password} = req.body
  if (!firstName || !lastName || !username || !email || !password) {
    return errorHandler({err: 'Please fill all fields', req, res, status: 400})
  }

  const userWithEmail = await User.findByEmail(email);
  if (userWithEmail.length > 0) {
    return errorHandler({err:'User already exists', req, res, status: 400})
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //let user = new User(firstName, lastName, username, email, hashedPassword);
  const user = await User.create(firstName, lastName, username, email, hashedPassword);
  const id = user.insertId;

  if (user.affectedRows > 0) {
    res.status(201).json({
      id: id,
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      token: User.generateToken(id),
      message: 'Register successfull'
    });
  }
  else {
    return errorHandler({err: 'Invalid user data', req, res, status: 400});
  }

});

const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  const users = await User.findByEmail(email);
    
  if (users.length == 0) {
    return errorHandler({err:'User not found', req, res, status: 404})
    // res.status(404).json({'error': 'User not found'});
  }

  const user = users[0];
  const pass = await User.validatePassword(password, user.password);

  if (!pass) {
    return errorHandler({err:'Incorrect password', req, res, status: 404})
  }
  
  if (user && pass) {
    res.status(201).json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.e_mail,
      token: User.generateToken(user.id),
      message: 'Login successfull'
    })
  }
  // else {
  //  res.status(400);
  //  throw new Error("Invalid credentials");
  // }
});

const updateUser = asyncHandler(async (req, res) => {

});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.query.id;
  const deletedUser = await User.delete(id);

  if (deletedUser.affectedRows > 0) {
    res.status(200).json({
      message: 'User deleted successfully'
    });
  }
})

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  res.status(200).json(user);
});

const getAll = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

const getUserByEmail = asyncHandler(async (req, res) => {
  const user = await User.findByEmail(req.query.email);
  res.status(200).json(user);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.query.id);
  res.status(200).json({
    id: user[0].id,
    first_name: user[0].first_name,
    last_name: user[0].last_name,
    username: user[0].username,
    email: user[0].e_mail,
    token: User.generateToken(user.id)
  });
})


module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getMe, 
  getAll,
  getUserByEmail,
  getUserById
}