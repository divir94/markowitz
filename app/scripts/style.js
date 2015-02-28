$(document).ready(function() {
	var windowH = $(window).outerHeight();
	var headerH = $('header').outerHeight();
	var footerH = $('footer').outerHeight();
	$('section.drawer').height(Math.floor(windowH - headerH - footerH));
});