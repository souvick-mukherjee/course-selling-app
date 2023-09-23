const express=require('express');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const {Admin,User,Course}=require('../db/database');
const {SECRET}=require('../middleware/auth');
const {authenticateJwt}=require('../middleware/auth')

const route=express.Router();
route.post('/users/signup', async (req, res) => {
    // logic to sign up user
    const {username,password}=req.body;
    const user = await User.findOne({username});
    if(user){
      res.status(403).json({message:"User already exists"});
    }else{
      const newUser= new User({username,password});
      newUser.save();
      const token=jwt.sign({username,role:'user'},SECRET,{expiresIn:'1h'});
      res.json({message: "User created successfully",token});
    }
    
  });
  
  route.post('/users/login', async (req, res) => {
    // logic to log in user
    const {username,password}=req.body;
    const user = await User.findOne({username,password});
    if(user){
      const token=jwt.sign({username,role:'user'},SECRET,{expiresIn:'1h'});
      res.json({message:"User logged in successfully",token});
    }else{
      res.status(403).json({message:"Invalid username or password"});
    }
  });
  
  route.get('/users/courses', authenticateJwt, async (req, res) => {
    // logic to list all courses
    const courses=await Course.find({published:true});
    res.json(courses);
  });
  
  route.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
    // logic to purchase a course
    const course = await Course.findById(req.params.courseId);
    if(course){
      const user= await User.findOne({username:req.user.username});
      if(user){
        user.purchasedCourses.push(course);
        await user.save();
        res.json({message:"Course purchased successfully"});
      }else{
        res.status(403).json({message:"User not found"});
      }
    }else{
      res.status(404).json({message:"Course not found"});
    }
  });
  
  route.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
    // logic to view purchased courses
    const user=await User.findOne({username:req.user.username}).populate('purchasedCourses');
    if(user){
      res.json({purchasedCourses:user.purchasedCourses||[]});
    }else{
      res.status(403).json({message:"User not found"});
    }
  
  });
  

module.exports=route;