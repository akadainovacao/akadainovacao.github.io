$(document).ready(function(){

	$('.mobile-sidebar').sideNav();

  	$('.slider').slider({
  		'height' : 250,
  	});

  	$('.parallax').parallax();

  	$(".close").on("click", function() {
  		$('.side-nav').css({"transform":"translateX(-100%)"});
  		$('body').removeAttr('style');
  		// console.log('é isso ai');
  	});
});