const request = require('request'); //to make 0auth requests
const env = require('../../environment.variables');
const Book = require('../models/books');
const User = require("../models/user");

module.exports = function(app){
  console.log("setting routes...");//todo

    //test route
    app.get('/api/test',(req, res)=>{
      res.end("route test good!");
    })

    //retrieve books from Google API
    app.get('/api/search/books',(req,res)=>{
        let {q} = req.query; //query string from user
        //console.log("search",q,req.query);//todo
        if(!q){return res.end();}

        request.get({
          url:'https://www.googleapis.com/books/v1/volumes',
          qs:{
            q,
            key: env.GOOGLE_API_KEY,
            startIndex: "0",
            maxResults: "12",
            projection:"lite"
          }
        },(error, response, body)=>{
          if (error) {
          return res.send(500, { message: error.message});
          }

          //console.log( JSON.parse(body));//todo

          const books = JSON.parse(body).items.map((book)=>{
            const {selfLink} = book;
            const {authors, title,publisher, publishedDate, description} = book.volumeInfo;
            const thumbnail = book.volumeInfo.imageLinks? book.volumeInfo.imageLinks.thumbnail:"";

            return {
              publisher, publishedDate, description, selfLink,
              authors, title,thumbnail
            }
          })

          res.send(books);
        })
    });

    //retrieve all books from DB
    app.get('/api/booklist/list',(req,res)=>{
        Book.find((err, books)=>{
          if (err) {
            console.log(err);
            return res.send(err);
          }
          res.send(books);
        })
    });

    //get books for one user todo--needed??
    app.get('/api/booklist/userlist',(req,res)=>{
      const {owner} = req.query;
      //console.log("userlist:", owner, req.query);//todo

      Book.find({owner},(err, books)=>{
        if (err) {
          console.log(err);
          return res.send(err);
        }
        res.send(books);
      })

    })

    //add/remove book from DB list & add/remove from user profile
    app.post('/api/booklist/addremove',(req,res)=>{
      const {authors,title,publisher,publishedDate,
        description,selfLink,thumbnail, owner} = req.body;


      const newBook = new Book({
        authors,title,publisher,publishedDate,
          description,selfLink,thumbnail,owner,rq_status:{rq_state:"available"}
      })

      console.log("add/remove book:  ",authors,title,publisher,publishedDate,
        description,selfLink,thumbnail, owner);//todo

      newBook.save(function (err,book) {
        if (err) {
          console.log(err);
          return res.send(err);
        }

        //if book is saved  - add to user library(book_ids)
        if(book){
          User.findOneAndUpdate({username:owner},{"$push":{"book_ids":selfLink}},
            (err, user)=>{
              if (err) {
                console.log(err);
                return res.send(err);
            }
              user.book_ids.push(selfLink);
              return res.send({user,msg:"update success!",
                owner:user.username,book:title});//todo
          })
        }
        else{ return res.send(new Error("could not save book to DB"))}
      })
    })
    .delete('/api/booklist/addremove',(req,res)=>{
      const {title, owner} = req.body;
      const id = req.body._id
      Book.deleteOne({_id:id}, (err, writeOpResult)=>{  //todo fix delete error when book id doesn't exist (check writeOpResult.n)
        if (err) {
          console.log(err);
          return res.send(err);
        }
        res.send ({writeOpResult,msg:"success!"});//todo
      })
    });


    //modify book status (requested, traded, etc..)
    app.post('/api/booklist/update/status',(req,res)=>{
      const {rq_status,id} = req.body;

      console.log("/api/booklist/update/status",rq_status,id);//todo

      Book.where({_id:id}).update({rq_status},(err, writeOpResult)=>{
        if (err) {
          console.log(err);
          return res.send(err);
        }

          res.send ({writeOpResult,msg:"success!"});//todo
      })

    })


}
