const request = require('request'); //to make 0auth requests
const env = require('../environment.variables');

module.exports = function(app){
  console.log("setting routes...");//todo

    //test route
    app.get('/api/test',(req, res)=>{
      res.end("route test good!");
    })


    app.get('/api/search/book',(req,res)=>{
        let {q} = req.query;
        //console.log("key=",env.GOOGLE_API_KEY);//todo
        request.get({
          url:'https://www.googleapis.com/books/v1/volumes',
          qs:{
            q:q,
            key: env.GOOGLE_API_KEY,
            startIndex: "0",
            maxResults: "10",
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
    })
}
