import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.get("/",()=>{
    res.send("Hello from server")
})

