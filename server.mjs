import express from 'express';
import cors from 'cors';
import db from './db.js';
const app = express();

const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

app.get("/",()=>{
    res.send("Hello from server")
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);
