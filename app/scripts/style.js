$(document).ready(function() {
	var windowH = $(window).outerHeight();
	var headerH = $('header').outerHeight();
	var navH    = $('nav.tabs').outerHeight();
	var footerH = $('footer').outerHeight();

	$('section.drawer').height(Math.floor(windowH - headerH - footerH));
	setTimeout(function(){
	    $('main').height(Math.ceil(windowH - headerH - footerH - navH));
	}, 100);
});