var express = require("express");
var mysql = require("mysql");
var jade = require("jade");
var compressor = require("node-minify");

//SQL connections
var wp_posts;
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'IBUYUKNO_V2'
});
connection.connect(function(err){
  if(!err) {
    console.log("Database is connected ... \n\n");
    connection.query('SELECT * from wp_posts', function(err, rows, fields) { wp_posts = rows; });
  } else {
    console.log("Error connecting database ... \n\n");
  }
});

//Init app
var app = express();
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/img', express.static(__dirname + '/img'));
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

//Routes & APIs
app.get("/",function(req,res){
  res.render('content');
});

app.get("/allposts",function(req,res){
  //Send posts
  //if(wp_post.post_status == 'publish')
  res.send(wp_posts);
});

//Minify js
new compressor.minify({
  type: 'gcc',
  fileIn: ['assets/jquery-2.1.1.min.js', 'assets/main.js'],
  fileOut: 'assets/scripts.min.js',
  callback: function(err, min){
    console.log(err);
  }
});

//Minify CSS
new compressor.minify({
  type: 'clean-css',
  fileIn: ['assets/bootstrap.min.css', 'assets/styles.css'],
  fileOut: 'assets/styles.min.css',
  callback: function(err, min){
    console.log('Clean-css');
    console.log(err);
  }
});

app.listen(3000);
