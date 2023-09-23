const express=require('express');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const {Admin,User,Course}=require('../db/database');
const {SECRET}=require('../middleware/auth');
const {authenticateJwt}=require('../middleware/auth')

const route=express.Router();

route.get('/admin/me', authenticateJwt, async (req,res)=>{
    const admin=await Admin.findOne({username:req.user.username});
    if(!admin){
        res.status(403).send('Admin does not exist');
    return;
    }
    
    res.json({username: admin.username});
    });

    route.post('/admin/signup', async (req, res) => {
        // logic to sign up admin
        const {username,password}=req.body;
        const admin= await Admin.findOne({username,password});
        if(admin){
          res.status(403).json({message:"Admin already exists"});
        }else{
          const obj={username:username,password:password};
          const newAdmin=new Admin(obj);
          newAdmin.save();
          const token=jwt.sign({username,role:'admin'},SECRET,{expiresIn:'1h'});
          res.status(200).json({message:"Admin created successfully",token});
        }
      
      });
      
      route.post('/admin/login', async (req, res) => {
        // logic to log in admin
        const {username,password}=req.body;
        const admin=await Admin.findOne({username,password});
        if(admin){
          const token=jwt.sign({username,role:'admin'},SECRET,{expiresIn:'1h'});
          res.json({message:"Admin logged in successfully",token});
        }else{
          res.status(403).json({message:"Invalid user or password"});
        }
      
      });
      
      route.post('/admin/courses', authenticateJwt, async (req, res) => {
        // logic to create a course
        const newCourse= new Course(req.body);
        await newCourse.save();
        res.json({message:"New course created"});
      });
      
      route.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
        // logic to edit a course
        const course=await Course.findByIdAndUpdate(req.params.courseId,req.body,{new:true});
        if(course){
          res.json({message:"Course updated successfully"});
        }else{
          res.status(404).json({message:"Course not found"});
        }
      
      });

      route.get('/course/:courseId', authenticateJwt, async (req, res) => {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        res.json({ course });
      });
    
      
      route.get('/admin/courses', authenticateJwt, async (req, res) => {
        // logic to get all courses
        const courses= await Course.find({});
        res.json(courses);
      });

      module.exports=route;