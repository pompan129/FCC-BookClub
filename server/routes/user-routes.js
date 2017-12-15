const request = require('request'); //to make 0auth requests
const env = require('../../environment.variables');
const Book = require('../models/user');
const Authenticate = require("../auth/middleware-auth");
const passport = require('passport');//todo
const PassportStrategies = require("../auth/strategies-auth");//load passport strategies inot passport
const User = require("../models/user");
const authenticateLocal = passport.authenticate('local', { session: false });
const authenticateJWT = passport.authenticate('jwt', { session: false });


module.exports = function(app){

  //test route
  app.get('/api/user/test',(req, resp)=>{
    resp.end("user-route test good!");
  });

  //signup user
  app.post('/api/user/signup', Authenticate.signup);


  //signin user
  app.post('/api/user/signin', authenticateLocal, Authenticate.signin);

  //user page refresh (verify token)
  app.get('/api/user/auth/refresh/jwt',authenticateJWT,(req,resp)=>{
    resp.send({msg:"success", username:req.user.username});
  })

  //update user info
  app.post('/api/user/update',Authenticate.JWTauth,(req,resp)=>{
    const {username,email,fullname,Address,book_ids,wishlist,auth_type} = req.body;
    if(username == req.user.username){
      User.where({username}).update({email,fullname,Address,book_ids,wishlist,auth_type},(err, writeOpResult)=>{
        if(err){resp.send(err);}
        resp.send(writeOpResult);
      })
    }else{
      resp.send(new Error("Error!-token/username mismatch"));
    }



  })


}
