window.onload = function() {
    //Create canvas
    var w = $(window).width();
    var g = Math.floor(w * 0.38196601125);
    var h = $(window).height();

    var homePage = 'http://localhost:3000';

    //CSS Ready functions
    if ($("link[href='/assets/styles.min.css']").length == 1) {

        //Remove loader
        $('.load').stop().animate({
            'opacity': 0
        }, 300, function() {
            $(this).remove();
            //Show main
            $('.main').stop().animate({
                'opacity': 1
            }, 300);
        });

        //View posts
        $('.main .copy .thumb').click(function(e) {
            e.preventDefault();
            var href = $(this).attr('href');
            $('.main').stop().animate({
                'opacity': 0
            }, 300, function() {
                window.location += href;
            });
        });

        //Back button and share button
        $('.back').click(function() {
            $('.main').stop().animate({
                'opacity': 0
            }, 300, function() {
                window.location = homePage;
            });
        });

        //Share button
        $('.share').click(function() {
            var params = {};
            params['message'] = 'message';
            params['name'] = 'test';
            params['description'] = 'test';
            params['link'] = 'ankitpatil.com';
            params['picture'] = 'http://ankitpatil.com/wp-content/themes/tagged/img/logo.png';
            params['caption'] = 'test';
            postToWall(params);
        });

    }

    //Scroll specific function
    $(window).scroll(function() {
        var t = $(window).scrollTop();
    });

    //Resize specific functions
    $(window).resize(function() {
        w = $(window).width();
        h = $(window).height();
    });

    //Facebook like
    FB.init({
        appId: '267333386610873',
        status: true,
        xfbml: true,
        version: 'v2.5' // or v2.0, v2.1, v2.0
    });
};

function postToWall(params) {
    FB.getLoginStatus(function(response) {
        // Check login status on load, and if the user is
        // already logged in, go directly to the welcome message.
        if (response.status == 'connected') {
            onLogin(response);
        } else {
            // Otherwise, show Login dialog first.
            FB.login(function(response) {
                FB.api('/me/feed', 'post', params, function(response) {
                    if (!response || response.error) {
                        console.log(response);
                    } else {
                        alert('done');
                    }
                });
            });
        };
    });
}

// FB JS SDK
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
