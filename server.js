require('dotenv').config();// now we can access the .env files
const express = require('express'); //express include in node_modules
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');//have to use middleware to access the routes
const errorMiddleware = require('./middleware/errorMiddleware');
const app = express();
var cors = require('cors')//to access the api from the frontend

const MONGO_URL = process.env.MONGO_URL//access the .env file
const PORT = process.env.PORT || 3000 

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors())//anyone can access the backend. there is no restriction
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=> {
    throw new Error('BROKEN')
})

//routes
app.use('/api/products',productRoutes);//middleware to access the routes

app.use(errorMiddleware);

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL)
.then(()=> {
console.log('Connected to MongoDB')
app.listen(PORT,()=>
console.log(`Server started at port ${PORT}`)
);
})
.catch(err => console.log(err))