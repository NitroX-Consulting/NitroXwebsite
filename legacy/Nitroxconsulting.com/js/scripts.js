include('js/hoverSprite.js');
include('js/jquery.easing.1.3.js');
include('js/jquery-ui-1.8.11.custom.min.js');
include('js/jquery.transform-0.9.3.min.js');
include('js/jquery.animate-colors-min.js');
include('js/mathUtils.js');
include('js/superfish.js');
include('js/switcher.js');
include('js/jquery.mousewheel.js');
include('js/sprites.js');
include('js/forms.js');
include('js/jquery.backgroundpos.min.js');
include('js/jcarousellite_1.0.1.min.js');
include('js/googleMap.js');
include('js/slider.js');

//----Include-Function----
function include(url) {
    document.write('<script src="' + url + '" type="text/javascript" ></script>');
}
//--------global-------------
var isSplash = true;
var MSIE = ($.browser.msie) && ($.browser.version <= 8);
//------DocReady-------------
$(document).ready(function () {
    if (location.hash.length == 0) {
        location.hash = "!/" + $('#content > ul > li:first-child').attr('id');
    }



    $('ul#menu2').superfish({
        delay: 800,
        animation: { height: 'show' },
        speed: 200,
        autoArrows: false,
        dropShadows: false,
        onInit: function () {
            $("#menu2 > li > a").each(function (index) {
                var conText = $(this).find('.mText').text();
                //$(this).find('.extraHolder').append("<span class='mTextOver'>"+conText+"</span>")	
            })
        }
    });

});

//------WinLoad-------------  
$(window).load(function () {
    ////////////////////////////////////////////////////////////////


    $('.more').sprites({ method: 'gStretch', hover: true });

    $("#prev1").hoverSprite({ onLoadWebSite: true });
    $("#next1").hoverSprite({ onLoadWebSite: true });
    $(".scrButn > a").hoverSprite({ onLoadWebSite: true });
    $(".searchButton > a").hoverSprite({ onLoadWebSite: true });



    $("#jcarousel_1").jCarouselLite({
        btnNext: ".nextBtn",
        btnPrev: ".prevBtn",
        speed: 800,
        visible: 3
    });


    navInit();
    function navInit() {

    }

    ///////////////////////////////////////////////
    var navItems = $('.menu > ul >li');
    var _delay;

    //$('.menu > ul >li').eq(0).css({'display':'none'});  
    var content = $('#content'),
        nav = $('.menu'),
        nav2 = $('.menu2');

    $('#content').tabs({
        preFu: function (_) {
            _.li.css({ left: "1700px" })

        }
        , actFu: function (_) {
            if (_.curr) {
                _.curr.css({ left: "1700px" }).stop().delay(200).animate({ left: "0px" }, 800, 'easeInOutCubic');

                if ((_.n == 0) && ((_.pren > 0) || (_.pren == undefined))) { splashMode(); }

                if (((_.pren == 0) || (_.pren == undefined)) && (_.n > 0)) { contentMode(); }
            }

            if (_.prev) {
                _.prev.stop().animate({ left: "-1700px" }, 800, 'easeInOutCubic');
            }

        }
    })






    function splashMode() {
        isSplash = true;
        navItems.each(function (index) {
            _delay = index * 50;
            // navItems.eq(index).find('.imgHolder').stop().delay(_delay).animate({height:"258px"}, 700, 'easeInOutCubic');
        });
        $(".menuHolder2").stop().animate({ left: "0px" }, 800, 'easeInOutCubic');
    }

    function contentMode() {
        isSplash = false;
        navItems.each(function (index) {
            _delay = index * 50;

            // navItems.eq(index).find('.imgHolder').stop().delay(_delay).animate({height:"0px"}, 700, 'easeInOutCubic');
        });

        $(".menuHolder2").css({ left: "1700px" }).stop().animate({ left: "0px" }, 700, 'easeInOutCubic');
    }

    nav.navs({
        useHash: true,
        hoverIn: function (li) {
            // if (!li.hasClass('active')){                
            $(".imgHolder > .picOver", li).stop().animate({ top: "-202px" }, 600, 'easeOutBack');
            $(".imgHolder > .picOut", li).stop().animate({ top: "-202px" }, 600, 'easeOutExpo');
            $(".extraHolder", li).stop().animate({ top: "188px" }, 600, 'easeOutExpo');
            $(".mOver", li).stop().animate({ top: "-20px" }, 600, 'easeOutExpo');

        },
        hoverOut: function (li) {
            if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                $(".imgHolder > .picOver", li).stop().animate({ top: "0px" }, 600, 'easeOutExpo');
                $(".imgHolder > .picOut", li).stop().animate({ top: "0px" }, 600, 'easeOutBack');
                $(".extraHolder", li).stop().animate({ top: "90px" }, 400, 'easeInCirc');
                $(".mOver", li).stop().animate({ top: "10px" }, 400, 'easeInCirc');
            }
        }
    })

        .navs(function (n) {
            $('#content').tabs(n);
        })

    nav2.navs({
        useHash: true,
        hoverIn: function (li) {
            // if (!li.hasClass('active')){                
            $(".planeHolder", li).stop().animate({ top: "0px" }, 400, 'easeOutExpo');
            $(".menuText", li).stop().animate({ top: "0px" }, 800, 'easeOutElastic');


        },
        hoverOut: function (li) {
            if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                $(".planeHolder", li).stop().animate({ top: "-80px" }, 350, 'easeInSine');
                $(".menuText", li).stop().animate({ top: "-80px" }, 300, 'easeInSine');
            }
        }
    })
        .navs(function (n) {
            $('#content').tabs(n);
        })


    ///////////Resize////////////////////  


    //////////////////////////////////////////
    var h_cont = 662;
    function centrRepos() {
        var h = $(window).height();
        if (h > (h_cont + 40)) {
            m_top = ~~(h - h_cont) / 2;
            h_new = h;
        } else {
            m_top = 20;
            h_new = h_cont + 40;
        }
        //$('.center').stop().animate({paddingTop:m_top},800,'easeOutExpo');
        //$('.main').css({height:h_new});
    }
    centrRepos();
    ///////////Window resize///////
    $(window).resize(function () {
        centrRepos()

    }
    );

} //window function
) //window load