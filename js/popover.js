/**
 * popover.js
 * To get the popover to work dynamically like it does on the
 * iPad, we'll need a little JavaScript to get things moving.
 * Actually, we'll need a lot of javascript, and I'm working
 * on it, but here is a simple script for the demonstration
 */

/*
 * _initPopover
 * Runs at DOM ready, sets up popover elements for display and
 * event listeners to manage the element at run time
 */
var _initPopover = function() {
	// hide all popovers at page load
	$('.ios-popover').hide();
	// listen for any a elements with the class .launch-ios-popover
	$('.launch-ios-popover').on('click touchstart', function(event) {
		event.preventDefault();
		// show the popover targeted by the rel attribute
		if($(this).hasClass('active')) { // is the popover already showing?
			// hide it
			_hidePopover();
		}
		else { // otherwise, show it
			$($(this).addClass('active').attr('rel')).show();
		}
	});

	// if the user clicks or taps outside the element, hide it
	$(document).on('click touchstart', function(event) {
		// get the target from the event object, with an adjustment for iPad events
		var target = !event.target ? $(event.originalEvent.target) : $(event.target);
		// check to make sure we need to hide the popover
		if(target.hasClass('ios-popover') || // is the target a popover element?
			 target.hasClass('launch-ios-popover') || // is the target a launcher? (managed by it's own event listener)
			 target.parents('.ios-popover').length) { // is the target a child of a popover element?
			 return; //
		}
		_hidePopover();
	});
};

/**
 * _hidePopover
 * manages the smooth hiding of the popover element
 */
var _hidePopover = function() {
	// grab any visible popover element, and set the opacity to 0
	$('.ios-popover:visible').css({ 'opacity' : 0 });
	// wait 300 milliseconds and clean up the elements
	window.setTimeout(function() {
		// hide the element and reset it's opacity
		$('.ios-popover:visible').hide().css({ 'opacity' : 1 });
		// remove the active class from the launcher
		$('.launch-ios-popover.active').removeClass('active');
	}, 300);
};

$(document).ready(_initPopover);