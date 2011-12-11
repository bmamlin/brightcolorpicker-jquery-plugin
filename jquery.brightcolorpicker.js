/*
 * jQuery.brightcolorpicker - Simple color picker with brightness option
 * Burke Mamlin, http://burkeware.com
 * Released into the public domain
 * Date: 11th Dec 2011
 * @author Burke Mamlin
 * @version 1.0
 */

(function($) {

    function updateColor(event)
    {
        $(event.target).parent().next('.brightColorPicker-chosenColor')
            .css('background-color', $(event.target).css('background-color'));
    }

    function selectColor(event)
    {
        var target = $(event.target).parents('.brightColorPicker-colorPanel');
        target.hide();
        target.data('brightColorPicker').callback(target.find('.brightColorPicker-chosenColor').css('background-color'));
        event.stopPropagation();
    }


    function rgbToHex(r, g, b)
    {
        var rgb = b | (g << 8) | (r << 16);
        return '#' + rgb.toString(16);
    }

    var hsvToRgb = function(h, s, v)
    {
        var r, g, b;
        h = Math.max(0, Math.min(360, h));
        s = Math.max(0, Math.min(100, s));
        v = Math.max(0, Math.min(100, v));
        if (s === 0)
        {
            r = g = b = v;
        }
        else
        {
            h /= 60; // sector 0 to 5
            var i = Math.floor(h);
            var f = h - i; // factorial part of h
            var p = v * (1 - s);
            var q = v * (1 - s * f);
            var t = v * (1 - s * (1 - f));

            switch (i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;

            case 1:
                r = q;
                g = v;
                b = p;
                break;

            case 2:
                r = p;
                g = v;
                b = t;
                break;

            case 3:
                r = p;
                g = q;
                b = v;
                break;

            case 4:
                r = t;
                g = p;
                b = v;
                break;

            case 5:
                r = v;
                g = p;
                b = q;
            }
        }

        return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
    };

    var methods = {
        init: function(options)
        {

            return this.each(function() {

                var $this = $(this),
                    callback = (typeof options == 'function' ? options : options.callback);

                var settings = $.extend({ 'brightness': 0.20 }, options);

                var panel = $("<div class='brightColorPicker-colorPanel'></div>");
                panel.data('brightColorPicker', { 'callback' : callback });
                var closer = $("<a class='brightColorPicker-closeDialog' title='Close'></a>");
                closer.click(function(event) {
                    $(event.target).parents('brightColorPicker-colorPanel').hide();
                });
                panel.append(closer);
                var palette = $("<div class='brightColorPicker-colorPalette'></div>");
                panel.append(palette);
                panel.append("<div class='brightColorPicker-chosenColor'></div>");
                $this.append(panel);

                var i;
                for (i = 0; i < 40; i++)
                {
                    var rgb = hsvToRgb(i * 8, settings.brightness, 1);
                    var div = $("<div></div>").addClass('brightColorPicker-colorChoice')
                        .css('background-color', rgb).hover(updateColor).click(selectColor);
                    if (i > 0 && i % 8 === 0) 
                    {
                        div.addClass('newLine');
                    }
                    palette.append(div);
                }
            });

        },
        show: function()
        {
            return this.each(function() {
                $(this).find('.brightColorPicker-colorPanel').show();
            });
        },
        hide: function()
        {
            return this.each(function() {
                $(this).find('.brightColorPicker-colorPanel').hide();
            });
        },
        toggle: function()
        {
            return this.each(function() {
                $(this).find('.brightColorPicker-colorPanel').toggle();
            });
        }
    };

    $.fn.brightColorPicker = function(method)
        {

        if (methods[method])
        {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || typeof method == 'function' || !method)
        {
            return methods.init.apply(this, arguments);
        }
        else
        {
            $.error('Method ' + method + ' does not exist on jQuery.brightColorPicker');
        }
    };
})(jQuery);