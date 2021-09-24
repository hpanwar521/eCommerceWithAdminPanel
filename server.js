const express = require ('express');
var cors = require('cors');
const app = express();
app.use(cors());

const connectDB = require('./config/db');

// connect database
connectDB();

// init Middleware
app.use(express.json({extended: false}));


app.get('/',(req,res)=>res.send('API is running very fast '));

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


const PORT = process.env.PORT || 5001

app.listen(PORT,()=>console.log("server is running on the port 5001"));