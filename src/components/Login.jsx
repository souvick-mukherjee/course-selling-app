import React from "react";
import { Typography } from "@mui/material";
import {Box} from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate=useNavigate();
    const setUser=useSetRecoilState(userState);

    return <div>
        
        <center><div style={{paddingTop:150}}><Typography variant="h4">Welcome Back Admin</Typography></div></center>
        <center>
            
            <Box  sx={{width:'400px',padding:'10px',border:'2px solid grey'}}>
                <TextField variant="outlined" label="Email" fullWidth onChange={(e)=>{setEmail(e.target.value)}}></TextField>
                <br /><br />
                <TextField variant="outlined" label="Password" fullWidth onChange={(e)=>{setPassword(e.target.value)}} type="password"></TextField>
                <br /><br />
                <Button size="large" variant="contained"
                onClick={()=>{fetch('http://localhost:3000/admin/login',{
                    method:'POST',
                    body:JSON.stringify({username:email,password:password}),
                    headers:{"Content-type":"application/json"}
                }).then((resp)=>{
                    resp.json().then((data)=>{
                        console.log(data);
                        localStorage.setItem("token",data.token);
                        setUser({
                            userEmail:email,
                            isLoading: false
                        })
                        navigate('/courses');
                    })})
                    }}>Login</Button>
            </Box>
        </center>
    </div>
}

export default Register;