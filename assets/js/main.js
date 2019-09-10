/*
    Dopetrope by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

function url_query( query ) {
    query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var expr = "[\\?&]"+query+"=([^&#]*)";
    var regex = new RegExp( expr );
    var results = regex.exec( window.location.href );
    if ( results !== null ) {
        return results[1];
    } else {
        return false;
    }
}

function times(n,f){while(n-->0)f();}

(function($) {



    $('#nav').load('/partials/nav.html').hide().fadeIn('slow', function(){
        // Dropdowns.
        console.log('drop')
        $('#nav > ul').dropotron({
            mode: 'fade',
            noOpenerFade: true,
            alignment: 'center'
        });
    });

    $('#footer').load('/partials/footer.html')

    show_more = ()=>{
        times(4, ()=>{
            if( news_app.all_news.length){
                news_app.news.push(news_app.all_news.shift())
            }else{
                news_app.more_news = false
            }

        })

        if(!news_app.all_news.length){ news_app.more_news = false}
    }

     var news_app = new Vue({
        el: '#news_section',
        data: {
            all_news: [],
            news: [],
            more_news: true,
            shown:      0,
            show_more: show_more
        }
     })


    $.getJSON('data/news.json', function(news){
        news_app.all_news = news
        show_more()

    })


    var $window = $(window),
        $body = $('body');

    // Breakpoints.
        breakpoints({
            xlarge:  [ '1281px',  '1680px' ],
            large:   [ '981px',   '1280px' ],
            medium:  [ '737px',   '980px'  ],
            small:   [ null,      '736px'  ]
        });

    // Play initial animations on page load.
        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-preload');
            }, 100);
        });



    // Nav.

        // Title Bar.
            $(
                '<div id="titleBar">' +
                    '<a href="#navPanel" class="toggle"></a>' +
                '</div>'
            )
                .appendTo($body);

        // Panel.
            $(
                '<div id="navPanel">' +
                    '<nav>' +
                        $('#nav').navList() +
                    '</nav>' +
                '</div>'
            )
                .appendTo($body)
                .panel({
                    delay: 500,
                    hideOnClick: true,
                    hideOnSwipe: true,
                    resetScroll: true,
                    resetForms: true,
                    side: 'left',
                    target: $body,
                    visibleClass: 'navPanel-visible'
                });


})(jQuery);
