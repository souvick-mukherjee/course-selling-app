import {useState} from "react";
import { Card,Button } from "@mui/material";
import {TextField} from "@mui/material";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [title, setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [imagelink,setImagelink]=useState("");
    const [price,setPrice]=useState(0); 

    return <div style={{display:'flex',justifyContent:'center', flexDirection: "column",alignItems:"center",margin:"auto"}}>
        <h1>Create Courses</h1>
        
        <Card variant='outlined' style={{width:400, padding:15}}>
            <TextField variant="outlined" label="Title" fullWidth style={{margin:6}} onChange={(e)=>{setTitle(e.target.value)}}/>
            <TextField variant="outlined" label="Description" fullWidth style={{margin:6}} onChange={(e)=>{setDescription(e.target.value)}}/>
            <TextField variant="outlined" label="Image link" fullWidth style={{margin:6}} onChange={(e)=>{setImagelink(e.target.value)}}/>
            <TextField variant="outlined" label="Price" fullWidth style={{margin:6}} onChange={(e)=>{setPrice(e.target.value)}}/>
            <Button variant="contained" style={{margin:6}}
            onClick={()=>{
                fetch("http://localhost:3000/admin/courses",{
                    method:'POST',
                    body:JSON.stringify({
                        title:title,
                        description:description,
                        imagelink:imagelink,
                        price:price,
                        published: true
                    }),
                    headers:{
                        "Content-type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem('token')
                    }
                }).then((resp)=>{
                    resp.json().then((data)=>{
                        console.log(data.message);
                    });
                });
            }}
            >Add Course</Button>
        </Card>
    </div>
}
export default CreateCourse;