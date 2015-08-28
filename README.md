# Zipper.js
A simple jQuery plugin that triggers functions when DOM elements are scrolled to specified points in the window/container.

This plugin aims to work like the scroll animations found at Zed Shaw's 'Learn Python the hard way" (http://learnpythonthehardway.org/), in that it allows you to execute a function on vertical scrolling when a certain element is at a specified position within the window, and also allows you to execute a function on a reverse (upward) scroll at the same or a different point. 

# Use:

To use Zipper.js, simply chain the function to any jQuery selected element:
```
  $('div.my_div').Zipper({
    //do stuff
    });
```    
# Putting it to use: 

Zipper.js allows you to execute a function on a DOM element once it's scrolled into a specified point within its container. Thus, the plugin necessitates an execution function and a point specified to be of any use! Below, I list all the possible properties and their meaning, along with some examples.

###1.) <b>unzip:</b> 

On a downward scroll, the 'unzip' property (get it? unzipping the page?) is the function that will execute when the DOM Element reaches the specfied point in the viewport. Needless to say, this property must be  a function, and the 'this' value will refer to the DOM element. Heres how it would look: 
  ```
  $('div.my_div').Zipper({
    unzip: function() {
      this.css('color', 'red'); // 'this' refers to the 'div.my_div' element
    }
  });
```
###2.) <b>triggerPoint:</b>
On a downward scroll, the 'triggerPoint' property is the point in the container being scrolled where the 'unzip' function will be triggered. You can think of it as essentially an invisible line, at a fixed position in the container's height that triggers the function when the DOM element crosses it. A value of 0 (default) means that when the Element is scrolled to the top of the container, the function will trigger, while a value of 1 represents the very bottom of the window/container. Following then, a value of 0.5 will place this invisible line in the middle of the window/container. Let's take another look: 
```
  $('div.my_div').Zipper({
    unzip: function() {
      this.css('color', 'red');
    },
    triggerPoint: 0.25 // When the element is 25% from the top of the window, trigger the 'unzip' function
  });
```
###3.) <b>zip:</b> 
On an upwards scroll, the 'zip' function will trigger when reaching a specified point. This works exactly the same way as the 'unzip' property discussed above, but this only works when scrolling up (or zipping the page up, get it?). To add to our example: 
```
  $('div.my_div').Zipper({
    unzip: function() {
      this.css('color', 'red');
    },
    triggerPoint: 0.25,
    zip: function() {
      this.css('color', 'black'); //change the color of 'div.my_div' to black when scrolling, or 'zipping' up. 
    }
  });
```
###4.) <b>reversePoint:</b> 
While scrolling upwards, this is the point in the window or container that, when the DOM element reaches, will trigger the 'zip' function above. This works exactly like our triggerPoint property, but only on an upwards scroll. Unless specified otherwise, the default value for this is the same as the triggerPoint. To continue with the same example: 
```
  $('div.my_div').Zipper({
    unzip: function() {
      this.css('color', 'red');
    },
    triggerPoint: 0.25,
    zip: function() {
      this.css('color', 'black'); 
    },
    reversePoint: 0.75 // trigger the 'zip' function when the div is 75% from the top of the window/container
  });
```
###5.) <b> container:</b> 
If you wish to trigger the Zipper functions on an element within something like a scrollable div, for example, you can pass this property to the Zipper function, referencing the scrollable element in question. Continuing with our example, imagine our element, 'div.my_div' was a child of the '#scrollablediv' element, we can pass this element to the 'container' property in order to trigger these functions while scrolling our parent element. <b> Note: the parent element must be positioned (relative, fixed, absolute) in order for this to work </b>: 
```
  $('div.my_div').Zipper({
    unzip: function() {
      this.css('color', 'red');
    },
    triggerPoint: 0.25,
    zip: function() {
      this.css('color', 'black'); 
    },
    reversePoint: 0.75,
    container: document.getElementById('scrollablediv') //this instance of Zipper will trigger while scrolling through this property
  });  
```


