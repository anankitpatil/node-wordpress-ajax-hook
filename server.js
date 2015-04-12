var express = require("express");
var mysql = require("mysql");
var jade = require("jade");
var compressor = require("node-minify");

//SQL config
var dbconfig = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'IBUYUKNO_V2'
};
var connection, wp_posts;

//Init app
var app = express();
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/img', express.static(__dirname + '/img'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: false});

//Home Page
app.get("/", function(req, res) {
  connection = mysql.createConnection(dbconfig);
  connection.connect(function(err) { if(!err) {
	//Get all posts
    connection.query('SELECT * from wp_posts WHERE post_status = "publish" AND post_type = "html5-blank" ORDER BY post_date DESC', function(err, rows) { if(!err) {
	  //Get tags
	  var y = z = 0;
	  for (var i in rows) {
		connection.query('SELECT slug FROM wp_terms INNER JOIN wp_term_taxonomy ON wp_term_taxonomy.term_id = wp_terms.term_id INNER JOIN wp_term_relationships ON wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id WHERE taxonomy = "post_tag" AND object_id =' + rows[i].ID, function(err, _rows) { if(!err) {
		  var slugs = '';
		  for(var j in _rows) {
			slugs += '#' + _rows[j].slug + ' ';
		  };
		  rows[z]['hashtags'] = slugs;
		  z++;
		}});
		//Get thumbnails
		connection.query('SELECT p.* FROM wp_postmeta AS pm INNER JOIN wp_posts AS p ON pm.meta_value=p.ID WHERE pm.post_id = ' + rows[i].ID + ' AND pm.meta_key = "_thumbnail_id" ORDER BY p.post_date DESC LIMIT 15', function(err, __rows) { if(!err) {
		  for(var k in __rows) {
			var url = __rows[k].guid;
		    rows[y]['thumb'] = url.substring(0, url.length - 4) + '-300x300' + url.substring(url.length - 4, url.length);
		  };
		  y++;
		  //Render
		  if(z == rows.length && y == rows.length) res.render('content', {_page: '', _posts: rows});
	    }});
      };
	}});
  }});
});

//Individual post page
app.get('/:post', function(req, res) {
  var post = req.params.post;
  connection = mysql.createConnection(dbconfig);
  connection.connect(function(err) { if(!err) {
	//Get all posts
    connection.query('SELECT * from wp_posts WHERE post_status = "publish" AND post_type = "html5-blank"', function(err, rows) { if(!err) {
	  for(var i in rows) {
		  console.log(rows[i]);
		if(post == rows[i]['post_name']) {
		  connection.query('SELECT p.* FROM wp_postmeta AS pm INNER JOIN wp_posts AS p ON pm.meta_value=p.ID WHERE pm.post_id = ' + rows[i].ID + ' AND pm.meta_key = "_thumbnail_id" ORDER BY p.post_date DESC LIMIT 15', function(err, __rows) { if(!err) {
		    for(var j in __rows) {
		      var url = __rows[j].guid;
		      rows[i]['thumb'] = url.substring(0, url.length - 4) + '-300x300' + url.substring(url.length - 4, url.length);
		    };
			console.log(rows[i]);
			res.render('content', {_page: 'post', _post: rows[i]});
	      }});
		};
	  }
	}});
  }});
});

app.get("/static-dynamic-websites", function(req, res){
  _page = 'static-dynamic-websites';
  var zee = JSON.stringify(wp_posts);
  res.render('content', zee);
  //if(wp_posts.post_status == 'publish') res.send(wp_posts);
});

app.get("/allposts", function(req, res){
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
