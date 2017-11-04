(function($){
  $(function(){

  	$(".button-collapse").sideNav({
  		closeOnClick: true,
  	});
  	$(".close").on("click", function() {
  		$('.side-nav').css({"transform":"translateX(-100%)"});
  		$('body').removeAttr('style');
  		// console.log('é isso ai');
  	});
  	
	$(".slide").slick({
		slidesToScroll: 1,
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		arrows: false,
  		autoplay: true,
  		autoplaySpeed: 5000
	});

	$('.slide-item').each( function () {
		for (var i = 0; i < $('.slide-item').length; i++) {
			$('#slick-slide-control0'+i)
			.addClass('tooltipped')
			.data({
				position: "right",
				delay: "50",
				tooltip: "I am a tooltip"
			})
		}
	});


  }); // end of document ready
})(jQuery); // end of jQuery name space