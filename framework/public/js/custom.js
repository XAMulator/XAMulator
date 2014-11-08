var container = $('#div-1'),
    wrapper = $('#div-2');

// temporarily fix the outer div's width
container.css({width: wrapper.width()});
// fade opacity of inner div - use opacity because we cannot get the width or height of an element with display set to none
wrapper.fadeTo('slow', 0, function(){
    // change the div content
    container.html("<div id=\"2\" style=\"display: none;\">new content (with a new width)</div>");
    // give the outer div the same width as the inner div with a smooth animation
    container.animate({width: wrapper.width()}, function(){
        // show the inner div
        wrapper.fadeTo('slow', 1);
    });
});