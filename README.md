# Torch.js
A simple jQuery plugin that triggers functions when the page is scrolled to a specified point.

This plugin only listens to scrolling in the window, not for individual elements. Thus, as an example, if you want to trigger a function while scrolling a div with an 'overflow-y' of 'scroll', this will not work for that purpose. <b>This will only work for vertical scrolling on the window itself.</b>

This plugin aims to work like the scroll animations found at Zed Shaw's 'Learn Python the hard way" (http://learnpythonthehardway.org/), in that it allows you to execute a function when a certain element is at a specified position within the window, and also allows you to execute a function on a reverse (upward) scroll at the same or a different point. 

# Use:

To use Torch.js, simply call the function after passing a DOM element to the jQuery object as below:

      $('#element').Torch({
          //object properties here
      });

As you can see, Torch expects an object with certain properties. Only one is mandatory. We explore those properties below. 

# Expected Arguments:

1.) <b>forward:</b> This must defined and must be a function. This is the function that will execute on a downward scroll. 

2.) <b>triggerPoint:</b> This value is optional and if passed, must be a number between 0 & 1, representing a range from the     top to the bottom of the window. A value of 0 (the default) means that when the top of the element in question reaches       the top of the window, the forward function will be triggered. A value of 1 will mean that when the top of the element        reaches the bottom of the window, the forward function will be triggered (hence, a value of 1 makes no sense in this           context since the function will trigger even before the element is in view). As a final example, a value of 0.5 will        mean that once the top of the element reaches halfway through the window, the forward function will be triggered. 

3.) <b>reverse:</b> This value is optional as well and when defined, must be a function. This function is executed on an         upward scroll through the window. The reverse function will trigger when the top of the element reaches the triggerPoint     defined above, or optionally, the reversePoint defined below. 

4.) <b>reversePoint:</b> This value is optional and if passed, must also be a number between 0 & 1, representing the same        range and behavior as the triggerPoint property. This is only relevant if the 'reverse' property is defined and can be       used to set an alternate vertical coordinate to trigger the reverse function on an upward scroll.

# Examples: 

  Below is an example of how to use Torch: 
  
    $('div:nth-child(odd)').Torch({
        forward: function() {
                $(this).css('background-color','#000');
                },
        triggerPoint: 0.2,
        reverse: function() {
                $(this).css('background-color', '#fff');
                }
        });
        
  In the above example, all divs that are odd have a downward scroll triggerPoint of 0.2, meaning 20% from the top of the      window. When the top of the element is scrolled to that point, the forward function will execute, turning the background     color of the div to black. When scrolled upwards, when the top of the element is scrolled to the same point (the             triggerPoint), the reverse function will execute, turning the background color to white. 
