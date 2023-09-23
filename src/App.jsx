import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import Course from './components/Course';
import Appbar from './components/Appbar';
import { userState } from './store/atoms/user';
import { RecoilRoot,useSetRecoilState } from 'recoil';
import axios from 'axios';
import { BASE_URL } from './config';
import { useEffect } from 'react';

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <RecoilRoot>
            <div style={{width:'100vw', height: '100vh', backgroundColor:'#eeeeee'}}>
        <Router>
            <Appbar></Appbar>
            <InitUser></InitUser>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<CreateCourse />} />
                <Route path="/courses" element={<ShowCourses />} />
                <Route path="/courses/:courseId" element={<Course/>}/>
            </Routes>
        </Router>
        </div>
        </RecoilRoot>
    );
}

function InitUser(){
    const setUser=useSetRecoilState(userState);
    const init= async ()=>{
        try{
            const response= await axios.get(`${BASE_URL}/admin/me`,{
                headers:{
                    "Authorization:":"Bearer "+localStorage.getItem('token')
                }
            })
            if(response.data.username){
                setUser({
                    isLoading:false,
                    userEmail: response.data.username
                })
            }else{
                setUser({
                    isLoading: false,
                    userEmail: null
                })
            }

        }catch(e){
            setUser({
                isLoading: false,
                userEmail:null
            })
        }
    }
    useEffect(()=>{
        init();
    },[]);
    return <></>
}



export default App;