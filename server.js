const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require("path");
const BookRoutes = require("./server/routes/book-routes");
const UserRoutes = require("./server/routes/user-routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set up database
var mongoose = require("mongoose");
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@ds129166.mlab.com:29166/book-trading-club`,
  { useMongoClient: true, promiseLibrary: global.Promise }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to mongoDB"); // we're connected!
});

BookRoutes(app); //add routes for Books DB
UserRoutes(app); //add routes for user DB

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
