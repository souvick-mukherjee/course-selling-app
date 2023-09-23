import {Typography}  from "@mui/material";
import {Button} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/atoms/user";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userEmailState } from "../store/selectors/userEmail";

function Appbar(){
    const navigate=useNavigate();
    const userLoading=useRecoilValue(isUserLoading);
    const userEmail=useRecoilValue(userEmailState);
    const setUser=useSetRecoilState(userState);

    if(userLoading){
        return<></>
    }

   
    if(userEmail){
        return<div style={{display:"flex",justifyContent:"space-between"}}> 
        <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                navigate("/")
            }}>
                <Typography variant={"h6"}>Coursera</Typography>
            </div>
        <div>
    
        <Button style={{margin:'5px'}} variant="text" onClick={()=>{
            navigate('/about')}}>Add Course</Button>
        <Button style={{margin:'5px'}} variant="text" onClick={()=>{
            navigate('/courses')}}>Courses</Button>
        <Button style={{margin:'5px'}} variant="contained" onClick={()=>{
            localStorage.setItem('token',null);
            navigate("/");
            setUser({
                isLoading:false,
                userEmail:null
            })
            }}>Logout</Button>
        
        </div>
        </div>
        }
        else{

    return<div style={{display:"flex",justifyContent:"space-between"}}> 
    <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                navigate("/")
            }}>
                <Typography variant={"h6"}>Coursera</Typography>
            </div>
    <div>
    <Button style={{margin:'5px'}} variant="contained" onClick={()=>{navigate('/register')}}>Signup</Button>
    <Button style={{margin:'5px'}} variant="outlined" onClick={()=>{navigate('/login')}}>Login</Button>
    </div>
    </div>
    }

}
export default Appbar;