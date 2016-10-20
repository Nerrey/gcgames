function lightboxOnResize(){
    if ($(window).width() <= 768) {
        $('[data-lightbox]').each(function(){
            var currentData = $(this).attr("data-lightbox");
            if (currentData){
                $('a[data-lightbox]').attr("data-lightbox-off", currentData).removeAttr("data-lightbox");
            }
        });
    } else {
        $('[data-lightbox]').each(function(){
            var currentData = $(this).attr("data-lightbox-off");
            if (currentData){
                $('a[data-lightbox]').attr("data-lightbox", currentData).removeAttr("data-lightbox-off");
            }
        });
    }
}

/* bootstrap accordion class active */

function accordionActive() {
    jQuery(".accordion").on("show",function (e) {
        jQuery(e.target).prev(".accordion-heading").find(".accordion-toggle").addClass("active");
    }).on("hide",function (e) {
        jQuery(this).find(".accordion-toggle").not(jQuery(e.target)).removeClass("active");
    }).each(function () {
        var $a = jQuery(this);
        $a.find("a.accordion-toggle").attr("data-parent", "#" + $a.attr("id"));
    });
}

/* helper : scroll function */

function scrollToAnchor(aid){
    $('html,body').animate({scrollTop: aid.offset().top-mainNavHeight}, 600, 'swing');
}

/* prevent default browser behaviour when there is # in url (this is replaced on line 46)*/
setTimeout(function() {
    if (location.hash) {
        window.scrollTo(0, 0);
    }
}, 1);

/* variable used for sticky menu calculations */
var mainNavHeight;



$(window).on('resize', function(){
    lightboxOnResize();
});

$(window).on('scroll', function(){

    /* progress bars */
    /* uses jquery viewport plugin */

    jQuery('.progress:in-viewport').each(function() {
        var $barEl = jQuery(this).find('.bar');

        if($barEl.width()==5) {
            $barEl.delay(700).stop().animate({
                'width':jQuery(this).attr('data-percentage')+'%'
            }, 1000, 'swing');
        }
    });
});


$(document).ready(function(){
    mainNavHeight = $('#MainNav').height();
    accordionActive();

    /* twitter */
    $('.tweets').tweet({
        count: 3, //how many tweets?
        template: "{text} {time}",
        li_class: "span4 tweet",
        twitter_api_url: 'twitter/proxy/twitter_proxy.php'
    });
});



