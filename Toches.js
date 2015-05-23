/**
* Torches is a jquery plugin that allows you to trigger a function 
* when the user scrolls vertically to a certain point on the page.
*
* It also allows you to specify the point in the window where the 
* function is triggered. Other options include an optional function
* to trigger on an upward scroll, and a seocnd point in the window 
* to trigger the upward scroll function. Please refer to the README 
* for more explanations of how it works. 
* 
* To use:
* 
* $(#Element).Torches({
*    forward: // REQUIRED: function triggered on downward scroll
*  });
* 
* Properties expected by the Torches object: 
*   
*  1.) forward: a required property. must be a function. The DOM element 
*      that you wish to exercise the function on can be referred to within the
*      the forward function as "$(this)"  
*
*  2.) triggerPoint: an option property. if not passed, it will default to
*      0. This property specifies where, within the window, the function will
*      be triggered. a value of 0 (default) will mean that once the top of the
*      element reaches the top of the window, the function will be triggered,
*      while a value of 1 (not sure why you'd ever want to pass this value) means
*      that when the top of the element reaches the bottom of the window, it will
*      be triggered. Similarly, a value of 0.5 means that once the top of the element 
*      reaches halfway through thr window, the function will be triggered. 
*
*  3.) reverse: An optional function. This function will execute when the page
*      is scrolled upwards, as opposed to downwards (hence, reverse). In this case
*      this function will run once the top of the element reaches the triggerPoint
*      defined before, or, if the 'reversePoint' property is desired, it will 
*      execute at that point. This property is discussed next.
*
*  4.) reversePoint: An optional second trigger point. It's values are between
*      0 and 1, just as the triggerPoint property, and will execute the reverse
*       
*  https://github.com/asim-qureshi/torches.js
*/     
if (typeof(Object.create !== "function")) {
    Object.create = function( obj ) {
        function F() {};
        F.prototype = obj;
        return new F();
    };
};
(function($, window, document, undefined) {
    
    var Torches = {
        init: function(config,elem) {
            this.elem = elem;
            this.elemPos = $(this.elem).offset().top;
            if (typeof config.forward !== "function") {
                throw new Error('The forward property is required and must be a function');
                };
            if (config.rewind && typeof config.rewind !== "function") {
                throw new Error('The reverse property must be a function');
                };
            this.scroll(config);
        },
        
        settings: function(config) {            
            return {
                forward: config.forward,
                triggerPoint: config.triggerPoint || 0,
                reverse: config.reverse || null,
                reversePoint: config.reversePoint || undefined
            }
        },
        
        scroll: function( config ) {
            var self = this,
                finalSet = this.settings(config),
                windowPos = window.pageYOffset;
            $(window).on('scroll', function() {
                var windowCur = this.pageYOffset,            
                    trigger = finalSet.triggerPoint * window.innerHeight,
                    reverseTrig = finalSet.reversePoint * window.innerHeight;
                if (windowCur > windowPos && trigger + windowPos >= self.elemPos && (!$(self.elem).hasClass('passed_forward'))) {
                        finalSet.forward.call(self.elem);
                        $(self.elem).addClass('passed_forward');
                }
                else {
                    if (typeof finalSet.reverse == "function" && $(self.elem).hasClass('passed_forward')) {
                        if (typeof finalSet.reversePoint == "number") {
                            if (self.elemPos >= reverseTrig + windowPos) {
                                finalSet.reverse.call(self.elem);
                                $(self.elem).removeClass('passed_forward');
                            }
                        }
                        else { 
                            if (self.elemPos >= trigger + windowPos) {
                                finalSet.reverse.call(self.elem);
                                $(self.elem).removeClass('passed_forward');
                            }
                        }   
                    }
                }
                windowPos = windowCur;
            });
        }
    };
                
    $.fn.Torches = function(config) {
        return this.each(function() {
            var torch = Object.create( Torches );
            torch.init( config, this );       
        })
    };    
    
}(jQuery, window, document));
