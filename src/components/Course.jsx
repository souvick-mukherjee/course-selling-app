import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Card,Typography,TextField } from "@mui/material";
import {Button, Grid} from "@mui/material";
import { courseState } from "../store/atoms/course";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { courseImage, coursePrice, courseTitle, isCourseLoading } from "../store/selectors/course";

function Course(){
    let {courseId}=useParams();
    const setCourse = useSetRecoilState(courseState);
    const courseLoading=useRecoilValue(isCourseLoading);
    
    useEffect(()=>{
        fetch(`http://localhost:3000/admin/courses/${courseId}`,{
            method:'GET',
            headers:{'Content-type':'application/json','Authorization':"Bearer "+localStorage.getItem("token")}
        }).then((resp)=>{
            resp.json().then((data)=>{
                setCourse({isLoading: false, course: data});
            }).catch(e=>{setCourse({isLoading:false, course:null})});
        })
    },[])
        
    
    if(courseLoading){
        return <div>
            Loading...
        </div>
    }


    return<div>
        <GrayTopper  />

        <Grid container>
        <Grid item lg={8} md={12} sm={12}>
        <UpdateCard />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
        <CourseCard />
        </Grid>
        </Grid>
    </div>
}

function GrayTopper(){
   const title=useRecoilValue(courseTitle);

return<div style={{height:250, background:'#212121', top:0, width:'100vw', zIndex:0, marginBottom:-190}}>
    <div style={{height:250, display:'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <div>
            <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
            {title}
            </Typography>
        </div>
    </div>
</div>

}

function CourseCard() {
    const title=useRecoilValue(courseTitle);
    const imagelink=useRecoilValue(courseImage);

    return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
    <Card style={{margin: 80,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2}}>
        <img src={imagelink} style={{width: 350}} ></img>
        <div style={{marginLeft: 10}}>
            <Typography variant="h5">{title}</Typography>
            <Price/>
        </div>
        </Card>
        </div>
    }
function Price(){
    const price=useRecoilValue(coursePrice);
    return <>
        <Typography variant="subtitle2" style={{color: "gray"}}>
                Price
            </Typography>
            <Typography variant="subtitle1">
                <b>Rs. {price} </b>
            </Typography>
    </>
}





function UpdateCard(){

    const [courseDetails,setCourse]=useRecoilState(courseState);
    const [title, setTitle] = useState(courseDetails.course.title);
    const [description,setDescription] = useState(courseDetails.course.description);
    const [imageLink,setImageLink]=useState(courseDetails.course.imagelink);
    const [price,setPrice]=useState(courseDetails.course.price); 

    return <div style={{display:'flex',justifyContent:'center'}}>
        
        
        <Card variant='outlined' style={{width:400, padding:15, marginTop:220}}>
            <Typography>Update Course</Typography>
            <TextField variant="outlined" label="Title" value={title} fullWidth style={{margin:6}} onChange={(e)=>{setTitle(e.target.value)}}/>
            <TextField variant="outlined" label="Description" value={description} fullWidth style={{margin:6}} onChange={(e)=>{setDescription(e.target.value)}}/>
            <TextField variant="outlined" label="Image link" value={imageLink} fullWidth style={{margin:6}} onChange={(e)=>{setImageLink(e.target.value)}}/>
            <TextField variant="outlined" label="Price" value={price} fullWidth style={{margin:6}} onChange={(e)=>{setPrice(e.target.value)}}/>
            <Button variant="contained" style={{margin:6}}
            onClick={()=>{
                fetch("http://localhost:3000/admin/courses/"+courseDetails.course._id,{
                    method:'PUT',
                    body:JSON.stringify({
                        title:title,
                        description:description,
                        imagelink:imageLink,
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

                const updatedCourse={
                    _id:courseDetails.course._id,
                    title:title,
                    description:description,
                    imagelink:imageLink,
                    price:price,
                    published: true
                }
                setCourse({course: updatedCourse, isLoading:false});
            }}
            >Update Course</Button>
        </Card>
    </div>

}


export default Course