


module.exports = function(app){
  console.log("setting routes...");//todo

    app.get('/api/test',(req, res)=>{
      res.end("route test good!");
    })
}
