const express = require('express');
const router = express.Router();
const {Users} = require('../model/users')
const {AddressBook} = require('../model/addressbook')
const {Crew} =require('../model/crew')
const {Positions} =require('../model/positions')
const mongoose = require('mongoose')
const auth = function(req,res,next){

  if(req.session.authtoken!=undefined){
    console.log(req.session.authtoken)
    next()
  }else{
      res.send({
          message:"Authrization Failed"
      })
  }
}
//Router Start Frome there
router.get('/register',(req,res)=>{
    var name = req.query.name;
    var password =req.query.password;
    var email =req.query.email;
    var date = new Date();
    const users =new Users({
        name,
        email,
        password,
        createdAt:date.toTimeString(),
        updatedAt:date.toTimeString()
    })
    users.save().then((d)=>{
        res.json(d)
    }).catch((err)=>{
        if(err)
           res.json(err)
    })

    
});
 router.get('/login',(req,res)=>{
   var users =Users.where({email:req.query.email,password:req.query.password})
   users.findOne((err,d)=>{
       if(err)
       {
           res.send({})
       }
       if(d !=null){
        var bcrypt = require('bcryptjs');
        var hash = bcrypt.hashSync(d.email, 8);
        req.session.authtoken = hash;
        res.send({authtoken:hash})
       }else{
        res.send({})
       }
   })

 
})
router.get('/crew',(req,res)=>{
    var date = new Date();
    var createdAt= date.toLocaleTimeString();
    var updatedAt=  date.toLocaleTimeString();
    var dp_name = req.query.dp_name;
    var position_name = req.query.position_name;
    var user_id = req.query.user_id;

    var crew = new Crew({
        user_id,
        dp_name,
        createdAt,
        updatedAt,
    })
    var position = new Positions({
        crew_id:crew._id,
        title:position_name
    })
    crew.save()
        .then((d)=>{
            if(d!=null){
                res.send({d,position_name:req.query.position_name})
            }else{
                res.send({})
            }
            }).catch((err)=>{
                if(err)
                 console.log(err)
            })
    position.save();
        
})
router.get('/add_position',(req,res)=>{
    var position = new Positions({
        crew_id:req.query.crew_id,
        title:req.query.title
    })
    position.save().then((d)=>{
        res.send(d)
    })
});
router.get('/get_crew',(req,res)=>{
    // var name = 'Shohan';
    // Users.findOne({name: new RegExp('^'+name+'$', "i")}, function(err, doc) {
    //   console.log(doc)
    // });
    Crew.aggregate([
                {$lookup:{
                    from:'positions',
                    localField:'_id',
                    foreignField:'crew_id',
                    as:"positions"
                }}
               ]).exec().then((d)=>{
                  res.send(d)
               })
               
    // Users.aggregate([
    //     {$match:{
    //         name:new RegExp('s', "i")
    //     }},
    //     {$lookup:{
    //         from:'crews',
    //         localField:'_id',
    //         foreignField:'user_id',
    //         as:"crews"
    //     }}
    //    ]).exec().then((d)=>{
    //       res.send(d[0])
    //    })

   
})
router.get('/addressbook',(req,res)=>{
    var firstname = req.query.firstname;
    var lastname= req.query.lastname;
    var tags= req.query.tags;
    var phone= req.query.phone;
    var email= req.query.email;
    var zipcode= req.query.zipcode;
    var city= req.query.city;
    var company= req.query.company;
    var date = new Date();
    var createdAt= date.toLocaleTimeString();
    var updatedAt=  date.toLocaleTimeString();
    var position_id = req.query.position_id;
    var addressBook = new AddressBook({
      
        firstname,
        lastname,
        tags,
        phone,
        email,
        zipcode,
        city,
        company,
        createdAt,
        updatedAt,
    })
    

    addressBook.save().then((d)=>{
        //console.log(d._id)
        res.json(d)
    }).catch((err)=>{
        if(err)
        console.log(err)
        res.send(err)
    })
    //var err = addressBook.validateSync();
   // res.send({name:req.session.authtoken,err})
})

router.get('/get_addressbook',(req,res)=>{
    AddressBook.find({
        tags:new RegExp(req.query.tag,"i")
    }).then((d)=>{
        if(d!=undefined){
            res.send(d)
        }else{
            res.send({})
        }
    }).catch((err)=>{
        if(err)
          console.log(err)
    })
})

module.exports = router;