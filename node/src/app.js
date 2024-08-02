const express = require("express");
const path = require("path");
const cors = require('cors')
const {queryExecution} = require('./database')


const server = express();
server.use(express.json())
server.use(cors());

server.get('/All',async (req,res)=>{
    try{
        const [rows] = await queryExecution("SELECT * FROM USERS")
        res.json(rows)
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error - All' });
    }
})

server.post('/createUser',async (req,res)=>{
    try{
        const {first_name,last_name,email,roles,phone,profile_pic}=req.body
        const result = await queryExecution("INSERT INTO USERS(first_name,last_name,email,roles,phone,profile_pic) VALUES(?,?,?,?,?,?)",[first_name,last_name,email,roles,phone,profile_pic])
        res.json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error - createUser' });
    }
})

server.delete('/removeUser/:id',async (req,res)=>{
    try{
        const id=req.params.id
        const result = await queryExecution("DELETE FROM USERS WHERE id = ?", [id]);
        res.json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error - removeUser' });
    }
})

server.put('/updateUser',async (req,res)=>{
    try{
        const {id,first_name,last_name,email,roles,phone,profile_pic}=req.body
        const result = await queryExecution("UPDATE USERS SET first_name = ?, last_name = ?, email = ?, roles = ?, phone = ? , profile_pic = ? WHERE id = ?", [first_name,last_name,email,roles,phone,profile_pic,id]);
        res.json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error - removeUser' });
    }
})

server.listen(4000, () => console.log("Server running on port 4000"));

