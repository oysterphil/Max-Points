(function($){
  $(function(){
	var options = [
		{selector: '#scrollFireIcon1', offset: 150, callback: function(el) {
			Materialize.fadeInImage($(el));
			$('#scrollFireIcon1').playLiviconEvo();
		} },
		{selector: '#scrollFireIcon2', offset: 300, callback: function(el) {
			Materialize.fadeInImage($(el));
			$('#scrollFireIcon2').playLiviconEvo();
		} },
		{selector: '#scrollFireIcon3', offset: 400, callback: function(el) {
			Materialize.fadeInImage($(el));
			$('#scrollFireIcon3').playLiviconEvo();
		} }
	];
	Materialize.scrollFire(options);
    $('.button-collapse').sideNav();
	$('select').material_select();

  }); // end of document ready
})(jQuery); // end of jQuery name space