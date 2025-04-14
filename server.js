// const express = require("express");
// const app = express();

// const port = 8080;

// app.get("/api/home",(req,res)=>{
//     res.json({message:"Hello World!"});
// });
// app.get("/",(req,res)=>{
//     res.json({message:"Hello World!"});
// });
// app.listen(port,()=>{
//     console.log(`server started on ${port}`);
// })


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
 
app.use(cors({
  origin: "http://localhost:3000"
}));

const router = express.Router();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'));

app.use('/api/todos', todoRoutes);



app.get("/",(req,res)=>{
       res.json({message:"Hello World!"});
   });
app.listen(5000, () => console.log('Server running on port 5000'));
