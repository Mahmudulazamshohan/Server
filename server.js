const express  = require('express');
const app = express();

const bodyParser =  require('body-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
var port = process.env.port || 4000;

app.use(fileUpload());


const mongoose = require('./database')
app.use(function(req, res, next) {
    // Instead of "*" you should enable only specific origins
    res.header('Access-Control-Allow-Origin', '*');
    // Supported HTTP verbs
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // Other custom headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send({
        name:"azam",
        id:req.query.user_id
    })
})



app.use(function (err,req,res,next) {  
    if(err.code !== 'EBADCSRFTOKEN') { 
        return next(err);
    }
    res.status(404);
    res.send("Session has been expired");
});

const admin = require('./routes/admin')

//Session
app.use(session({
    secret: 'shohan',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false 
   }
  }));

app.use('/',admin)

app.listen(port,()=>{
   console.log(`Server Upload at PORT ${port}`);
});


