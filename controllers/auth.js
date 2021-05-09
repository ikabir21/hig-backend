import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { validateRegistration, validateLogin } from "../validation/validate.js";

export const signup = async (req, res) => {
  //Validate with Joi
  const { error } = validateRegistration(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  try {
    //Existing user checking
    const isEmailExist = await User.findOne({email: req.body. email});
    if(isEmailExist) return res.status(400).json({message:  "Email already exists"});
    if(req.body.password!==req.body.confirmPassword) return res.status(400).json({message: "Password mismatch"})
    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.  password, salt);

    //Save user data
    const newUser = new User({
      givenName: req.body.givenName,
      familyName: req.body.familyName,
      email: req.body.email,
      password: hashedPassword
    });
    const result = await User.create(newUser);
    const token = jwt.sign({_id: result._id, email: result.email},  process.env.SECRET);
    res.status(201).json({result, token});
  } catch (error) {
    res.status(500).json({error});
  }
}

export const login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  try {
    //Existing user checking
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({message: "Email or password is wrong"});

    //Match password
    const isValidPassword = await bcrypt.compare(req.body.  password, user.password);

    if(!isValidPassword) return res.status(400).json({message:  "Invalid password"});

    //JWT tokens
    const token = jwt.sign({_id: user._id, email: user.email},  process.env.SECRET);
    res.status(200).json({result: user, token});
  } catch (error) {
    res.status(500).json({message: "Something went wrong"});
  }
}