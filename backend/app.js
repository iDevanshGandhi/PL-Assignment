import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
    

const app = express();

app.use("/api/user",router)
mongoose.connect(
    'mongodb+srv://devanshgandhi:tieRyPPzn6PSCa8t@cluster0.as1bb3n.mongodb.net/Blog?retryWrites=true&w=majority'
    ).then(()=>app.listen(5000)).then(()=>console.log("Connected TO Database and Listening TO Localhost 5000")).catch((err)=>console.log(err));