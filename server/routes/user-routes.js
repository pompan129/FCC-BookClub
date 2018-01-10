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

  //user page refresh (verify token) todo: error handling
  app.get('/api/user/auth/refresh/jwt',authenticateJWT,(req,resp)=>{
    //resp.send({msg:"success", username:req.user.username}); //todo
    User.where({ username: req.user.username}).select({ password: 0}).exec(
      function (err, users) {
        if(users.length > 1){console.log("ERROR: duplicate username", Date.now())}
        console.log("auth/refresh/jwt:",users);///todo

        resp.send({msg:"success", user:users[0]});
      });
  })

  //update user info
  app.post('/api/user/update',Authenticate.JWTauth,(req,resp)=>{
    const {email,name,address,username} = req.body;
    console.log('update:', req.body,req.auth);//todo
    if(req.auth){
      User.findOneAndUpdate({username}, { email,name,address},{new: true}).select({ password: 0}).exec((err,user)=>{
        if(err){
          resp.send(new Error("Error updateing User"));
        }else{
          resp.send({msg:'success',user});
        }
      })
    }else{
      resp.send(new Error("Error!-token/username mismatch"));
    }
  })
}
