import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const {fullName, email, password, username} = req.body;
    const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if(!emailRegex.test(email)){
      return res.status(400).json({message:"Invalid email format"})
    }

    const existingUser=await User.findOne({username})
    
    if(existingUser){
      return res.status(400).json({message:"Username is already taken"})
    }

    const existingEmail=await User.findOne({email})
    
    if(existingEmail){
      return res.status(400).json({message:"Email is already taken"})
    }

    //hash password 
    //123456=>@c%cj67nm,ccx76453hjcbds
    
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const newUser = new User({
      fullName, // fullName:fullName,
      username, // username:username,
      email,  // email: email,
      password:hashedPassword,
    })

    if(newUser){
      generateTokenAndSetCookie(newUser._id,res)
      await newUser.save()
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      })
    }else{
      res.status(400).json({message:"Invalid user data"})
    }
  } catch (error) {
    console.log("Error in signup controller",error.message)
    res.status(500).json({message:"Internal server error"})
  }
  };
  
  export const login = async (req, res) => {
    res.json({
      data: "Login route",
    });
  };
  
  export const logout = async (req, res) => {
    res.json({
      data: "Logout route",
    });
  };
  