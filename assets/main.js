window.onload = function(){
  //Create canvas
  var w = $(window).width();
  var g = Math.floor(w * 0.38196601125);
  var h = $(window).height();

  //CSS Ready functions
  //alert($("link[href='/assets/styles.min.css']").length);
  if ($("link[href='/assets/styles.min.css']").length == 1) {
    alert('JQuery Loaded');
  }
  //Scroll specific function
  $(window).scroll(function(){
    var t = $(window).scrollTop();
  });
  //Resize specific functions
  $(window).resize(function(){
   w = $(window).width();
   h = $(window).height();
  });
};
//Main function class ap
var AP = {
  //Structure init
  init: function(){

  },
  anim: function(){
    //function
  },
  //Get content
  getcontent: function(){
    $.get('/allposts', function(res) {
      //$('body').text(JSON.stringify(res));
    });
  }
}
