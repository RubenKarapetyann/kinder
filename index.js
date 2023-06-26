import express from "express"
import { TEST } from "./constants/routes-constants.js"

const app = express()

app.get(TEST,(req,res)=>{
    res.send({
        type : "test"
    })
})


app.listen(process.env.PORT)