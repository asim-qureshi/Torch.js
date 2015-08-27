(function ($, window, document, undefined) {
	
	'use strict';

    var Teeth = {
        init: function (config, elem) {
			
		this.elem = $(elem);
		this.unzip = config.unzip;
		this.zip = config.zip || null; //downward scroll function is either defined or null
		
		if (config.container) { //if a scrollable element other than the window is passed
			this.container = $(config.container);
			this.elemPos = this.elem.position().top; //use the position().top method to get the vertical offset of our DOM element
			if (this.container.css('position') === 'static') {
				throw new Error('The parent element must be a positioned element (relative, fixed, or absolute)');
			}
		} else {  //otherwise, default is window
			this.container = $(window);
			this.elemPos = this.elem.offset().top; //use the offset().top method to get vertical position of our DOM Element
		}
		
		this.triggerPoint = config.triggerPoint * this.container.innerHeight() || 0; // point in the window to fire the element is either defined or the element top
		this.reversePoint = config.reversePoint * this.container.innerHeight() || undefined;
		this.scroll();
        },
		
			
	scroll: function () {
		var self = this,
			containerPos = this.container.scrollTop(), //get the current scroll on the container
			timer = 0;
		this.container.on('scroll', function () {
			if (timer) {
				return; //prevent function below from firing mutliple times on scroll
			}
			timer = setTimeout(function () {
				var curPos = self.container.scrollTop();  //get the position scrolled to after scrolling finished
				if (curPos >= containerPos) { //if determined to have scrolled down, trigger the function for downwards scrolling
					self.zipDown(curPos + self.triggerPoint);
				} else { //otherwise, scrolling was upwards, trigger the function for upwards scrolling
					self.zipUp(curPos + self.triggerPoint, curPos + self.reversePoint);
				}
				containerPos = curPos;  //reset the initial scroll to the current position
			}, 150);
			timer = 0; //clear the timeout
		});
	},
	

	zipDown: function (position) {
		if (!this.elem.hasClass('passed_forward') && position >= this.elemPos) { //the 'passed_forward' class is added to all elements that we've already executed our function on
			this.unzip.call(this.elem.addClass('passed_forward')); //call the function while preserving context and adding the 'passed_forward' class
		}
	},
	

	zipUp: function (top, bottom) {
		if (this.elemPos >= bottom && this.elem.hasClass('passed_forward')) { //if the DOM element is below the upward scroll point and has been scrolled down through
			this.zip.call(this.elem.removeClass('passed_forward')); //call the function while preserving context and removing the 'passed_forward' class
		}
	}
		
    };
                
    $.fn.Zipper = function (config) {
        return this.each(function () {
            var tooth = Object.create(Teeth);
            tooth.init(config, this);
        });
    };
    
}(jQuery, window, document));
