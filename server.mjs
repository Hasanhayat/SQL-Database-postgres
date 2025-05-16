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
app.get("users",(req , res)=>{
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching users");
        } else {
            res.json(result);
        }
    });    

})

app.post("user",(req,res)=>{
    const {name, email, password} = req.body;
    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error inserting user");
        } else {
            res.status(201).send("User inserted successfully");
        }
    });
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);
