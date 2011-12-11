# jQuery Bright Color Picker Plugin

This plugin provides a simple color picker with a spectrum of colors and an option to control the brightness of the color selection.

Created initially to substitute for Farbtastic's color wheel in etherpad-lite.

Usage:

	<link rel="stylesheet" type="text/css" src="brightcolorpicker.css" />

	<div id="foobar" />

	$('#foo').brightColorPicker( function(color) {
		$('#myColor').css('background-color', color);
	}).click(function() {
	    $('#myColor').brightColorPicker('toggle');
	});