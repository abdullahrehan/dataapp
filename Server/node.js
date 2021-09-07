require('dotenv').config()
const express=require("express")
const cookieParser=require('cookie-parser')
const cors=require('cors')
const app=express()
const fs=require("fs")
const path=require('path')
const bodyparser=require('body-parser')
 
const route=require("./Backend/Routes/route")
var corsOptions = { 
    origin: 'http://localhost:3000',
    credentials : true
}

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(__dirname+"/uploads")) 
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json())
app.use(route) 

if(process.env.NODE_ENV==='production'){
    app.use(express.static('Client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'Client','build','index.html'))
    })
}

const port=process.env.PORT || 2000
app.listen(port,()=>{console.log("Runnig"+port)}) 
 