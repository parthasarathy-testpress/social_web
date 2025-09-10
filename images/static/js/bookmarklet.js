(function() {
    var jquery_version = '3.4.1';
    var site_url = 'https://127.0.0.1:8000/';
    var static_url = site_url + 'static/';
    var min_width = 100;
    var min_height = 100;

    function bookmarklet(msg) {

        // load CSS
        var css = jQuery('<link>');
        css.attr({
            rel: 'stylesheet',
            type: 'text/css',
            href: static_url + 'css/bookmarklet.css?r=' + Math.floor(Math.random() * 99999999999999999999)
        });
        jQuery('head').append(css);

        // load HTML
        box_html = '<div id="bookmarklet"><a href="#" id="close">&times;</a><h1>Select an image to bookmark:</h1><div class="images"></div></div>';
        jQuery('body').append(box_html);

        // close event
        jQuery('#bookmarklet #close').click(function() {
            jQuery('#bookmarklet').remove();
        });
        // find images and display them
        jQuery.each(jQuery('img[src$="jpg"]'), function(index, image) {
          if (jQuery(image).width() >= min_width && jQuery(image).height() >= min_height) {
             // Get image URL
             image_url = jQuery(image).attr('src');

             // Append the image inside the bookmarklet container
             jQuery('#bookmarklet .images').append('<a href="#"><img src="' + image_url + '" /></a>');
            }
        });
    };

    // Check if jQuery is loaded
    if (typeof window.jQuery != 'undefined') {
        // jQuery is already loaded, run the bookmarklet
        bookmarklet();
    } else {
        // Check for conflicts with the $ variable
        var conflict = typeof window.$ != 'undefined';

        // Create the script element pointing to Google API for jQuery
        var script = document.createElement('script');
        script.src = '//ajax.googleapis.com/ajax/libs/jquery/' + jquery_version + '/jquery.min.js';

        // Add the script to the document head for processing
        document.head.appendChild(script);

        // Create a way to wait until the script is loaded
        var attempts = 15;
        (function() {
            // Check again if jQuery is undefined
            if (typeof window.jQuery == 'undefined') {
                if (--attempts > 0) {
                    // Retry after a short delay
                    window.setTimeout(arguments.callee, 250);
                } else {
                    // Too many attempts, alert the user
                    alert('An error occurred while loading jQuery');
                }
            } else {
                // jQuery loaded successfully, run the bookmarklet
                bookmarklet();
            }
        })();
    }
})();
