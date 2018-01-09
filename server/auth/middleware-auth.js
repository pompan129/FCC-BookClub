const User = require("../models/user");
const jwt = require("jwt-simple");
const env = require('../../environment.variables');


const getToken = function(payload){
  const token = jwt.encode({username:payload.username}, env.SECRET );
  return token;
}

exports.getToken = getToken;

//local sign up middelware ie. Username & password & email(not req)
exports.signup = function(req, res, next){
    const {username,password,email} = req.body;

    if(!username || !password){
      return res.status(422).send({error:"you must provide a username and password"})
    }

    User.findOne({username:username.toLowerCase()},function(err,exists){
      console.log("findOne",err,exists);//todo
      if(err){return next(err);}
      if(exists){
        console.log("error: USER EXISTS");//todo
        res.status(422);
         return res.send({ error: 'Email is in use' });
      }

      const newUser = new User({
        username: username,
        password: password,
        email:email
      })

      newUser.save(function(err,user){
          if(err){return next(err);}
          res.json({success:true, token: getToken(newUser),user})
      })
    })
}

exports.signin = function(req, res, next){
  const user = req.user;
  user.password = undefined;
  res.json({success:true, token: getToken(req.user),user})
}



exports.JWTauth = function(req, res, next){

  let token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue

  token = token.replace('Bearer ', '');

  // decode
  try {
    const decoded = jwt.decode(token, env.SECRET);
    console.log("JWTauth:",decoded);//todo
    req.auth = true;
    next();
  }
  catch (err) {
     console.log(err.name, err.message);//todo
     //const error = new Error(err.message)
     next(new Error("Unable to Authorize Token"));
  }

}
