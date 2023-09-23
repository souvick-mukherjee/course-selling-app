const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const adminRouter=require('./routes/admin');
const userRouter=require('./routes/user');

const app=express();

app.use(cors());
app.use(express.json());

app.use('/admin',adminRouter);
app.use('/user',userRouter);

mongoose.connect('mongodb://localhost:27017/courses');

app.listen(3000,()=>{
console.log('Server running on port 3000')
});
