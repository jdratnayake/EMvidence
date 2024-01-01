import axios from 'axios';
import { useState } from 'react';


export default function AuthUser(){
    const [token, setToken] = useState();
    const [user, setUser] = useState();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const saveToken = (user,token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setToken(user);

    }

     const http = axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            "Content-Type":"application/json",
           
        }
     })

     return {
        http
     }

}