$(window).load(function(){

    lightboxOnResize();

    /* ISOTOPE */
    (function(){
        var $container = jQuery('#IsotopeContainer'), // object that will keep track of options
            isotopeOptions = {}, // defaults, used if not explicitly set in hash
            defaultOptions = {
                filter: '*',
                sortBy: 'original-order',
                sortAscending: true,
                layoutMode: 'masonry'
            };


        var setupOptions = jQuery.extend({}, defaultOptions, {
            itemSelector: '.isotope-item',
            masonry: {
                // columnWidth: $container.width() / 4
            }
        });

        // set up Isotope
        $container.isotope(setupOptions);

        var $optionSets = jQuery('#IsotopeOptions').find('.isotope-options'), isOptionLinkClicked = false;

        // switches selected class on buttons
        function changeSelectedLink($elem) {
            // remove selected class on previous item
            $elem.parents('.isotope-options').find('.selected').removeClass('selected');
            // set selected class on new item
            $elem.addClass('selected');
        }


        $optionSets.find('a').click(function () {
            var $this = jQuery(this);
            // don't proceed if already selected
            if ($this.hasClass('selected')) {
                return;
            }
            changeSelectedLink($this);
            // get href attr, remove leading #
            var href = $this.attr('href').replace(/^#/, ''), // convert href into object
            // i.e. 'filter=.inner-transition' -> { filter: '.inner-transition' }
                option = jQuery.deparam(href, true);
            // apply new option to previous
            jQuery.extend(isotopeOptions, option);
            // set hash, triggers hashchange on window
            jQuery.bbq.pushState(isotopeOptions);
            isOptionLinkClicked = true;
            return false;
        });


        var hashChanged = false;

        jQuery(window).bind('hashchange', function (event) {
            // get options object from hash
            var hashOptions = window.location.hash ? jQuery.deparam.fragment(window.location.hash, true) : {}, // do not animate first call
                aniEngine = hashChanged ? 'best-available' : 'none', // apply defaults where no option was specified
                options = jQuery.extend({}, defaultOptions, hashOptions, { animationEngine: aniEngine });
            // apply options from hash
            $container.isotope(options);
            // save options
            isotopeOptions = hashOptions;

            // if option link was not clicked
            // then we'll need to update selected links
            if (!isOptionLinkClicked) {
                // iterate over options
                var hrefObj, hrefValue, $selectedLink;
                for (var key in options) {
                    hrefObj = {};
                    hrefObj[ key ] = options[ key ];
                    // convert object into parameter string
                    // i.e. { filter: '.inner-transition' } -> 'filter=.inner-transition'
                    hrefValue = jQuery.param(hrefObj);
                    // get matching link
                    $selectedLink = $optionSets.find('a[href="#' + hrefValue + '"]');
                    changeSelectedLink($selectedLink);
                }
            }

            isOptionLinkClicked = false;
            hashChanged = true;
        })// trigger hashchange to capture any hash data on init
            .trigger('hashchange');
    })();
    /* ISOTOPE */

    /* parallax */

    //.parallax(xPosition, speedFactor, outerHeight) options:
    //xPosition - Horizontal position of the element
    //inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
    //outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
    $('.parallax').each(function(){
       $(this).parallax("20%", 0.2);
    });


    /* easy pie chart */
    jQuery('.pie-chart').each(function(){
        var $t = jQuery(this);
        var scaleColor = $t.attr('data-scalecolor');
        var trackColor = $t.attr('data-trackcolor');

        $t.easyPieChart({
            animate: $t.attr('data-animate'),
            barColor: $t.attr('data-barcolor'),
            trackColor: trackColor,
            scaleColor: scaleColor == 'false'?false:scaleColor,
            lineCap: $t.attr('data-linecap'),
            lineWidth: $t.attr('data-linewidth'),
            size: $t.attr('data-size')
        });
    });

    /* flexslider */
    $('.work .flexslider').flexslider({slideshow: false});
    $('.work .flexslider .slides li:first-child').addClass("flex-active-slide").css({"display": "list-item"});
    $('#BlogBody .post-media.flexslider').flexslider({slideshow:false, controlNav: false});


	/* main navigation scrolling */
    var a={selector:"#MainNav.sticky","class":"stick",offset:0};
    var b=$(a.selector);
    a.offset=b.offset().top;
    var c=$(window).scrollTop();
    c>=a.offset?(b.addClass(a["class"])):b.removeClass(a["class"]);
    $(window).scroll(function(){
        var c=$(window).scrollTop();
        c>=a.offset?(b.addClass(a["class"])):b.removeClass(a["class"]);
    });


    $('#MainNav a[href^="#"]').on('click',function (e) {
        if(!$('#MainNav button').hasClass("collapsed")) {
            $('#MainNav button').click();
        }

        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        if (target == "#MainNav") {
            var offset = $target.offset().top;
        } else {
            if ($(document).width() <= 980) {
                var offset = $target.offset().top;
            } else {
                var offset = $target.offset().top - mainNavHeight;
            }
        }
        $('html, body').stop().animate({
            'scrollTop': offset
        }, 600, 'swing', function () {
            /*window.location.hash = target;*/
        });
    });

    /* 100ms after everything is loaded we scroll to # */
    setTimeout(function(){
        if (location.hash) {
            if($('#MainNav.sticky').css('position') == 'static') {
                window.scrollTo(0, $(location.hash).offset().top);
            } else if($('#MainNav.sticky').css('position') == 'fixed') {
                window.scrollTo(0, $(location.hash).offset().top-mainNavHeight);
            } else if($('#MainNav.sticky').css('position') == 'relative') {
                window.scrollTo(0, $(location.hash).offset().top);
            } else {
                window.scrollTo(0, $(location.hash).offset().top);
            }
        }
    }, 150);

    $('.post-meta .comment a[href^="#"]').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
            if ($(document).width() <= 980) {
                var offset = $target.offset().top;
            } else {
                var offset = $target.offset().top - mainNavHeight;
            }
        $('html, body').stop().animate({
            'scrollTop': offset
        }, 600, 'swing', function () {
            /*window.location.hash = target;*/
        });
    });

	/* works ajax portfolio */

    /* numbers thumbnails in work list (#Work .slides) from 1 to x */
    var workThumbnails = $(".work .preview ul.slides li a");

    workThumbnails.each(function(index, thumbnail) {
        var i = index + 1;
        $(thumbnail).data("index", i);
    });

    /* show/hide animation */
    function showFullView (){
        $(".work").removeClass("general").addClass("details");
    }
    function hideFullView () {
        $(".work").removeClass("details").addClass("general");
    }
    hideFullView();

    function findSiblings (index, list) {
        var pindex = index-1;
        var ptarget = "";
        if (pindex <= 0) {
            pindex = list.length;
            ptarget = list.last().attr("href");
        } else {
            ptarget = list.filter(function(){
                return ($(this).data("index") == pindex)
            });
            ptarget = ptarget.attr("href");
        }
        var nindex = index+1;
        var ntarget = "";
        if (nindex > workThumbnails.length) {
            nindex = 1;
            ntarget = list.first().attr("href");
        } else {
            ntarget = list.filter(function(){
                return ($(this).data("index") == nindex)
            });
            ntarget = ntarget.attr("href");
        }
        siblings = new Object();
        siblings.p = new Object();
        siblings.p.index = pindex;
        siblings.p.target = ptarget;
        siblings.n = new Object();
        siblings.n.index = nindex;
        siblings.n.target = ntarget;
        return siblings;
    }

    var container = $(".work > .container");
    var box = $("section.full-view", container);
    /* Load content with Ajax when thumbnail is clicked */
    $(".work .preview .slides a").on('click',function (e) {
        e.preventDefault();
        var $work = $(".work");
        targets = new Object();
        targets.c = new Object();
        targets.c.target = $(this).attr('href');
        targets.c.index = $(this).data('index');
        targets.s = findSiblings(targets.c.index, workThumbnails);

        if (targets.c.target != "#" && targets.c.target != "") {
            $(".work .full-view").load(targets.c.target, function(){
                $(".work").data('target', targets.c.target);
                $(".work").data('index', targets.c.index);

                /*$(this).parent().height($(this).outerHeight(true));*/
                showFullView();

                /* create sibling box elements. pre-load next/prev works there. needed in next/prev animation */
                $(function () {
                    box.clone().removeClass().addClass("full-view row-fluid left clone").appendTo(container).load(targets.s.p.target);
                    box.clone().removeClass().addClass("full-view row-fluid right clone").appendTo(container).load(targets.s.n.target);
                    box.addClass("original");
                });
                lightboxOnResize();
            });
        }
	    scrollToAnchor($work);
    });

    /* ------------------------------------------ */
    /* ------------------------------------------ */
    /* ------------------------------------------ */

    function slide (dir){
        var $work = $(".work");
        $(".full-view", $work).removeClass("invisible");
        var rclone = $(".clone.right", $work);
        var lclone = $(".clone.left", $work);
        var original = $(".original", $work);
        var targetH = original.height();
        if (dir == "l") {

            $work.data('target', siblings.n.target).data('index', findSiblings($work.data("index"), workThumbnails).n.index);
            siblings = new Object();
            siblings = findSiblings($work.data("index"), workThumbnails);
            siblings.c = new Object();
            siblings.c.target = $work.data("target");
            siblings.c.index = $work.data("index");

            var targetH = rclone.height();
            rclone.toggleClass("clone right original");
            original.toggleClass("clone original left");
            lclone.toggleClass("left right invisible");
            rclone = $(".clone.right", $work);
            rclone.load(siblings.n.target, function(){
                lightboxOnResize();
            });
        } else if (dir == "r") {

            $work.data('target', siblings.p.target).data('index', findSiblings($work.data("index"), workThumbnails).p.index);
            siblings = new Object();
            siblings = findSiblings($work.data("index"), workThumbnails);
            siblings.c = new Object();
            siblings.c.target = $work.data("target");
            siblings.c.index = $work.data("index");

            var targetH = lclone.height();
            lclone.toggleClass("clone left original");
            original.toggleClass("clone original right");
            rclone.toggleClass("right left invisible");
            lclone = $(".clone.left", $work);
            lclone.load(siblings.p.target, function(){
                lightboxOnResize();
            });
        }
    }
    $(document).on('click', ".work .full-view nav a.all", function() {
        hideFullView();
        $(".work .clone").remove();

	    return false;
    });
    $(document).on('click', ".work .full-view nav a.prev", function(){
        slide("r");

	    return false;
    });
    $(document).on('click', ".work .full-view nav a.next", function(){
        slide("l");

	    return false;
    });


	/* mail validation */

	$("input[type='email']").on({
     blur : function(){
         if ($(this).val()){
             $(this).addClass("filled")
         } else {
             $(this).removeClass("filled")
         }
     }
 });
});