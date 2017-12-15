const User = require("../models/user");
const jwt = require("jwt-simple");
const env = require('../../environment.variables');


const getToken = function(payload){
  const token = jwt.encode({username:payload.username}, env.SECRET );
  return token;
}

exports.getToken = getToken;

//local sign up middelware ie. Username & password
exports.signup = function(req, res, next){
    const {username,password} = req.body;

    if(!username || !password){
      return res.status(422).send({error:"you must provide a username and password"})
    }

    User.findOne({username:username},function(err,exists){
      if(err){return next(err);}
      if(exists){
        console.log("error: USER EXISTS");//todo
         res.status(422);
          return  res.send({ error: 'username already is in use' });
      }

      const newUser = new User({
        username: username,
        password: password
      })

      newUser.save(function(err){
          if(err){return next(err);}

          res.json({success:true, token: getToken(newUser),username:newUser.username})
      })
    })
}

exports.signin = function(req, res, next){
  res.json({success:true, token: getToken(req.user),username:req.user.username})
}
