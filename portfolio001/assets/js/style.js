$(function() {

    // side menu
    $('.menu-trigger').click(function(){
        $(this).toggleClass('active');
        if($(this).hasClass('active')) {
            $('#l-site-header').addClass('is-fixed');
        } else {
            if($(this).scrollTop() > 0) {
                $('#l-site-header').removeClass('is-fixed');
            }
        }
        $('#l-site-aside').toggleClass('is-show');
        $('.o-modal-bg').toggleClass('is-show');
    });

    $('#l-site-aside a').click((function (){
            $('.menu-trigger').removeClass('active');
            $('#l-site-header').removeClass('is-fixed');
            $('#l-site-aside').removeClass('is-show');
        }
    ));

    $('#l-site-header a').click((function (){
            $('.menu-trigger').removeClass('active');
            $('#l-site-header').removeClass('is-fixed');
            $('#l-site-aside').removeClass('is-show');
        }
    ));

    // smooth scroll
    $('a[href^="#"]').click(function(){
        var speed = 500;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top - 100;
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
    });
});