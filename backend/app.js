import express from "express";
import mongoose from 'mongoose'

const app = express();

mongoose.connect(
    'mongodb+srv://devanshgandhi:tieRyPPzn6PSCa8t@cluster0.as1bb3n.mongodb.net/Blog?retryWrites=true&w=majority'
    ).then(()=>app.listen(5000)).then(()=>console.log("Connected TO Database and Listening TO Localhost 5000")).catch((err)=>console.log(err));