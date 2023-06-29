import express from "express"
import { REGISTER, LOGIN, AUTH } from "./constants/routes-constants.js"

const app = express()

app.get(REGISTER,(req,res)=>{
    res.send({
        type : "reg"
    })
})

app.get(LOGIN,(req,res)=>{
    res.send({
        type : "log"
    })
})


app.get(AUTH,(req,res)=>{
    res.send({
        type : "auth"
    })
})

app.listen(process.env.PORT)