import React from "react";
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ShowCourses() {
     const [courses, setCourses] = React.useState([]);
    React.useEffect(()=>{
        fetch('http://localhost:3000/admin/courses',{
            method:'GET',
            headers:{'Content-type':'application/json','Authorization':"Bearer "+localStorage.getItem("token")}
        }).then((resp)=>{
            resp.json().then((data)=>{
                setCourses(data);
            })
        })
    },[])

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        
        
        {courses.map(c =>{
            
            return <Course course={c} />
            })}
    </div>
}

export function Course(props) {

    const navigate=useNavigate();
    return <Card style={{margin:10,padding:4,width:300,minHeight:275}}>
        <img src="" alt="" />
        <Typography variant="h6" textAlign={'center'}>{props.course.title}</Typography>
        <Typography variant="subtitle1">{props.course.description}</Typography>
        <Typography variant="subtitle2">Price: {props.course.price}</Typography>
        <img src={props.course.imagelink} style={{width: 275}} />
        <Button variant="contained" onClick={()=>{navigate('/courses/'+props.course._id)}}>Edit</Button>
        </Card>
    
   
        
    
}

export default ShowCourses;