const express = require('express');
const dotenv =  require('dotenv').config();

const routes = require('./routes/openAiRoutes');



const port =  5000;

const app = express();

// Enable body parser

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/openai',routes);


app.listen(port,()=>console.log(`Server started on port ${port}`));

