(function($){
  $(function(){

    $('.button-collapse').sideNav();
	$('input.autocomplete').autocomplete({
		data: {
		  'American Express Blue Cash Everyday': null,
		  'American Express Blue Cash Preferred': null,
		  'American Express Blue Sky': null,
		  'American Express Charles Schwabb Investor Card': null,
		  'American Express Platinum (Personal)': null,
		  'American Express Platinum (Business)': null
		}
	});
	$('select').material_select();

  }); // end of document ready
})(jQuery); // end of jQuery name space