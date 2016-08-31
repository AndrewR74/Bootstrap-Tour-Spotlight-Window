/* ========================================================================
 * Overlay Window For Bootstrap-tour - v0.0.1
 * http://bootstraptour.com
 * ========================================================================
 * Copyright 2016 AndrewR74
 *
 * ========================================================================
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================================
 */

(function(window, factory) {
  window.OverlayWindow = factory();
})(window, function() {
	var OverlayWindow = function (targetElems, options) {
		var gp = function(el) {
		  var xPos = 0;
		  var yPos = 0;

		  while (el) {
			  // for all other non-BODY elements
			  xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
			  yPos += (el.offsetTop - el.scrollTop + el.clientTop);
			el = el.offsetParent;
		  }
		  return {
			x: xPos,
			y: yPos
		  };
		},
		gov = function(on, dv) {
			return _self._options && _self._options[on] ? _self._options[on] : dv;
		},
		cd = function(a) {
		  var div = document.createElement('div');
		  div.setAttribute('data-bd', a);
		  return div;
		},
		g = function(w, h, nw, nh, p, s, t) {
		  return "[data-bd='" + p + "'] { " + s + "position: fixed; z-index: 1; opacity: 0.5; background-color: " + gov("background-color", "red") + "; animation: " + t + "s forwards; animation-name: slidein" + p + ";"+ 
			"height: " + h + ";" +
			"width: " + w + ";" +
		  "}" + gov("css", "") +

		  "@keyframes slidein" + p + "{ from {" +
			"height: " + h + ";" +
			"width: " + w + ";" +
		  "} to {" +
			"height: " + nh + ";" +
			"width: " + nw + ";" +
		  "}}\r\n";
		},
		_self = this,
		_bound = false;
		this._backdrops = [cd("L"), cd("T"), cd("B"), cd("R")];
			this._backdropsSizes = [{w: 0, h: 0},{w: 0, h: 0},{w: 0, h: 0},{w: 0, h: 0}];
		this._elems = targetElems;
			this.i = 0;
		this.s = null;
		this._options = options;
		var body = document.body,
				html = document.documentElement;
		this.dbd = function(instanst) {
		  var ce = _self._elems[_self.i],
			  d = (instanst ? 0 : 1),
			  cp = gp(ce),
			  cs = { w: ce.offsetWidth, h: ce.offsetHeight },
			  ws = { w: body.offsetWidth, h: html.clientHeight };
		  if(_self.s !== null) {
			document.head.removeChild(_self.s);
			for(var x = 0; x < _self._backdrops.length; x++)
			  document.body.removeChild(_self._backdrops[x]);
		  }

		  var L = g(_self._backdropsSizes[0].w + "px", _self._backdropsSizes[0].h + "px", cp.x + "px", (cp.y + cs.h) + "px", "L", "top: 0; left: 0;", d);
		  _self._backdropsSizes[0].w = cp.x; // TL
		  _self._backdropsSizes[0].h = (cp.y + cs.h);
		  var T = g(_self._backdropsSizes[1].w + "px", _self._backdropsSizes[1].h + "px", (ws.w - cp.x) + "px", cp.y + "px", "T", "top: 0; right: 0;", d);
		  _self._backdropsSizes[1].w = (ws.w - cp.x); // TR
		  _self._backdropsSizes[1].h = cp.y;
		  var R = g(_self._backdropsSizes[2].w + "px", _self._backdropsSizes[2].h + "px", (cp.x + cs.w) + "px", (ws.h - (cp.y + cs.h)) + "px", "R", "bottom: 0; left: 0;", d);
		  _self._backdropsSizes[2].w = (cp.x + cs.w); // BL
		  _self._backdropsSizes[2].h = (ws.h - (cp.y + cs.h));
		  var B = g(_self._backdropsSizes[3].w + "px", _self._backdropsSizes[3].h + "px", (ws.w - (cp.x + cs.w)) + "px", (ws.h - cp.y) + "px", "B", "bottom: 0; right: 0;", d);
		  _self._backdropsSizes[3].w = (ws.w - (cp.x + cs.w)); // BR
		  _self._backdropsSizes[3].h = (ws.h - cp.y);

		  _self.s = document.createElement('style');
		  _self.s.type = 'text/css';
		  if (_self.s.styleSheet){
			_self.s.styleSheet.cssText = L + T  + B + R;
		  } else {
			_self.s.appendChild(document.createTextNode(L + T  + B + R));
		  }

		  (document.head || document.getElementsByTagName('head')[0]).appendChild(_self.s);

		  for(var x = 0; x < _self._backdrops.length; x++)
			document.body.appendChild(_self._backdrops[x]);
		
			if(!_bound) {
				window.addEventListener("resize", _self.redrawInstant);
				_bound = true;
			}
		}

	  OverlayWindow.prototype.nextWindow = function() {
		this.i++;
		if(this.i >= this._elems.length)
		  this.i = 0;
		this.dbd();
	  };
	  
	  OverlayWindow.prototype.prevWindow = function() {
		this.i--;
		if(this.i < 0)
		  this.i = this._elems.length - 1;
		this.dbd();
	  };
	  
	  OverlayWindow.prototype.dispose = function() {
		window.removeEventListener("resize", _self.redrawInstant);
		_bound = false;
		
		if(_self.s !== null)
			document.head.removeChild(_self.s);
		_self.s = null;
		for(var x = 0; x < _self._backdrops.length; x++)
		  document.body.removeChild(_self._backdrops[x]);
	  };
	  
	  OverlayWindow.prototype.redraw = function() {
		_self.dbd();
	  };
	  
	  OverlayWindow.prototype.redrawInstant = function() {
		_self.dbd(true);
	  };
	  
	  OverlayWindow.prototype.show = function(ik) {
		  if(typeof ik !== 'undefined')
			  this.i = ik;
		this.redraw();
	  };
	  
	  OverlayWindow.prototype.hide = function() {
		this.dispose();
	  };
	}
	return OverlayWindow;
});