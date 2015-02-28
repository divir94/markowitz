var setHeights = function() {
    var windowH = $(window).outerHeight();
    var headerH = $('header').outerHeight();
    var navH    = $('nav.tabs').outerHeight();
    var footerH = $('footer').outerHeight();
    $('main').height(Math.ceil(windowH - headerH - footerH - navH - 10));
};