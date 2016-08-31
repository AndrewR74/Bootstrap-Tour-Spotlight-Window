# Bootstrap-Tour-Spotlight-Window
Extends the bootstrap-tour plugin by adding a spotlight window for steps. The original backdrop feature was not compatible with z-index. This spotlight window is similar to Google Forms tour spotlight window

### Integration with Tour Example http://845.ddns.net

> There are two options to integrate the Spotlight functionality with the Bootstrap Tour plugin.
* Use a modified version of the BST plugin for a seemless integration.
> Modified BST available in repo
* Use BST events to control the Spotlight plugin.
> Refer to the BST API docs for avaiable events. Use table below for available Spotlight methods.

### Standalone Spotlight JS Fiddle http://jsfiddle.net/YenN4/23/

> The stand alone version does not require Jquery. Although, BST does require Jquery.

### Quick Start with Standalone 

```JS
$(function() {
	var spotlight = new OverlayWindow([$("p:first")[0], $("p:last")[0]], {"background-color": "purple"});
  spotlight.show(0);
  $("body").on("click",function() { spotlight.nextWindow(); });
});
```

### Contructor
* Argument 1: An array of Javascript Dom nodes. Not Jquery objects
* Argument 2: Optional: Options to be used by the plugin. Refer to options table below.

### Methods
| Method        | Descrption     |
| ------------- |:-------------:|
| nextWindow      | Move the spotlight window to the next element |
| prevWindow      | Move the spotlight window to the previous element |
| dispose      | Remove all traces of the Spotlight |
| redraw      | Redraw with animation |
| redrawInstant      | Redraw without animation |
| show      | Same as redraw but has an optional argument that may be used to specify an element to move the spotlight to |
| hide      | Same as dispose but allows redraw to be called and everything will continue to work |

### Options
| Option        | Descrption     | Default Value     | Type     | Example     | Notes |
| ------------- |:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
| background-color      | The color of the spotlight backdrop | null | string | "green" | None
| css      | Custom styles for the spotlight backdrop | null | string | "border: 1px solid black;" | Must end with a semi-colon
