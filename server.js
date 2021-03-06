require("dotenv").config();
var express = require("express");

var db = require("./models");
//var nasa = require('../Project2/node-nasa/lib/nasa.js');

var app = express();
var PORT =  process.env.PORT || 3000 ;

// Middleware
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

 
/*nasa.dataset({ id: 619 }, function(err, data){
  if (err) console.log(err);
  else console.log(data);
});*/

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
