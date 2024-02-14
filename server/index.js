const express= require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log(`Connected to mongoose successfully`);
    const server=app.listen(process.env.PORT,()=>{
        console.log(`Server started on Port : ${process.env.PORT}`)
    })
}).catch((error)=>{
    
        console.log("Error+index->"+error);
    
})