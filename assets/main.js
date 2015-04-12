window.onload = function(){
  //Create canvas
  var w = $(window).width();
  var g = Math.floor(w * 0.38196601125);
  var h = $(window).height();

  //CSS Ready functions
  if ($("link[href='/assets/styles.min.css']").length == 1) {
	//Show main
	$('.main').animate({'opacity': 1}, 300);
	//View tags
	$('.main .copy a').click(function(e){
	  e.preventDefault();
	  $.get('/allposts'/*this.href*/, function(data){
		$('.main').animate({'opacity': 0}, 300, function(){
		  /*$(this)
			.empty()
			.html(JSON.stringify(data))
			.animate({'opacity': 1}, 600);*/
		  window.location += 'static-dynamic-websites';
		});	
	  });
	});
	
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
