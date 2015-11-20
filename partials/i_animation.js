(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

!function(a,b){b["true"]=a,function(){if(document.documentElement.animate){var a=document.documentElement.animate([],0),b=!0;if(a&&(b=!1,"play|currentTime|pause|reverse|playbackRate|cancel|finish|startTime|playState".split("|").forEach(function(c){void 0===a[c]&&(b=!0)})),!b)return}var c={},d={},e={},f=null;!function(a){function b(a){if("number"==typeof a)return a;var b={};for(var c in a)b[c]=a[c];return b}function c(){this._delay=0,this._endDelay=0,this._fill="none",this._iterationStart=0,this._iterations=1,this._duration=0,this._playbackRate=1,this._direction="normal",this._easing="linear"}function d(b,d){var e=new c;return d&&(e.fill="both",e.duration="auto"),"number"!=typeof b||isNaN(b)?void 0!==b&&Object.getOwnPropertyNames(b).forEach(function(c){if("auto"!=b[c]){if(("number"==typeof e[c]||"duration"==c)&&("number"!=typeof b[c]||isNaN(b[c])))return;if("fill"==c&&-1==s.indexOf(b[c]))return;if("direction"==c&&-1==t.indexOf(b[c]))return;if("playbackRate"==c&&1!==b[c]&&a.isDeprecated("AnimationEffectTiming.playbackRate","2014-11-28","Use Animation.playbackRate instead."))return;e[c]=b[c]}}):e.duration=b,e}function e(a){return"number"==typeof a&&(a=isNaN(a)?{duration:0}:{duration:a}),a}function f(b,c){b=a.numericTimingToObject(b);var e=d(b,c);return e._easing=i(e.easing),e}function g(a,b,c,d){return 0>a||a>1||0>c||c>1?B:function(e){function f(a,b,c){return 3*a*(1-c)*(1-c)*c+3*b*(1-c)*c*c+c*c*c}if(0==e||1==e)return e;for(var g=0,h=1;;){var i=(g+h)/2,j=f(a,c,i);if(Math.abs(e-j)<.001)return f(b,d,i);e>j?g=i:h=i}}}function h(a,b){return function(c){if(c>=1)return 1;var d=1/a;return c+=b*d,c-c%d}}function i(a){var b=z.exec(a);if(b)return g.apply(this,b.slice(1).map(Number));var c=A.exec(a);if(c)return h(Number(c[1]),{start:u,middle:v,end:w}[c[2]]);var d=x[a];return d?d:B}function j(a){return Math.abs(k(a)/a.playbackRate)}function k(a){return a.duration*a.iterations}function l(a,b,c){return null==b?C:b<c.delay?D:b>=c.delay+a?E:F}function m(a,b,c,d,e){switch(d){case D:return"backwards"==b||"both"==b?0:null;case F:return c-e;case E:return"forwards"==b||"both"==b?a:null;case C:return null}}function n(a,b,c,d){return(d.playbackRate<0?b-a:b)*d.playbackRate+c}function o(a,b,c,d,e){return 1/0===c||c===-1/0||c-d==b&&e.iterations&&(e.iterations+e.iterationStart)%1==0?a:c%a}function p(a,b,c,d){return 0===c?0:b==a?d.iterationStart+d.iterations-1:Math.floor(c/a)}function q(a,b,c,d){var e=a%2>=1,f="normal"==d.direction||d.direction==(e?"alternate-reverse":"alternate"),g=f?c:b-c,h=g/b;return b*d.easing(h)}function r(a,b,c){var d=l(a,b,c),e=m(a,c.fill,b,d,c.delay);if(null===e)return null;if(0===a)return d===D?0:1;var f=c.iterationStart*c.duration,g=n(a,e,f,c),h=o(c.duration,k(c),g,f,c),i=p(c.duration,h,g,c);return q(i,c.duration,h,c)/c.duration}var s="backwards|forwards|both|none".split("|"),t="reverse|alternate|alternate-reverse".split("|");c.prototype={_setMember:function(b,c){this["_"+b]=c,this._effect&&(this._effect._timingInput[b]=c,this._effect._timing=a.normalizeTimingInput(a.normalizeTimingInput(this._effect._timingInput)),this._effect.activeDuration=a.calculateActiveDuration(this._effect._timing),this._effect._animation&&this._effect._animation._rebuildUnderlyingAnimation())},get playbackRate(){return this._playbackRate},set delay(a){this._setMember("delay",a)},get delay(){return this._delay},set endDelay(a){this._setMember("endDelay",a)},get endDelay(){return this._endDelay},set fill(a){this._setMember("fill",a)},get fill(){return this._fill},set iterationStart(a){this._setMember("iterationStart",a)},get iterationStart(){return this._iterationStart},set duration(a){this._setMember("duration",a)},get duration(){return this._duration},set direction(a){this._setMember("direction",a)},get direction(){return this._direction},set easing(a){this._setMember("easing",a)},get easing(){return this._easing},set iterations(a){this._setMember("iterations",a)},get iterations(){return this._iterations}};var u=1,v=.5,w=0,x={ease:g(.25,.1,.25,1),"ease-in":g(.42,0,1,1),"ease-out":g(0,0,.58,1),"ease-in-out":g(.42,0,.58,1),"step-start":h(1,u),"step-middle":h(1,v),"step-end":h(1,w)},y="\\s*(-?\\d+\\.?\\d*|-?\\.\\d+)\\s*",z=new RegExp("cubic-bezier\\("+y+","+y+","+y+","+y+"\\)"),A=/steps\(\s*(\d+)\s*,\s*(start|middle|end)\s*\)/,B=function(a){return a},C=0,D=1,E=2,F=3;a.cloneTimingInput=b,a.makeTiming=d,a.numericTimingToObject=e,a.normalizeTimingInput=f,a.calculateActiveDuration=j,a.calculateTimeFraction=r,a.calculatePhase=l,a.toTimingFunction=i}(c,f),function(a){function b(a,b){return a in h?h[a][b]||b:b}function c(a,c,d){var g=e[a];if(g){f.style[a]=c;for(var h in g){var i=g[h],j=f.style[i];d[i]=b(i,j)}}else d[a]=b(a,c)}function d(b){function d(){var a=e.length;null==e[a-1].offset&&(e[a-1].offset=1),a>1&&null==e[0].offset&&(e[0].offset=0);for(var b=0,c=e[0].offset,d=1;a>d;d++){var f=e[d].offset;if(null!=f){for(var g=1;d-b>g;g++)e[b+g].offset=c+(f-c)*g/(d-b);b=d,c=f}}}if(!Array.isArray(b)&&null!==b)throw new TypeError("Keyframes must be null or an array of keyframes");if(null==b)return[];for(var e=b.map(function(b){var d={};for(var e in b){var f=b[e];if("offset"==e){if(null!=f&&(f=Number(f),!isFinite(f)))throw new TypeError("keyframe offsets must be numbers.")}else{if("composite"==e)throw{type:DOMException.NOT_SUPPORTED_ERR,name:"NotSupportedError",message:"add compositing is not supported"};f="easing"==e?a.toTimingFunction(f):""+f}c(e,f,d)}return void 0==d.offset&&(d.offset=null),void 0==d.easing&&(d.easing=a.toTimingFunction("linear")),d}),f=!0,g=-1/0,h=0;h<e.length;h++){var i=e[h].offset;if(null!=i){if(g>i)throw{code:DOMException.INVALID_MODIFICATION_ERR,name:"InvalidModificationError",message:"Keyframes are not loosely sorted by offset. Sort or specify offsets."};g=i}else f=!1}return e=e.filter(function(a){return a.offset>=0&&a.offset<=1}),f||d(),e}var e={background:["backgroundImage","backgroundPosition","backgroundSize","backgroundRepeat","backgroundAttachment","backgroundOrigin","backgroundClip","backgroundColor"],border:["borderTopColor","borderTopStyle","borderTopWidth","borderRightColor","borderRightStyle","borderRightWidth","borderBottomColor","borderBottomStyle","borderBottomWidth","borderLeftColor","borderLeftStyle","borderLeftWidth"],borderBottom:["borderBottomWidth","borderBottomStyle","borderBottomColor"],borderColor:["borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"],borderLeft:["borderLeftWidth","borderLeftStyle","borderLeftColor"],borderRadius:["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],borderRight:["borderRightWidth","borderRightStyle","borderRightColor"],borderTop:["borderTopWidth","borderTopStyle","borderTopColor"],borderWidth:["borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth"],flex:["flexGrow","flexShrink","flexBasis"],font:["fontFamily","fontSize","fontStyle","fontVariant","fontWeight","lineHeight"],margin:["marginTop","marginRight","marginBottom","marginLeft"],outline:["outlineColor","outlineStyle","outlineWidth"],padding:["paddingTop","paddingRight","paddingBottom","paddingLeft"]},f=document.createElementNS("http://www.w3.org/1999/xhtml","div"),g={thin:"1px",medium:"3px",thick:"5px"},h={borderBottomWidth:g,borderLeftWidth:g,borderRightWidth:g,borderTopWidth:g,fontSize:{"xx-small":"60%","x-small":"75%",small:"89%",medium:"100%",large:"120%","x-large":"150%","xx-large":"200%"},fontWeight:{normal:"400",bold:"700"},outlineWidth:g,textShadow:{none:"0px 0px 0px transparent"},boxShadow:{none:"0px 0px 0px 0px transparent"}};a.normalizeKeyframes=d}(c,f),function(a){var b={};a.isDeprecated=function(a,c,d,e){var f=e?"are":"is",g=new Date,h=new Date(c);return h.setMonth(h.getMonth()+3),h>g?(a in b||console.warn("Web Animations: "+a+" "+f+" deprecated and will stop working on "+h.toDateString()+". "+d),b[a]=!0,!1):!0},a.deprecated=function(b,c,d,e){var f=e?"are":"is";if(a.isDeprecated(b,c,d,e))throw new Error(b+" "+f+" no longer supported. "+d)}}(c),function(a,b){function c(a){for(var b={},c=0;c<a.length;c++)for(var d in a[c])if("offset"!=d&&"easing"!=d&&"composite"!=d){var e={offset:a[c].offset,easing:a[c].easing,value:a[c][d]};b[d]=b[d]||[],b[d].push(e)}for(var f in b){var g=b[f];if(0!=g[0].offset||1!=g[g.length-1].offset)throw{type:DOMException.NOT_SUPPORTED_ERR,name:"NotSupportedError",message:"Partial keyframes are not supported"}}return b}function d(a){var c=[];for(var d in a)for(var e=a[d],f=0;f<e.length-1;f++){var g=e[f].offset,h=e[f+1].offset,i=e[f].value,j=e[f+1].value;g==h&&(1==h?i=j:j=i),c.push({startTime:g,endTime:h,easing:e[f].easing,property:d,interpolation:b.propertyInterpolation(d,i,j)})}return c.sort(function(a,b){return a.startTime-b.startTime}),c}b.convertEffectInput=function(e){var f=a.normalizeKeyframes(e),g=c(f),h=d(g);return function(a,c){if(null!=c)h.filter(function(a){return 0>=c&&0==a.startTime||c>=1&&1==a.endTime||c>=a.startTime&&c<=a.endTime}).forEach(function(d){var e=c-d.startTime,f=d.endTime-d.startTime,g=0==f?0:d.easing(e/f);b.apply(a,d.property,d.interpolation(g))});else for(var d in g)"offset"!=d&&"easing"!=d&&"composite"!=d&&b.clear(a,d)}}}(c,d,f),function(a){function b(a,b,c){e[c]=e[c]||[],e[c].push([a,b])}function c(a,c,d){for(var e=0;e<d.length;e++){var f=d[e];b(a,c,f),/-/.test(f)&&b(a,c,f.replace(/-(.)/g,function(a,b){return b.toUpperCase()}))}}function d(b,c,d){if("initial"==c||"initial"==d){var g=b.replace(/-(.)/g,function(a,b){return b.toUpperCase()});"initial"==c&&(c=f[g]),"initial"==d&&(d=f[g])}for(var h=c==d?[]:e[b],i=0;h&&i<h.length;i++){var j=h[i][0](c),k=h[i][0](d);if(void 0!==j&&void 0!==k){var l=h[i][1](j,k);if(l){var m=a.Interpolation.apply(null,l);return function(a){return 0==a?c:1==a?d:m(a)}}}}return a.Interpolation(!1,!0,function(a){return a?d:c})}var e={};a.addPropertiesHandler=c;var f={backgroundColor:"transparent",backgroundPosition:"0% 0%",borderBottomColor:"currentColor",borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px",borderBottomWidth:"3px",borderLeftColor:"currentColor",borderLeftWidth:"3px",borderRightColor:"currentColor",borderRightWidth:"3px",borderSpacing:"2px",borderTopColor:"currentColor",borderTopLeftRadius:"0px",borderTopRightRadius:"0px",borderTopWidth:"3px",bottom:"auto",clip:"rect(0px, 0px, 0px, 0px)",color:"black",fontSize:"100%",fontWeight:"400",height:"auto",left:"auto",letterSpacing:"normal",lineHeight:"120%",marginBottom:"0px",marginLeft:"0px",marginRight:"0px",marginTop:"0px",maxHeight:"none",maxWidth:"none",minHeight:"0px",minWidth:"0px",opacity:"1.0",outlineColor:"invert",outlineOffset:"0px",outlineWidth:"3px",paddingBottom:"0px",paddingLeft:"0px",paddingRight:"0px",paddingTop:"0px",right:"auto",textIndent:"0px",textShadow:"0px 0px 0px transparent",top:"auto",transform:"",verticalAlign:"0px",visibility:"visible",width:"auto",wordSpacing:"normal",zIndex:"auto"};a.propertyInterpolation=d}(d,f),function(a,b){function c(b){var c=a.calculateActiveDuration(b),d=function(d){return a.calculateTimeFraction(c,d,b)};return d._totalDuration=b.delay+c+b.endDelay,d._isCurrent=function(d){var e=a.calculatePhase(c,d,b);return e===PhaseActive||e===PhaseBefore},d}b.KeyframeEffect=function(d,e,f){var g,h=c(a.normalizeTimingInput(f)),i=b.convertEffectInput(e),j=function(){i(d,g)};return j._update=function(a){return g=h(a),null!==g},j._clear=function(){i(d,null)},j._hasSameTarget=function(a){return d===a},j._isCurrent=h._isCurrent,j._totalDuration=h._totalDuration,j},b.NullEffect=function(a){var b=function(){a&&(a(),a=null)};return b._update=function(){return null},b._totalDuration=0,b._isCurrent=function(){return!1},b._hasSameTarget=function(){return!1},b}}(c,d,f),function(a){function b(a,b,c){c.enumerable=!0,c.configurable=!0,Object.defineProperty(a,b,c)}function c(a){this._surrogateStyle=document.createElementNS("http://www.w3.org/1999/xhtml","div").style,this._style=a.style,this._length=0,this._isAnimatedProperty={};for(var b=0;b<this._style.length;b++){var c=this._style[b];this._surrogateStyle[c]=this._style[c]}this._updateIndices()}function d(a){if(!a._webAnimationsPatchedStyle){var d=new c(a);try{b(a,"style",{get:function(){return d}})}catch(e){a.style._set=function(b,c){a.style[b]=c},a.style._clear=function(b){a.style[b]=""}}a._webAnimationsPatchedStyle=a.style}}var e={cssText:1,length:1,parentRule:1},f={getPropertyCSSValue:1,getPropertyPriority:1,getPropertyValue:1,item:1,removeProperty:1,setProperty:1},g={removeProperty:1,setProperty:1};c.prototype={get cssText(){return this._surrogateStyle.cssText},set cssText(a){for(var b={},c=0;c<this._surrogateStyle.length;c++)b[this._surrogateStyle[c]]=!0;this._surrogateStyle.cssText=a,this._updateIndices();for(var c=0;c<this._surrogateStyle.length;c++)b[this._surrogateStyle[c]]=!0;for(var d in b)this._isAnimatedProperty[d]||this._style.setProperty(d,this._surrogateStyle.getPropertyValue(d))},get length(){return this._surrogateStyle.length},get parentRule(){return this._style.parentRule},_updateIndices:function(){for(;this._length<this._surrogateStyle.length;)Object.defineProperty(this,this._length,{configurable:!0,enumerable:!1,get:function(a){return function(){return this._surrogateStyle[a]}}(this._length)}),this._length++;for(;this._length>this._surrogateStyle.length;)this._length--,Object.defineProperty(this,this._length,{configurable:!0,enumerable:!1,value:void 0})},_set:function(a,b){this._style[a]=b,this._isAnimatedProperty[a]=!0},_clear:function(a){this._style[a]=this._surrogateStyle[a],delete this._isAnimatedProperty[a]}};for(var h in f)c.prototype[h]=function(a,b){return function(){var c=this._surrogateStyle[a].apply(this._surrogateStyle,arguments);return b&&(this._isAnimatedProperty[arguments[0]]||this._style[a].apply(this._style,arguments),this._updateIndices()),c}}(h,h in g);for(var i in document.documentElement.style)i in e||i in f||!function(a){b(c.prototype,a,{get:function(){return this._surrogateStyle[a]},set:function(b){this._surrogateStyle[a]=b,this._updateIndices(),this._isAnimatedProperty[a]||(this._style[a]=b)}})}(i);a.apply=function(b,c,e){d(b),b.style._set(a.propertyName(c),e)},a.clear=function(b,c){b._webAnimationsPatchedStyle&&b.style._clear(a.propertyName(c))}}(d,f),function(a){window.Element.prototype.animate=function(b,c){return a.timeline._play(a.KeyframeEffect(this,b,c))}}(d),function(a){function b(a,c,d){if("number"==typeof a&&"number"==typeof c)return a*(1-d)+c*d;if("boolean"==typeof a&&"boolean"==typeof c)return.5>d?a:c;if(a.length==c.length){for(var e=[],f=0;f<a.length;f++)e.push(b(a[f],c[f],d));return e}throw"Mismatched interpolation arguments "+a+":"+c}a.Interpolation=function(a,c,d){return function(e){return d(b(a,c,e))}}}(d,f),function(a){function b(a,b,c){return Math.max(Math.min(a,c),b)}function c(c,d,e){var f=a.dot(c,d);f=b(f,-1,1);var g=[];if(1===f)g=c;else for(var h=Math.acos(f),i=1*Math.sin(e*h)/Math.sqrt(1-f*f),j=0;4>j;j++)g.push(c[j]*(Math.cos(e*h)-f*i)+d[j]*i);return g}var d=function(){function a(a,b){for(var c=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],d=0;4>d;d++)for(var e=0;4>e;e++)for(var f=0;4>f;f++)c[d][e]+=b[d][f]*a[f][e];return c}function b(a){return 0==a[0][2]&&0==a[0][3]&&0==a[1][2]&&0==a[1][3]&&0==a[2][0]&&0==a[2][1]&&1==a[2][2]&&0==a[2][3]&&0==a[3][2]&&1==a[3][3]}function c(c,d,e,f,g){for(var h=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],i=0;4>i;i++)h[i][3]=g[i];for(var i=0;3>i;i++)for(var j=0;3>j;j++)h[3][i]+=c[j]*h[j][i];var k=f[0],l=f[1],m=f[2],n=f[3],o=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];o[0][0]=1-2*(l*l+m*m),o[0][1]=2*(k*l-m*n),o[0][2]=2*(k*m+l*n),o[1][0]=2*(k*l+m*n),o[1][1]=1-2*(k*k+m*m),o[1][2]=2*(l*m-k*n),o[2][0]=2*(k*m-l*n),o[2][1]=2*(l*m+k*n),o[2][2]=1-2*(k*k+l*l),h=a(h,o);var p=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];e[2]&&(p[2][1]=e[2],h=a(h,p)),e[1]&&(p[2][1]=0,p[2][0]=e[0],h=a(h,p)),e[0]&&(p[2][0]=0,p[1][0]=e[0],h=a(h,p));for(var i=0;3>i;i++)for(var j=0;3>j;j++)h[i][j]*=d[i];return b(h)?[h[0][0],h[0][1],h[1][0],h[1][1],h[3][0],h[3][1]]:h[0].concat(h[1],h[2],h[3])}return c}();a.composeMatrix=d,a.quat=c}(d,f),function(a,b){a.sequenceNumber=0;var c=function(a,b,c){this.target=a,this.currentTime=b,this.timelineTime=c,this.type="finish",this.bubbles=!1,this.cancelable=!1,this.currentTarget=a,this.defaultPrevented=!1,this.eventPhase=Event.AT_TARGET,this.timeStamp=Date.now()};b.Animation=function(b){this._sequenceNumber=a.sequenceNumber++,this._currentTime=0,this._startTime=null,this._paused=!1,this._playbackRate=1,this._inTimeline=!0,this._finishedFlag=!1,this.onfinish=null,this._finishHandlers=[],this._effect=b,this._inEffect=this._effect._update(0),this._idle=!0,this._currentTimePending=!1},b.Animation.prototype={_ensureAlive:function(){this._inEffect=this._effect._update(this.playbackRate<0&&0===this.currentTime?-1:this.currentTime),this._inTimeline||!this._inEffect&&this._finishedFlag||(this._inTimeline=!0,b.timeline._animations.push(this))},_tickCurrentTime:function(a,b){a!=this._currentTime&&(this._currentTime=a,this._isFinished&&!b&&(this._currentTime=this._playbackRate>0?this._totalDuration:0),this._ensureAlive())},get currentTime(){return this._idle||this._currentTimePending?null:this._currentTime},set currentTime(a){a=+a,isNaN(a)||(b.restart(),this._paused||null==this._startTime||(this._startTime=this._timeline.currentTime-a/this._playbackRate),this._currentTimePending=!1,this._currentTime!=a&&(this._tickCurrentTime(a,!0),b.invalidateEffects()))},get startTime(){return this._startTime},set startTime(a){a=+a,isNaN(a)||this._paused||this._idle||(this._startTime=a,this._tickCurrentTime((this._timeline.currentTime-this._startTime)*this.playbackRate),b.invalidateEffects())},get playbackRate(){return this._playbackRate},set playbackRate(a){if(a!=this._playbackRate){var b=this.currentTime;this._playbackRate=a,this._startTime=null,"paused"!=this.playState&&"idle"!=this.playState&&this.play(),null!=b&&(this.currentTime=b)}},get _isFinished(){return!this._idle&&(this._playbackRate>0&&this._currentTime>=this._totalDuration||this._playbackRate<0&&this._currentTime<=0)},get _totalDuration(){return this._effect._totalDuration},get playState(){return this._idle?"idle":null==this._startTime&&!this._paused&&0!=this.playbackRate||this._currentTimePending?"pending":this._paused?"paused":this._isFinished?"finished":"running"},play:function(){this._paused=!1,(this._isFinished||this._idle)&&(this._currentTime=this._playbackRate>0?0:this._totalDuration,this._startTime=null,b.invalidateEffects()),this._finishedFlag=!1,b.restart(),this._idle=!1,this._ensureAlive()},pause:function(){this._isFinished||this._paused||this._idle||(this._currentTimePending=!0),this._startTime=null,this._paused=!0},finish:function(){this._idle||(this.currentTime=this._playbackRate>0?this._totalDuration:0,this._startTime=this._totalDuration-this.currentTime,this._currentTimePending=!1)},cancel:function(){this._inEffect&&(this._inEffect=!1,this._idle=!0,this.currentTime=0,this._startTime=null,this._effect._update(null),b.invalidateEffects(),b.restart())},reverse:function(){this.playbackRate*=-1,this.play()},addEventListener:function(a,b){"function"==typeof b&&"finish"==a&&this._finishHandlers.push(b)},removeEventListener:function(a,b){if("finish"==a){var c=this._finishHandlers.indexOf(b);c>=0&&this._finishHandlers.splice(c,1)}},_fireEvents:function(a){var b=this._isFinished;if((b||this._idle)&&!this._finishedFlag){var d=new c(this,this._currentTime,a),e=this._finishHandlers.concat(this.onfinish?[this.onfinish]:[]);setTimeout(function(){e.forEach(function(a){a.call(d.target,d)})},0)}this._finishedFlag=b},_tick:function(a){return this._idle||this._paused||(null==this._startTime?this.startTime=a-this._currentTime/this.playbackRate:this._isFinished||this._tickCurrentTime((a-this._startTime)*this.playbackRate)),this._currentTimePending=!1,this._fireEvents(a),!this._idle&&(this._inEffect||!this._finishedFlag)}}}(c,d,f),function(a,b){function c(a){var b=i;i=[],a<s.currentTime&&(a=s.currentTime),g(a),b.forEach(function(b){b[1](a)}),o&&g(a),f(),l=void 0}function d(a,b){return a._sequenceNumber-b._sequenceNumber}function e(){this._animations=[],this.currentTime=window.performance&&performance.now?performance.now():0}function f(){p.forEach(function(a){a()}),p.length=0}function g(a){n=!1;var c=b.timeline;c.currentTime=a,c._animations.sort(d),m=!1;var e=c._animations;c._animations=[];var f=[],g=[];e=e.filter(function(b){return b._inTimeline=b._tick(a),b._inEffect?g.push(b._effect):f.push(b._effect),b._isFinished||b._paused||b._idle||(m=!0),b._inTimeline}),p.push.apply(p,f),p.push.apply(p,g),c._animations.push.apply(c._animations,e),o=!1,m&&requestAnimationFrame(function(){})}var h=window.requestAnimationFrame,i=[],j=0;window.requestAnimationFrame=function(a){var b=j++;return 0==i.length&&h(c),i.push([b,a]),b},window.cancelAnimationFrame=function(a){i.forEach(function(b){b[0]==a&&(b[1]=function(){})})},e.prototype={_play:function(c){c._timing=a.normalizeTimingInput(c.timing);var d=new b.Animation(c);return d._idle=!1,d._timeline=this,this._animations.push(d),b.restart(),b.invalidateEffects(),d}};var k,l=void 0,k=function(){return void 0==l&&(l=performance.now()),l},m=!1,n=!1;b.restart=function(){return m||(m=!0,requestAnimationFrame(function(){}),n=!0),n};var o=!1;b.invalidateEffects=function(){o=!0};var p=[],q=1e3/60,r=window.getComputedStyle;Object.defineProperty(window,"getComputedStyle",{configurable:!0,enumerable:!0,value:function(){if(o){var a=k();a-s.currentTime>0&&(s.currentTime+=q*(Math.floor((a-s.currentTime)/q)+1)),g(s.currentTime)}return f(),r.apply(this,arguments)}});var s=new e;b.timeline=s}(c,d,f),function(a){function b(a,b){for(var c=0,d=0;d<a.length;d++)c+=a[d]*b[d];return c}function c(a,b){return[a[0]*b[0]+a[4]*b[1]+a[8]*b[2]+a[12]*b[3],a[1]*b[0]+a[5]*b[1]+a[9]*b[2]+a[13]*b[3],a[2]*b[0]+a[6]*b[1]+a[10]*b[2]+a[14]*b[3],a[3]*b[0]+a[7]*b[1]+a[11]*b[2]+a[15]*b[3],a[0]*b[4]+a[4]*b[5]+a[8]*b[6]+a[12]*b[7],a[1]*b[4]+a[5]*b[5]+a[9]*b[6]+a[13]*b[7],a[2]*b[4]+a[6]*b[5]+a[10]*b[6]+a[14]*b[7],a[3]*b[4]+a[7]*b[5]+a[11]*b[6]+a[15]*b[7],a[0]*b[8]+a[4]*b[9]+a[8]*b[10]+a[12]*b[11],a[1]*b[8]+a[5]*b[9]+a[9]*b[10]+a[13]*b[11],a[2]*b[8]+a[6]*b[9]+a[10]*b[10]+a[14]*b[11],a[3]*b[8]+a[7]*b[9]+a[11]*b[10]+a[15]*b[11],a[0]*b[12]+a[4]*b[13]+a[8]*b[14]+a[12]*b[15],a[1]*b[12]+a[5]*b[13]+a[9]*b[14]+a[13]*b[15],a[2]*b[12]+a[6]*b[13]+a[10]*b[14]+a[14]*b[15],a[3]*b[12]+a[7]*b[13]+a[11]*b[14]+a[15]*b[15]]}function d(a){switch(a.t){case"rotatex":var b=a.d[0].rad||0,c=a.d[0].deg||0,d=c*Math.PI/180+b;return[1,0,0,0,0,Math.cos(d),Math.sin(d),0,0,-Math.sin(d),Math.cos(d),0,0,0,0,1];case"rotatey":var b=a.d[0].rad||0,c=a.d[0].deg||0,d=c*Math.PI/180+b;return[Math.cos(d),0,-Math.sin(d),0,0,1,0,0,Math.sin(d),0,Math.cos(d),0,0,0,0,1];case"rotate":case"rotatez":var b=a.d[0].rad||0,c=a.d[0].deg||0,d=c*Math.PI/180+b;return[Math.cos(d),Math.sin(d),0,0,-Math.sin(d),Math.cos(d),0,0,0,0,1,0,0,0,0,1];case"rotate3d":var e=a.d[0],f=a.d[1],g=a.d[2],b=a.d[3].rad||0,c=a.d[3].deg||0,d=c*Math.PI/180+b,h=e*e+f*f+g*g;if(0===h)e=1,f=0,g=0;else if(1!==h){var i=Math.sqrt(h);e/=i,f/=i,g/=i}var j=Math.sin(d/2),k=j*Math.cos(d/2),l=j*j;return[1-2*(f*f+g*g)*l,2*(e*f*l+g*k),2*(e*g*l-f*k),0,2*(e*f*l-g*k),1-2*(e*e+g*g)*l,2*(f*g*l+e*k),0,2*(e*g*l+f*k),2*(f*g*l-e*k),1-2*(e*e+f*f)*l,0,0,0,0,1];case"scale":return[a.d[0],0,0,0,0,a.d[1],0,0,0,0,1,0,0,0,0,1];case"scalex":return[a.d[0],0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];case"scaley":return[1,0,0,0,0,a.d[0],0,0,0,0,1,0,0,0,0,1];case"scalez":return[1,0,0,0,0,1,0,0,0,0,a.d[0],0,0,0,0,1];case"scale3d":return[a.d[0],0,0,0,0,a.d[1],0,0,0,0,a.d[2],0,0,0,0,1];case"skew":var m=a.d[0].deg||0,n=a.d[0].rad||0,o=a.d[1].deg||0,p=a.d[1].rad||0,q=m*Math.PI/180+n,r=o*Math.PI/180+p;return[1,Math.tan(r),0,0,Math.tan(q),1,0,0,0,0,1,0,0,0,0,1];case"skewx":var b=a.d[0].rad||0,c=a.d[0].deg||0,d=c*Math.PI/180+b;return[1,0,0,0,Math.tan(d),1,0,0,0,0,1,0,0,0,0,1];case"skewy":var b=a.d[0].rad||0,c=a.d[0].deg||0,d=c*Math.PI/180+b;return[1,Math.tan(d),0,0,0,1,0,0,0,0,1,0,0,0,0,1];case"translate":var e=a.d[0].px||0,f=a.d[1].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,e,f,0,1];case"translatex":var e=a.d[0].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,e,0,0,1];case"translatey":var f=a.d[0].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,0,f,0,1];case"translatez":var g=a.d[0].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,g,1];case"translate3d":var e=a.d[0].px||0,f=a.d[1].px||0,g=a.d[2].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,e,f,g,1];case"perspective":var s=a.d[0].px?-1/a.d[0].px:0;return[1,0,0,0,0,1,0,0,0,0,1,s,0,0,0,1];case"matrix":return[a.d[0],a.d[1],0,0,a.d[2],a.d[3],0,0,0,0,1,0,a.d[4],a.d[5],0,1];case"matrix3d":return a.d}}function e(a){return 0===a.length?[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]:a.map(d).reduce(c)}function f(a){return[g(e(a))]}var g=function(){function a(a){return a[0][0]*a[1][1]*a[2][2]+a[1][0]*a[2][1]*a[0][2]+a[2][0]*a[0][1]*a[1][2]-a[0][2]*a[1][1]*a[2][0]-a[1][2]*a[2][1]*a[0][0]-a[2][2]*a[0][1]*a[1][0]}function c(b){for(var c=1/a(b),d=b[0][0],e=b[0][1],f=b[0][2],g=b[1][0],h=b[1][1],i=b[1][2],j=b[2][0],k=b[2][1],l=b[2][2],m=[[(h*l-i*k)*c,(f*k-e*l)*c,(e*i-f*h)*c,0],[(i*j-g*l)*c,(d*l-f*j)*c,(f*g-d*i)*c,0],[(g*k-h*j)*c,(j*e-d*k)*c,(d*h-e*g)*c,0]],n=[],o=0;3>o;o++){for(var p=0,q=0;3>q;q++)p+=b[3][q]*m[q][o];n.push(p)}return n.push(1),m.push(n),m}function d(a){return[[a[0][0],a[1][0],a[2][0],a[3][0]],[a[0][1],a[1][1],a[2][1],a[3][1]],[a[0][2],a[1][2],a[2][2],a[3][2]],[a[0][3],a[1][3],a[2][3],a[3][3]]]}function e(a,b){for(var c=[],d=0;4>d;d++){for(var e=0,f=0;4>f;f++)e+=a[f]*b[f][d];c.push(e)}return c}function f(a){var b=g(a);return[a[0]/b,a[1]/b,a[2]/b]}function g(a){return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2])}function h(a,b,c,d){return[c*a[0]+d*b[0],c*a[1]+d*b[1],c*a[2]+d*b[2]]}function i(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]}function j(j){var k=[j.slice(0,4),j.slice(4,8),j.slice(8,12),j.slice(12,16)];if(1!==k[3][3])return null;for(var l=[],m=0;4>m;m++)l.push(k[m].slice());for(var m=0;3>m;m++)l[m][3]=0;if(0===a(l))return!1;var n,o=[];if(k[0][3]||k[1][3]||k[2][3]){o.push(k[0][3]),o.push(k[1][3]),o.push(k[2][3]),o.push(k[3][3]);var p=c(l),q=d(p);n=e(o,q)}else n=[0,0,0,1];var r=k[3].slice(0,3),s=[];s.push(k[0].slice(0,3));var t=[];t.push(g(s[0])),s[0]=f(s[0]);var u=[];s.push(k[1].slice(0,3)),u.push(b(s[0],s[1])),s[1]=h(s[1],s[0],1,-u[0]),t.push(g(s[1])),s[1]=f(s[1]),u[0]/=t[1],s.push(k[2].slice(0,3)),u.push(b(s[0],s[2])),s[2]=h(s[2],s[0],1,-u[1]),u.push(b(s[1],s[2])),s[2]=h(s[2],s[1],1,-u[2]),t.push(g(s[2])),s[2]=f(s[2]),u[1]/=t[2],u[2]/=t[2];var v=i(s[1],s[2]);if(b(s[0],v)<0)for(var m=0;3>m;m++)t[m]*=-1,s[m][0]*=-1,s[m][1]*=-1,s[m][2]*=-1;var w,x,y=s[0][0]+s[1][1]+s[2][2]+1;return y>1e-4?(w=.5/Math.sqrt(y),x=[(s[2][1]-s[1][2])*w,(s[0][2]-s[2][0])*w,(s[1][0]-s[0][1])*w,.25/w]):s[0][0]>s[1][1]&&s[0][0]>s[2][2]?(w=2*Math.sqrt(1+s[0][0]-s[1][1]-s[2][2]),x=[.25*w,(s[0][1]+s[1][0])/w,(s[0][2]+s[2][0])/w,(s[2][1]-s[1][2])/w]):s[1][1]>s[2][2]?(w=2*Math.sqrt(1+s[1][1]-s[0][0]-s[2][2]),x=[(s[0][1]+s[1][0])/w,.25*w,(s[1][2]+s[2][1])/w,(s[0][2]-s[2][0])/w]):(w=2*Math.sqrt(1+s[2][2]-s[0][0]-s[1][1]),x=[(s[0][2]+s[2][0])/w,(s[1][2]+s[2][1])/w,.25*w,(s[1][0]-s[0][1])/w]),[r,t,u,x,n]}return j}();a.dot=b,a.makeMatrixDecomposition=f}(d,f),function(a){function b(a,b){var c=a.exec(b);return c?(c=a.ignoreCase?c[0].toLowerCase():c[0],[c,b.substr(c.length)]):void 0}function c(a,b){b=b.replace(/^\s*/,"");var c=a(b);return c?[c[0],c[1].replace(/^\s*/,"")]:void 0}function d(a,d,e){a=c.bind(null,a);for(var f=[];;){var g=a(e);if(!g)return[f,e];if(f.push(g[0]),e=g[1],g=b(d,e),!g||""==g[1])return[f,e];e=g[1]}}function e(a,b){for(var c=0,d=0;d<b.length&&(!/\s|,/.test(b[d])||0!=c);d++)if("("==b[d])c++;else if(")"==b[d]&&(c--,0==c&&d++,0>=c))break;var e=a(b.substr(0,d));return void 0==e?void 0:[e,b.substr(d)]}function f(a,b){for(var c=a,d=b;c&&d;)c>d?c%=d:d%=c;return c=a*b/(c+d)}function g(a){return function(b){var c=a(b);return c&&(c[0]=void 0),c}}function h(a,b){return function(c){var d=a(c);return d?d:[b,c]}}function i(b,c){for(var d=[],e=0;e<b.length;e++){var f=a.consumeTrimmed(b[e],c);if(!f||""==f[0])return;void 0!==f[0]&&d.push(f[0]),c=f[1]}return""==c?d:void 0}function j(a,b,c,d,e){for(var g=[],h=[],i=[],j=f(d.length,e.length),k=0;j>k;k++){var l=b(d[k%d.length],e[k%e.length]);if(!l)return;g.push(l[0]),h.push(l[1]),i.push(l[2])}return[g,h,function(b){var d=b.map(function(a,b){return i[b](a)}).join(c);return a?a(d):d}]}function k(a,b,c){for(var d=[],e=[],f=[],g=0,h=0;h<c.length;h++)if("function"==typeof c[h]){var i=c[h](a[g],b[g++]);d.push(i[0]),e.push(i[1]),f.push(i[2])}else!function(a){d.push(!1),e.push(!1),f.push(function(){return c[a]})}(h);return[d,e,function(a){for(var b="",c=0;c<a.length;c++)b+=f[c](a[c]);return b}]}a.consumeToken=b,a.consumeTrimmed=c,a.consumeRepeated=d,a.consumeParenthesised=e,a.ignore=g,a.optional=h,a.consumeList=i,a.mergeNestedRepeated=j.bind(null,null),a.mergeWrappedNestedRepeated=j,a.mergeList=k}(d),function(a){function b(b){function c(b){var c=a.consumeToken(/^inset/i,b);if(c)return d.inset=!0,c;var c=a.consumeLengthOrPercent(b);if(c)return d.lengths.push(c[0]),c;var c=a.consumeColor(b);return c?(d.color=c[0],c):void 0}var d={inset:!1,lengths:[],color:null},e=a.consumeRepeated(c,/^/,b);return e&&e[0].length?[d,e[1]]:void 0}function c(c){var d=a.consumeRepeated(b,/^,/,c);return d&&""==d[1]?d[0]:void 0}function d(b,c){for(;b.lengths.length<Math.max(b.lengths.length,c.lengths.length);)b.lengths.push({px:0});for(;c.lengths.length<Math.max(b.lengths.length,c.lengths.length);)c.lengths.push({px:0});if(b.inset==c.inset&&!!b.color==!!c.color){for(var d,e=[],f=[[],0],g=[[],0],h=0;h<b.lengths.length;h++){var i=a.mergeDimensions(b.lengths[h],c.lengths[h],2==h);f[0].push(i[0]),g[0].push(i[1]),e.push(i[2])}if(b.color&&c.color){var j=a.mergeColors(b.color,c.color);f[1]=j[0],g[1]=j[1],d=j[2]}return[f,g,function(a){for(var c=b.inset?"inset ":" ",f=0;f<e.length;f++)c+=e[f](a[0][f])+" ";return d&&(c+=d(a[1])),c}]}}function e(b,c,d,e){function f(a){return{inset:a,color:[0,0,0,0],lengths:[{px:0},{px:0},{px:0},{px:0}]}}for(var g=[],h=[],i=0;i<d.length||i<e.length;i++){var j=d[i]||f(e[i].inset),k=e[i]||f(d[i].inset);g.push(j),h.push(k)}return a.mergeNestedRepeated(b,c,g,h)}var f=e.bind(null,d,", ");a.addPropertiesHandler(c,f,["box-shadow","text-shadow"])}(d),function(a){function b(a){return a.toFixed(3).replace(".000","")}function c(a,b,c){return Math.min(b,Math.max(a,c))}function d(a){return/^\s*[-+]?(\d*\.)?\d+\s*$/.test(a)?Number(a):void 0}function e(a,c){return[a,c,b]}function f(a,b){return 0!=a?h(0,1/0)(a,b):void 0}function g(a,b){return[a,b,function(a){return Math.round(c(1,1/0,a))}]}function h(a,d){return function(e,f){return[e,f,function(e){return b(c(a,d,e))}]}}function i(a,b){return[a,b,Math.round]}a.clamp=c,a.addPropertiesHandler(d,h(0,1/0),["border-image-width","line-height"]),a.addPropertiesHandler(d,h(0,1),["opacity","shape-image-threshold"]),a.addPropertiesHandler(d,f,["flex-grow","flex-shrink"]),a.addPropertiesHandler(d,g,["orphans","widows"]),a.addPropertiesHandler(d,i,["z-index"]),a.parseNumber=d,a.mergeNumbers=e,a.numberToString=b}(d,f),function(a){function b(a,b){return"visible"==a||"visible"==b?[0,1,function(c){return 0>=c?a:c>=1?b:"visible"}]:void 0}a.addPropertiesHandler(String,b,["visibility"])}(d),function(a){function b(a){a=a.trim(),e.fillStyle="#000",e.fillStyle=a;var b=e.fillStyle;if(e.fillStyle="#fff",e.fillStyle=a,b==e.fillStyle){e.fillRect(0,0,1,1);var c=e.getImageData(0,0,1,1).data;e.clearRect(0,0,1,1);var d=c[3]/255;return[c[0]*d,c[1]*d,c[2]*d,d]}}function c(b,c){return[b,c,function(b){function c(a){return Math.max(0,Math.min(255,a))}if(b[3])for(var d=0;3>d;d++)b[d]=Math.round(c(b[d]/b[3]));return b[3]=a.numberToString(a.clamp(0,1,b[3])),"rgba("+b.join(",")+")"}]}var d=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");d.width=d.height=1;var e=d.getContext("2d");a.addPropertiesHandler(b,c,["background-color","border-bottom-color","border-left-color","border-right-color","border-top-color","color","outline-color","text-decoration-color"]),a.consumeColor=a.consumeParenthesised.bind(null,b),a.mergeColors=c
}(d,f),function(a,b){function c(a,b){if(b=b.trim().toLowerCase(),"0"==b&&"px".search(a)>=0)return{px:0};if(/^[^(]*$|^calc/.test(b)){b=b.replace(/calc\(/g,"(");var c={};b=b.replace(a,function(a){return c[a]=null,"U"+a});for(var d="U("+a.source+")",e=b.replace(/[-+]?(\d*\.)?\d+/g,"N").replace(new RegExp("N"+d,"g"),"D").replace(/\s[+-]\s/g,"O").replace(/\s/g,""),f=[/N\*(D)/g,/(N|D)[*/]N/g,/(N|D)O\1/g,/\((N|D)\)/g],g=0;g<f.length;)f[g].test(e)?(e=e.replace(f[g],"$1"),g=0):g++;if("D"==e){for(var h in c){var i=eval(b.replace(new RegExp("U"+h,"g"),"").replace(new RegExp(d,"g"),"*0"));if(!isFinite(i))return;c[h]=i}return c}}}function d(a,b){return e(a,b,!0)}function e(b,c,d){var e,f=[];for(e in b)f.push(e);for(e in c)f.indexOf(e)<0&&f.push(e);return b=f.map(function(a){return b[a]||0}),c=f.map(function(a){return c[a]||0}),[b,c,function(b){var c=b.map(function(c,e){return 1==b.length&&d&&(c=Math.max(c,0)),a.numberToString(c)+f[e]}).join(" + ");return b.length>1?"calc("+c+")":c}]}var f="px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc",g=c.bind(null,new RegExp(f,"g")),h=c.bind(null,new RegExp(f+"|%","g")),i=c.bind(null,/deg|rad|grad|turn/g);a.parseLength=g,a.parseLengthOrPercent=h,a.consumeLengthOrPercent=a.consumeParenthesised.bind(null,h),a.parseAngle=i,a.mergeDimensions=e;var j=a.consumeParenthesised.bind(null,g),k=a.consumeRepeated.bind(void 0,j,/^/),l=a.consumeRepeated.bind(void 0,k,/^,/);a.consumeSizePairList=l;var m=function(a){var b=l(a);return b&&""==b[1]?b[0]:void 0},n=a.mergeNestedRepeated.bind(void 0,d," "),o=a.mergeNestedRepeated.bind(void 0,n,",");a.mergeNonNegativeSizePair=n,a.addPropertiesHandler(m,o,["background-size"]),a.addPropertiesHandler(h,d,["border-bottom-width","border-image-width","border-left-width","border-right-width","border-top-width","flex-basis","font-size","height","line-height","max-height","max-width","outline-width","width"]),a.addPropertiesHandler(h,e,["border-bottom-left-radius","border-bottom-right-radius","border-top-left-radius","border-top-right-radius","bottom","left","letter-spacing","margin-bottom","margin-left","margin-right","margin-top","min-height","min-width","outline-offset","padding-bottom","padding-left","padding-right","padding-top","perspective","right","shape-margin","text-indent","top","vertical-align","word-spacing"])}(d,f),function(a){function b(b){return a.consumeLengthOrPercent(b)||a.consumeToken(/^auto/,b)}function c(c){var d=a.consumeList([a.ignore(a.consumeToken.bind(null,/^rect/)),a.ignore(a.consumeToken.bind(null,/^\(/)),a.consumeRepeated.bind(null,b,/^,/),a.ignore(a.consumeToken.bind(null,/^\)/))],c);return d&&4==d[0].length?d[0]:void 0}function d(b,c){return"auto"==b||"auto"==c?[!0,!1,function(d){var e=d?b:c;if("auto"==e)return"auto";var f=a.mergeDimensions(e,e);return f[2](f[0])}]:a.mergeDimensions(b,c)}function e(a){return"rect("+a+")"}var f=a.mergeWrappedNestedRepeated.bind(null,e,d,", ");a.parseBox=c,a.mergeBoxes=f,a.addPropertiesHandler(c,f,["clip"])}(d,f),function(a){function b(a){return function(b){var c=0;return a.map(function(a){return a===j?b[c++]:a})}}function c(a){return a}function d(b){if(b=b.toLowerCase().trim(),"none"==b)return[];for(var c,d=/\s*(\w+)\(([^)]*)\)/g,e=[],f=0;c=d.exec(b);){if(c.index!=f)return;f=c.index+c[0].length;var g=c[1],h=m[g];if(!h)return;var i=c[2].split(","),j=h[0];if(j.length<i.length)return;for(var n=[],o=0;o<j.length;o++){var p,q=i[o],r=j[o];if(p=q?{A:function(b){return"0"==b.trim()?l:a.parseAngle(b)},N:a.parseNumber,T:a.parseLengthOrPercent,L:a.parseLength}[r.toUpperCase()](q):{a:l,n:n[0],t:k}[r],void 0===p)return;n.push(p)}if(e.push({t:g,d:n}),d.lastIndex==b.length)return e}}function e(a){return a.toFixed(6).replace(".000000","")}function f(b,c){if(b.decompositionPair!==c){b.decompositionPair=c;var d=a.makeMatrixDecomposition(b)}if(c.decompositionPair!==b){c.decompositionPair=b;var f=a.makeMatrixDecomposition(c)}return null==d[0]||null==f[0]?[[!1],[!0],function(a){return a?c[0].d:b[0].d}]:(d[0].push(0),f[0].push(1),[d,f,function(b){var c=a.quat(d[0][3],f[0][3],b[5]),g=a.composeMatrix(b[0],b[1],b[2],c,b[4]),h=g.map(e).join(",");return h}])}function g(a){return a.replace(/[xy]/,"")}function h(a){return a.replace(/(x|y|z|3d)?$/,"3d")}function i(b,c){var d=a.makeMatrixDecomposition&&!0,e=!1;if(!b.length||!c.length){b.length||(e=!0,b=c,c=[]);for(var i=0;i<b.length;i++){var j=b[i].t,k=b[i].d,l="scale"==j.substr(0,5)?1:0;c.push({t:j,d:k.map(function(a){if("number"==typeof a)return l;var b={};for(var c in a)b[c]=l;return b})})}}var n=function(a,b){return"perspective"==a&&"perspective"==b||("matrix"==a||"matrix3d"==a)&&("matrix"==b||"matrix3d"==b)},o=[],p=[],q=[];if(b.length!=c.length){if(!d)return;var r=f(b,c);o=[r[0]],p=[r[1]],q=[["matrix",[r[2]]]]}else for(var i=0;i<b.length;i++){var j,s=b[i].t,t=c[i].t,u=b[i].d,v=c[i].d,w=m[s],x=m[t];if(n(s,t)){if(!d)return;var r=f([b[i]],[c[i]]);o.push(r[0]),p.push(r[1]),q.push(["matrix",[r[2]]])}else{if(s==t)j=s;else if(w[2]&&x[2]&&g(s)==g(t))j=g(s),u=w[2](u),v=x[2](v);else{if(!w[1]||!x[1]||h(s)!=h(t)){if(!d)return;var r=f(b,c);o=[r[0]],p=[r[1]],q=[["matrix",[r[2]]]];break}j=h(s),u=w[1](u),v=x[1](v)}for(var y=[],z=[],A=[],B=0;B<u.length;B++){var C="number"==typeof u[B]?a.mergeNumbers:a.mergeDimensions,r=C(u[B],v[B]);y[B]=r[0],z[B]=r[1],A.push(r[2])}o.push(y),p.push(z),q.push([j,A])}}if(e){var D=o;o=p,p=D}return[o,p,function(a){return a.map(function(a,b){var c=a.map(function(a,c){return q[b][1][c](a)}).join(",");return"matrix"==q[b][0]&&16==c.split(",").length&&(q[b][0]="matrix3d"),q[b][0]+"("+c+")"}).join(" ")}]}var j=null,k={px:0},l={deg:0},m={matrix:["NNNNNN",[j,j,0,0,j,j,0,0,0,0,1,0,j,j,0,1],c],matrix3d:["NNNNNNNNNNNNNNNN",c],rotate:["A"],rotatex:["A"],rotatey:["A"],rotatez:["A"],rotate3d:["NNNA"],perspective:["L"],scale:["Nn",b([j,j,1]),c],scalex:["N",b([j,1,1]),b([j,1])],scaley:["N",b([1,j,1]),b([1,j])],scalez:["N",b([1,1,j])],scale3d:["NNN",c],skew:["Aa",null,c],skewx:["A",null,b([j,l])],skewy:["A",null,b([l,j])],translate:["Tt",b([j,j,k]),c],translatex:["T",b([j,k,k]),b([j,k])],translatey:["T",b([k,j,k]),b([k,j])],translatez:["L",b([k,k,j])],translate3d:["TTL",c]};a.addPropertiesHandler(d,i,["transform"])}(d,f),function(a){function b(a){var b=Number(a);return isNaN(b)||100>b||b>900||b%100!==0?void 0:b}function c(b){return b=100*Math.round(b/100),b=a.clamp(100,900,b),400===b?"normal":700===b?"bold":String(b)}function d(a,b){return[a,b,c]}a.addPropertiesHandler(b,d,["font-weight"])}(d),function(a){function b(a){var b={};for(var c in a)b[c]=-a[c];return b}function c(b){return a.consumeToken(/^(left|center|right|top|bottom)\b/i,b)||a.consumeLengthOrPercent(b)}function d(b,d){var e=a.consumeRepeated(c,/^/,d);if(e&&""==e[1]){var f=e[0];if(f[0]=f[0]||"center",f[1]=f[1]||"center",3==b&&(f[2]=f[2]||{px:0}),f.length==b){if(/top|bottom/.test(f[0])||/left|right/.test(f[1])){var h=f[0];f[0]=f[1],f[1]=h}if(/left|right|center|Object/.test(f[0])&&/top|bottom|center|Object/.test(f[1]))return f.map(function(a){return"object"==typeof a?a:g[a]})}}}function e(d){var e=a.consumeRepeated(c,/^/,d);if(e){for(var f=e[0],h=[{"%":50},{"%":50}],i=0,j=!1,k=0;k<f.length;k++){var l=f[k];"string"==typeof l?(j=/bottom|right/.test(l),i={left:0,right:0,center:i,top:1,bottom:1}[l],h[i]=g[l],"center"==l&&i++):(j&&(l=b(l),l["%"]=(l["%"]||0)+100),h[i]=l,i++,j=!1)}return[h,e[1]]}}function f(b){var c=a.consumeRepeated(e,/^,/,b);return c&&""==c[1]?c[0]:void 0}var g={left:{"%":0},center:{"%":50},right:{"%":100},top:{"%":0},bottom:{"%":100}},h=a.mergeNestedRepeated.bind(null,a.mergeDimensions," ");a.addPropertiesHandler(d.bind(null,3),h,["transform-origin"]),a.addPropertiesHandler(d.bind(null,2),h,["perspective-origin"]),a.consumePosition=e,a.mergeOffsetList=h;var i=a.mergeNestedRepeated.bind(null,h,", ");a.addPropertiesHandler(f,i,["background-position","object-position"])}(d),function(a){function b(b){var c=a.consumeToken(/^circle/,b);if(c&&c[0])return["circle"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0,/^\(/)),d,a.ignore(a.consumeToken.bind(void 0,/^at/)),a.consumePosition,a.ignore(a.consumeToken.bind(void 0,/^\)/))],c[1]));var f=a.consumeToken(/^ellipse/,b);if(f&&f[0])return["ellipse"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0,/^\(/)),e,a.ignore(a.consumeToken.bind(void 0,/^at/)),a.consumePosition,a.ignore(a.consumeToken.bind(void 0,/^\)/))],f[1]));var g=a.consumeToken(/^polygon/,b);return g&&g[0]?["polygon"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0,/^\(/)),a.optional(a.consumeToken.bind(void 0,/^nonzero\s*,|^evenodd\s*,/),"nonzero,"),a.consumeSizePairList,a.ignore(a.consumeToken.bind(void 0,/^\)/))],g[1])):void 0}function c(b,c){return b[0]===c[0]?"circle"==b[0]?a.mergeList(b.slice(1),c.slice(1),["circle(",a.mergeDimensions," at ",a.mergeOffsetList,")"]):"ellipse"==b[0]?a.mergeList(b.slice(1),c.slice(1),["ellipse(",a.mergeNonNegativeSizePair," at ",a.mergeOffsetList,")"]):"polygon"==b[0]&&b[1]==c[1]?a.mergeList(b.slice(2),c.slice(2),["polygon(",b[1],g,")"]):void 0:void 0}var d=a.consumeParenthesised.bind(null,a.parseLengthOrPercent),e=a.consumeRepeated.bind(void 0,d,/^/),f=a.mergeNestedRepeated.bind(void 0,a.mergeDimensions," "),g=a.mergeNestedRepeated.bind(void 0,f,",");a.addPropertiesHandler(b,c,["shape-outside"])}(d),function(a){function b(a,b){b.concat([a]).forEach(function(b){b in document.documentElement.style&&(c[a]=b)})}var c={};b("transform",["webkitTransform","msTransform"]),b("transformOrigin",["webkitTransformOrigin"]),b("perspective",["webkitPerspective"]),b("perspectiveOrigin",["webkitPerspectiveOrigin"]),a.propertyName=function(a){return c[a]||a}}(d,f)}()}({},function(){return this}());

},{}],2:[function(require,module,exports){
/*===================================================================================
 * Implementation of animations features.
 * This implementation providing usefull way of animations support for javascript. 
 * One of interresting things is animate.css features support.
 *===================================================================================
*/

/**
 * Allow to change images for animations **it’s specialy usefull to simulate a loading**.
 * @class
 * @constructs iJS.mi_loader
 * @param {Object} imgContainer  is an *id* name of a `HTMLImageElement` or represent a `HTMLImageElement`
 * @param {string} imgDir        is a path where are the images to animate
 * @param {number} imgLength     is the number of images to animate
 * @param {string} imgGlobalName is the global name of images to animate. 
 *                               egg: if *imgload* is your given global name, corresponding images names have to be *imgload0*, *imgload1*, *imgload2*, ...
 * @param {string} imgFormat     the format of images. By default it’s *png*.
 */
iJS.mi_loader = function (imgContainer, imgDir, imgLength, imgGlobalName, imgFormat) {

    if (iJS.isString(imgDir))
        this.imgDir = imgDir;
    if (iJS.isNumber(imgLength))
        this.imgLength = imgLength;
    if (iJS.isString(imgGlobalName))
        this.imgGlobalName = imgGlobalName;

    this.imgFormat = (iJS.isString(imgFormat)) ? imgFormat : "png";

    if (iJS.isString(imgContainer))
        if (iJS.isHTMLImageElement(document.getElementById(imgContainer)))
            this.imgContainer = document.getElementById(imgContainer);
        else if (iJS.isHTMLImageElement(imgContainer))
            this.imgContainer = imgContainer;

    this.imgIndex = 0; //represent the image number to show
    this.imgPath = ""; //represent image path to show
    this.loaderID = 0; //for content the identification number of programing events via functions like `setTimeout()`

    /**
     * Allow to change or replace the current showing image by the next one.
     * @function changeIMGLoader
     * @memberof iJS.mi_loader
     * @param {iJS.mi_loader} loader Normaly, it’s the `mi_loader` instance itself, reference by `this`.
     *                               But it can be any other instance of `mi_loader` class.
     *                               It’s just necessary when the function is use like argument to another.
     *@example var miLoader = new iJS.mi_loader(imgContainer, imgDir, imgLength, imgGlobalName, imgFormat);
     *         miLoader.changeIMGLoader(); //the parameter isn’t needed
     *         setTimeout( miLoader.changeIMGLoader, delay, miLoader ); //have to give an instance of `mi_loader` in parameter. Here it’s the object itself.
     *         //the parameter is needed in this case to avoid the using of `window` root object when use the reference `this` in `changeIMGLoader` function.
     */
    this.changeIMGLoader = function (loader) {

        //ld = loader or this **object itself** 
        var ld = (loader instanceof iJS.mi_loader) ? loader : this;

        if (ld.imgDir && ld.imgLength && ld.imgGlobalName)
            if (ld.imgIndex < ld.imgLength) {
                ld.imgPath = ld.imgDir + "/" + ld.imgGlobalName + ld.imgIndex + "." + ld.imgFormat;
                ld.imgIndex++;
            } else {
                ld.imgIndex = 0;
            }


        if (ld.imgContainer)
            ld.imgContainer.src = ld.imgPath;
    }

    /**
     * Allow to start animation by replacing images sucessively according to a given time interval.
     * @function startLoading
     * @memberof iJS.mi_loader
     * @param {number} timeInterval interval of time to change images. By default it’s `150ms`.
     */
    this.startLoading = function (timeInterval) {

        if (this.loaderID) //first stop current animation
            this.stopLoading();

        if (iJS.isNumber(timeInterval))
            this.loaderID = setInterval(this.changeIMGLoader, timeInterval, this)
            else {
                this.loaderID = setInterval(this.changeIMGLoader, 150, this);
            }

    }

    /**
     * Allow to stop animation or images changing.
     * The animation will stop immediatly or after a given time.
     * @function stopLoading
     * @memberof iJS.mi_loader
     * @param {number} time time to stop animation.
     */
    this.stopLoading = function (time) {

        if (iJS.isNumber(time)) {
            setTimeout(function (loader) {
                if (loader instanceof iJS.mi_loader) {
                    clearInterval(loader.loaderID);
                    loader.imgIndex = 0;
                    loader.loaderID = 0;
                    loader.changeIMGLoader();
                }
            }, time, this);
        } else {
            clearInterval(this.loaderID);
            this.imgIndex = 0;
            this.loaderID = 0;
            this.changeIMGLoader();
        }
    }
}


/**
 * Animate an element by using predifined animations styles.
 * Provide support of popuplar <a href="https://github.com/daneden/animate.css">animate.css</a> features.
 * Some animations styles have two way to be selected by its name; for example, `bounceInUp` like in *animate.css* 
 * can also be indicated with `bounce-in-up`, ...
 * @function animate
 * @example //Select the elements to animate and enjoy!
 *     var elt = document.querySelector("#notification") ;
 *     iJS.animate(elt, "shake") ;
 *     //it return an AnimationPlayer object: see **web-animations.js** API for more details.
 *     //animation iteration and duration can also be indicated.
 *     var vivifyElt = iJS.animate(elt, "bounce", 3, 500) ;
 *     vivifyElt.onfinish = function(e) {
 *         //doSomething ...;
 *     }
 *     // less than 1500ms later...changed mind!
 *     vivifyElt.cancel();
 * @param   {Element}         elt        Element to animate.
 * @param   {String}          anime      Animations styles.
 * @param   {Number}          iterations Number of animation's iteration. 1 by default, -1 or "Infinity" for infinite animation.
 * @param   {Number}          time       Duration of the animation. 900ms by default.
 * @returns {AnimationPlayer} An object that can help to control considered animation. 
 *                            See <a href="https://github.com/web-animations">web-animations.js</a> API for more details.
 */
iJS.animate = function (elt, anime, iterations, time) {
    
    if (!iJS.isElement( elt )) {
        if (iJS.isString( elt )) {
            
            elt = document.getElementById( elt ) ;
            if (!elt) return null ;
        
        } else {
            return null ;
        }
    }
    
    if (!iJS.isNumber( time )) time = 900 ;
    if (!iJS.isNumber( iterations ) && iterations !== "Infinity") iterations = 1 ; 
    else if ( iterations == -1) iterations = "Infinity" ;
    if (!iJS.isString( anime )) anime = "_default" ;
    
    var keyframes = [] ,
        timing = {} ;
    
    switch (anime) {
            
        case "bounce":
            keyframes = [
                {transform: 'translate3d(0,0,0)', visibility: 'visible', offset: 0}, 
                {transform: 'translate3d(0,0,0)', offset: 0.2},
                {transform: 'translate3d(0,-30px,0)', offset: 0.4},
                {transform: 'translate3d(0,-30px,0)', offset: 0.43},
                {transform: 'translate3d(0,0,0)', offset: 0.53},
                {transform: 'translate3d(0,-15px,0)', offset: 0.7},
                {transform: 'translate3d(0,0,0)', offset: 0.8},
                {transform: 'translate3d(0,-15px,0)', offset: 0.9},
                {transform: 'translate3d(0,0,0)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'};
            
            break;
        
        case "bounceIn":
        case "bounce-in":
            elt.style.visibility = 'visible';
             keyframes = [
                 {transform: 'scale3d(.3, .3, .3)', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'scale3d(1.1, 1.1, 1.1)', offset: 0.2},
                {transform: 'scale3d(.9, .9, .9)', offset: 0.4},
                 {transform: 'scale3d(1.03, 1.03, 1.03)', opacity: '1', visibility: 'visible', offset: 0.6},
                {transform: 'scale3d(.97, .97, .97)', offset: 0.8},
                 {transform: 'scale3d(1, 1, 1)', opacity: '1', visibility: 'visible', offset: 1}
             ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'};
            
            break;
        
        case "bounceOut":
        case "bounce-out":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 0},
                {transform: 'scale3d(.9, .9, .9)', opacity: '1', visibility: 'visible', offset: 0.2},
                {transform: 'scale3d(1.1, 1.1, 1.1)', opacity: '1', visibility: 'visible', offset: 0.5},
                {transform: 'scale3d(1.1, 1.1, 1.1)', opacity: '1', visibility: 'visible', offset: 0.55},
                {transform: 'scale3d(.3, .3, .3)', opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;
        
        case "bounceInDown":
        case "bounce-in-down":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(0, -3000px, 0)', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'translate3d(0, 25px, 0)', opacity: '1', visibility: 'visible', offset: 0.6},
                {transform: 'translate3d(0, -100px, 0)', offset: 0.75},
                {transform: 'translate3d(0, 5px, 0)', offset: 0.9},
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'};
            
            break;
            
        case "bounceOutDown":
        case "bounce-out-down":
            elt.style.visibility = 'hidden';
            var transitingTimingFunction = elt.style['transition-timing-function'];
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 0},
                {transform: 'translate3d(0, 50px, 0)', opacity: '1', visibility: 'visible', offset: 0.2},
                {transform: 'translate3d(0, -20px, 0)', opacity: '1', visibility: 'visible', offset: 0.4},
                {transform: 'translate3d(0, -20px, 0)', opacity: '1', visibility: 'visible', offset: 0.45},
                {transform: 'translate3d(0, 2000px, 0)', opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
           
            break;   
            
        case "bounceInUp":
        case "bounce-in-up":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(0, 3000px, 0)', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'translate3d(0, -25px, 0)', opacity: '1', visibility: 'visible', offset: 0.6},
                {transform: 'translate3d(0, 100px, 0)', offset: 0.75},
                {transform: 'translate3d(0, -5px, 0)', offset: 0.9},
                {transform: 'translate3d(0, 0, 0)', opacity: '1', visibility: 'visible', offset: 1}];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'};
            
            break;  
            
        case "bounceOutUp":
        case "bounce-out-up":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 0},
                {transform: 'translate3d(0, 50px, 0)', opacity: '1', visibility: 'visible', offset: 0.2},
                {transform: 'translate3d(0, 20px, 0)', opacity: '1', visibility: 'visible', offset: 0.4},
                {transform: 'translate3d(0, 20px, 0)', opacity: '1', visibility: 'visible', offset: 0.45},
                {transform: 'translate3d(0, -2000px, 0)', opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;  
            
        case "bounceInLeft":
        case "bounce-in-left":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(-3000px, 0, 0)', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'translate3d(25px, 0, 0)', opacity: '1', visibility: 'visible', offset: 0.6},
                {transform: 'translate3d(-100px, 0, 0)', offset: 0.75},
                {transform: 'translate3d(5px, 0, 0)', offset: 0.9},
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'};
           
            break;     
            
        case "bounceOutLeft":
        case "bounce-out-left":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 0},
                {transform: 'translate3d(100px, 0, 0)', opacity: '1', visibility: 'visible', offset: 0.2},
                {transform: 'translate3d(-20px, 0, 0)', opacity: '1', visibility: 'visible', offset: 0.4},
                {transform: 'translate3d(-20px, 0, 0)', opacity: '1', visibility: 'visible', offset: 0.45},
                {transform: 'translate3d(-2000px, 0, 0)', opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;    
            
        case "bounceInRight":
        case "bounce-in-right":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(3000px, 0, 0)', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'translate3d(-25px, 0, 0)', opacity: '1', visibility: 'visible', offset: 0.6},
                { transform: 'translate3d(100px, 0, 0)', offset: 0.75},
                {transform: 'translate3d(-5px, 0, 0)', offset: 0.9},
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'};
            
            break;   
            
        case "bounceOutRight":
        case "bounce-out-right":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 0},
                {transform: 'translate3d(100px, 0, 0)', opacity: '1', visibility: 'visible', offset: 0.2},
                {transform: 'translate3d(-20px, 0, 0)', opacity: '1', visibility: 'visible', offset: 0.4},
                {transform: 'translate3d(-20px, 0, 0)', opacity: '1', visibility: 'visible', offset: 0.45},
                {transform: 'translate3d(2000px, 0, 0)', opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
           
            break;    
            
        case "fadeIn":
        case "fade-in":
            elt.style.visibility = 'visible';
            keyframes = [
                {opacity: '0', visibility: 'hidden', offset: 0}, 
                {opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeOut":
        case "fade-out":
            elt.style.visibility = 'hidden';
            keyframes = [
                {opacity: '1', visibility: 'visible', offset: 0}, 
                {opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeInDown":
        case "fade-in-down":
            elt.style.visibility = 'visible';
            keyframes = [
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(0, -100%, 0)', offset: 0}, 
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeOutDown":
        case "fade-out-down":
            elt.style.visibility = 'hidden';
            keyframes = [
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 0},
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(0, 100%, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;    

        case "fadeOutUp":
        case "fade-out-up":
            elt.style.visibility = 'hidden';
            keyframes = [
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 0},
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(0, -100%, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeOutUpBig":
        case "fade-out-up-big":
            elt.style.visibility = 'hidden';
            keyframes = [
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 0},
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(0, -2000px, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeInUp":
        case "fade-in-up":
            elt.style.visibility = 'visible';
            keyframes = [
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(0, 100%, 0)', offset: 0}, 
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeInDownBig":
        case "fade-in-down-big":
            elt.style.visibility = 'visible';
            keyframes = [
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(0, -2000px, 0)', offset: 0}, 
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeOutDownBig":
        case "fade-out-down-big":
            elt.style.visibility = 'hidden';
            keyframes = [
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 0},
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(0, 2000px, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeInUpBig":
        case "fade-in-up-big":
            elt.style.visibility = 'visible';
            keyframes = [
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(0, 2000px, 0)', offset: 0}, 
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeInRightBig":
        case "fade-in-right-big":
            elt.style.visibility = 'visible';
            keyframes = [
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(2000px, 0, 0)', offset: 0}, 
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeOutLeftBig":
        case "fade-out-left-big":
            elt.style.visibility = 'hidden';
            keyframes = [
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 0}, 
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(-2000px, 0, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeInLeft":
        case "fade-in-left":
            elt.style.visibility = 'visible';
            keyframes = [
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(-100%, 0, 0)', offset: 0}, 
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeInLeftBig":
        case "fade-in-left-big":
            elt.style.visibility = 'visible';
            keyframes = [
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(-2000px, 0, 0)', offset: 0}, 
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeInRight":
        case "fade-in-right":
            elt.style.visibility = 'visible';
            keyframes = [
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(100%, 0, 0)', offset: 0}, 
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeOutLeft":
        case "fade-out-left":
            elt.style.visibility = 'hidden';
            keyframes = [
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 0}, 
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(-100%, 0, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeOutRight":
        case "fade-out-right":
            elt.style.visibility = 'hidden';
            keyframes = [
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 0},
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(100%, 0, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fadeOutRightBig":
        case "fade-out-right-big":
            elt.style.visibility = 'hidden';
            keyframes = [
                {opacity: '1', visibility: 'visible', transform: 'none', offset: 0},
                {opacity: '0', visibility: 'hidden', transform: 'translate3d(2000px, 0, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  
            
        case "flash":
            keyframes = [
                {opacity: '1', visibility: 'visible', offset: 0}, 
                {opacity: '0', offset: 0.25}, 
                {opacity: '1', offset: 0.5}, 
                {opacity: '0', offset: 0.75}, 
                {opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  
            
        case "flip":
            keyframes = [
                {transform: 'perspective(400px) rotate3d(0, 1, 0, -360deg)', visibility: 'visible', offset: 0},
                {transform: 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)', offset: 0.4},
                {transform: 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)', offset: 0.5},
                {transform: 'perspective(400px) scale3d(.95, .95, .95)', offset: 0.8},
                {transform: 'perspective(400px)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'ease-in'};
           
            break;
            
        case "flipInX":
        case "flip-in-x":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)', opacity: '0', visibility: 'hidden', offset: 0},
                {transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)', offset: 0.4},
                {transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)', opacity: '1', visibility: 'visible', offset: 0.6},
                {transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)', opacity: '1', visibility: 'visible', offset: 0.8},
                {transform: 'perspective(400px)', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'ease-in'};
           
            break;  
                  
        case "flipOutX":
        case "flip-out-x":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'perspective(400px)', opacity: '1', visibility: 'visible', offset: 0},
                {transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)', opacity: '1', visibility: 'visible', offset: 0.3},
                {transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)', opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
           
            break;  
                  
        case "flipInY":
        case "flip-in-y":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)', opacity: '0', visibility: 'hidden', offset: 0},
                {transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)', offset: 0.4},
                {transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)', opacity: '1', visibility: 'visible', offset: 0.6},
                {transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)', opacity: '1', visibility: 'visible', offset: 0.8},
                {transform: 'perspective(400px)', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'ease-in'};
           
            break;  
                  
        case "flipOutY":
        case "flip-out-y":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'perspective(400px)', opacity: '1', visibility: 'visible', offset: 0},
                {transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)', opacity: '1', visibility: 'visible', offset: 0.3},
                {transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)', opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break; 
        
        case "hinge":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, 0deg)', transformOrigin: 'top left', visibility: 'visible', offset: 0}, 
                {transform: 'rotate3d(0, 0, 1, 80deg)', transformOrigin: 'top left', offset: 0.2}, 
                {transform: 'rotate3d(0, 0, 1, 60deg)', transformOrigin: 'top left', offset: 0.4}, 
                {transform: 'rotate3d(0, 0, 1, 80deg)', transformOrigin: 'top left', offset: 0.6},
                {transform: 'rotate3d(0, 0, 1, 60deg)', transformOrigin: 'top left', offset: 0.8},
                {transform: 'rotate3d(0, 0, 1, 10deg)', transformOrigin: 'top left', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'ease-in-out'};

            break; 

        case "hingeIn":
        case "hinge-in":
            elt.style.visibility = 'visible';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'translate3d(0, 700px, 0)', transformOrigin: 'top left', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'translate3d(0, 500px, 0)', transformOrigin: 'top left', opacity: '0.4', visibility: 'visible', offset: 0.1}, 
                {transform: 'rotate3d(0, 0, 1, 80deg)', transformOrigin: 'top left', opacity: '0.6', offset: 0.2}, 
                {transform: 'rotate3d(0, 0, 1, 60deg)', transformOrigin: 'top left', opacity: '0.8', offset: 0.4}, 
                {transform: 'rotate3d(0, 0, 1, 80deg)', transformOrigin: 'top left', opacity: '1', offset: 0.6},
                {transform: 'rotate3d(0, 0, 1, 60deg)', transformOrigin: 'top left', offset: 0.8},
                {transform: 'rotate3d(0, 0, 1, 10deg)', transformOrigin: 'top left', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'ease-in-out'};

            break; 

        case "hingeOut":
        case "hinge-out":
            elt.style.visibility = 'hidden';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, 0deg)', transformOrigin: 'top left', opacity: '1', visibility: 'visible', offset: 0}, 
                {transform: 'rotate3d(0, 0, 1, 80deg)', transformOrigin: 'top left', offset: 0.2}, 
                {transform: 'rotate3d(0, 0, 1, 60deg)', transformOrigin: 'top left', offset: 0.4}, 
                {transform: 'rotate3d(0, 0, 1, 80deg)', transformOrigin: 'top left', opacity: '0.8', offset: 0.6},
                {transform: 'rotate3d(0, 0, 1, 60deg)', transformOrigin: 'top left', opacity: '0.6', offset: 0.8},
                {transform: 'translate3d(0, 700px, 0)', transformOrigin: 'top left', opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'ease-in-out'};

            break; 
            
        case "jello":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'skewX(0deg) skewY(0deg)', visibility: 'visible', offset: 0}, 
                {transform: 'skewX(-12.5deg) skewY(-12.5deg)', offset: 0.2}, 
                {transform: 'skewX(6.2deg) skewY(6.2deg)', offset: 0.3},
                {transform: 'skewX(-3.1deg) skewY(-3.1deg)', offset: 0.4}, 
                {transform: 'skewX(1.5deg) skewY(1.5deg)', offset: 0.5}, 
                {transform: 'skewX(-0.78deg) skewY(-0.78deg)', offset: 0.6}, 
                {transform: 'skewX(0.39deg) skewY(0.39deg)', offset: 0.7}, 
                {transform: 'skewX(-0.19deg) skewY(-0.19deg)', offset: 0.8}, 
                {transform: 'skewX(0deg) skewY(0deg)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break; 
                        
        case "jelloIn":
        case "jello-in":
            elt.style.visibility = 'visible';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'skewX(0deg) skewY(0deg)', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'skewX(-12.5deg) skewY(-12.5deg)', opacity: '0.2', visibility: 'visible', offset: 0.2}, 
                {transform: 'skewX(6.2deg) skewY(6.2deg)', opacity: '0.4', offset: 0.3},
                {transform: 'skewX(-3.1deg) skewY(-3.1deg)', opacity: '0.6', offset: 0.4}, 
                {transform: 'skewX(1.5deg) skewY(1.5deg)', opacity: '0.8', offset: 0.5}, 
                {transform: 'skewX(-0.78deg) skewY(-0.78deg)', opacity: '1', offset: 0.6}, 
                {transform: 'skewX(0.39deg) skewY(0.39deg)', offset: 0.7}, 
                {transform: 'skewX(-0.19deg) skewY(-0.19deg)', offset: 0.8}, 
                {transform: 'skewX(0deg) skewY(0deg)', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break; 
            
        case "jelloOut":
        case "jello-out":
            elt.style.visibility = 'hidden';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'skewX(0deg) skewY(0deg)', opacity: '1', visibility: 'visible', offset: 0}, 
                {transform: 'skewX(12.5deg) skewY(12.5deg)', opacity: '0.8', offset: 0.2}, 
                {transform: 'skewX(-6.2deg) skewY(-6.2deg)', opacity: '0.7', offset: 0.3},
                {transform: 'skewX(3.1deg) skewY(3.1deg)', opacity: '0.6', offset: 0.4}, 
                {transform: 'skewX(-1.5deg) skewY(-1.5deg)', opacity: '0.5', offset: 0.5}, 
                {transform: 'skewX(0.78deg) skewY(0.78deg)', opacity: '0.4', offset: 0.6}, 
                {transform: 'skewX(-0.39deg) skewY(-0.39deg)', opacity: '0.3', offset: 0.7}, 
                {transform: 'skewX(0.19deg) skewY(0.19deg)', opacity: '0.2', offset: 0.8}, 
                {transform: 'skewX(0deg) skewY(0deg)', opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break; 
            
        case "lightSpeedInRight":
        case "lightspeed-in-right":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(100%, 0, 0) skewX(-30deg)', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'skewX(20deg)', opacity: '1', visibility: 'visible', offset: 0.6}, 
                {transform: 'skewX(-5deg)', opacity: '1', visibility: 'visible', offset: 0.8}, 
                {transform: 'none', opacity: '1 ', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "lightSpeedOutRight":
        case "lightspeed-out-right":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'none', opacity: '1 ', visibility: 'visible', offset: 0}, 
                {transform: 'translate3d(100%, 0, 0) skewX(30deg)', opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "lightSpeedInLeft":
        case "lightspeed-in-left":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(-100%, 0, 0) skewX(-30deg)', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'skewX(20deg)', opacity: '1', visibility: 'visible', offset: 0.6}, 
                {transform: 'skewX(-5deg)', opacity: '1', visibility: 'visible', offset: 0.8}, 
                {transform: 'none', opacity: '1 ', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "lightSpeedOutLeft":
        case "lightspeed-out-left":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'none', opacity: '1 ', visibility: 'visible', offset: 0}, 
                {transform: 'translate3d(-100%, 0, 0) skewX(30deg)', opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;
            
        case "overHinge":
        case "overhinge":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, 0deg)', transformOrigin: 'top left', visibility: 'visible', offset: 0}, 
                {transform: 'rotate3d(0, 0, 1, 80deg)', transformOrigin: 'top left', offset: 0.1}, 
                {transform: 'rotate3d(0, 0, 1, 60deg)', transformOrigin: 'top left', offset: 0.3}, 
                {transform: 'rotate3d(0, 0, 1, 160deg)', transformOrigin: 'top left', offset: 0.4}, 
                {transform: 'rotate3d(0, 0, 1, 120deg)', transformOrigin: 'top left', offset: 0.6},
                {transform: 'rotate3d(0, 0, 1, 320deg)', transformOrigin: 'top left', offset: 0.7}, 
                {transform: 'rotate3d(0, 0, 1, 240deg)', transformOrigin: 'top left', offset: 0.8},
                {transform: 'rotate3d(0, 0, 1, 360deg)', transformOrigin: 'top left', visibility: 'visible', offset: 1}
                //{transform: 'translate3d(0, 700px, 0)', transformOrigin: 'top left', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'ease-in-out'};

            break; 

        case "overHingeIn":
        case "overhinge-in":
            elt.style.visibility = 'visible';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'translate3d(0, 700px, 0)', transformOrigin: 'top left', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'translate3d(0, 500px, 0)', transformOrigin: 'top left', opacity: '0.4', visibility: 'visible', offset: 0.1}, 
                {transform: 'rotate3d(0, 0, 1, 60deg)', transformOrigin: 'top left', opacity: '0.6', offset: 0.3}, 
                {transform: 'rotate3d(0, 0, 1, 160deg)', transformOrigin: 'top left', opacity: '0.8', offset: 0.4}, 
                {transform: 'rotate3d(0, 0, 1, 120deg)', transformOrigin: 'top left', opacity: '0.1', offset: 0.6},
                {transform: 'rotate3d(0, 0, 1, 320deg)', transformOrigin: 'top left', offset: 0.7}, 
                {transform: 'rotate3d(0, 0, 1, 240deg)', transformOrigin: 'top left', offset: 0.8},
                {transform: 'rotate3d(0, 0, 1, 360deg)', transformOrigin: 'top left', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'ease-in-out'};

            break; 

        case "overHingeOut":
        case "overhinge-out":
            elt.style.visibility = 'hidden';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, 0deg)', transformOrigin: 'top left', opacity: '1', visibility: 'visible', offset: 0}, 
                {transform: 'rotate3d(0, 0, 1, -80deg)', transformOrigin: 'top left', offset: 0.1}, 
                {transform: 'rotate3d(0, 0, 1, -60deg)', transformOrigin: 'top left', offset: 0.3}, 
                {transform: 'rotate3d(0, 0, 1, -160deg)', transformOrigin: 'top left', offset: 0.4}, 
                {transform: 'rotate3d(0, 0, 1, -120deg)', transformOrigin: 'top left', offset: 0.6},
                {transform: 'rotate3d(0, 0, 1, -320deg)', transformOrigin: 'top left', opacity: '0.8', offset: 0.7}, 
                {transform: 'rotate3d(0, 0, 1, -240deg)', transformOrigin: 'top left', opacity: '0.6', offset: 0.8},
                {transform: 'translate3d(0, 700px, 0)', transformOrigin: 'top left', opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'ease-in-out'};

            break; 
                            
        case "pulse":
            keyframes = [
                {transform: 'scale3d(1, 1, 1)', visibility: 'visible', offset: 0}, 
                {transform: 'scale3d(1.05, 1.05, 1.05)', offset: 0.5}, 
                {transform: 'scale3d(1, 1, 1)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;  
                      
        case "rollIn":
        case "roll-in":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rollOut":
        case "roll-out":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 0}, 
                {transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, -120deg)', opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  
            
        case "rotateIn":
        case "rotate-in":
            elt.style.visibility = 'visible';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, -200deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'center', offset: 0}, 
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'center', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateInDownLeft":
        case "rotate-in-down-left":
            elt.style.visibility = 'visible';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, -45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'left bottom', offset: 0}, 
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'left bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateInDownRight":
        case "rotate-in-down-right":
            elt.style.visibility = 'visible';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, 45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'right bottom', offset: 0}, 
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'right bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateInUpLeft":
        case "rotate-in-up-left":
            elt.style.visibility = 'visible';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, 45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'left bottom', offset: 0}, 
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'left bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateInUpRight":
        case "rotate-in-up-right":
            elt.style.visibility = 'visible';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, -45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'right bottom', offset: 0}, 
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'right bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateOutDownLeft":
        case "rotate-out-down-left":
            elt.style.visibility = 'hidden';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'left bottom', offset: 0},
                {transform: 'rotate3d(0, 0, 1, 45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'left bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateOutDownRight":
        case "rotate-out-down-right":
            elt.style.visibility = 'hidden';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'right bottom', offset: 0},
                {transform: 'rotate3d(0, 0, 1, -45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'right bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateOutUpLeft":
        case "rotate-out-up-left":
            elt.style.visibility = 'hidden';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'left bottom', offset: 0},
                {transform: 'rotate3d(0, 0, 1, -45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'left bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateOutUpRight":
        case "rotate-out-up-right":
            elt.style.visibility = 'hidden';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'right bottom', offset: 0},
                {transform: 'rotate3d(0, 0, 1, 45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'right bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateOut":
        case "rotate-out":
            elt.style.visibility = 'hidden';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'center', offset: 0}, 
                {transform: 'rotate3d(0, 0, 1, 200deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'center', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  
            
        case "rubberband":
            keyframes = [
                {transform: 'scale3d(1, 1, 1)', visibility: 'visible', offset: 0}, 
                {transform: 'scale3d(1.25, 0.75, 1)', offset: 0.3}, 
                {transform: 'scale3d(0.75, 1.25, 1)', offset: 0.4}, 
                {transform: 'scale3d(1.15, 0.85, 1)', offset: 0.5}, 
                {transform: 'scale3d(.95, 1.05, 1)', offset: 0.65}, 
                {transform: 'scale3d(1.05, .95, 1)', offset: 0.75}, 
                {transform: 'scale3d(1, 1, 1)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
             
            break;  
                                   
        case "shake":
            keyframes = [
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 0}, 
                {transform: 'translate3d(-10px, 0, 0)', offset: 0.1}, 
                {transform: 'translate3d(10px, 0, 0)', offset: 0.2}, 
                {transform: 'translate3d(-10px, 0, 0)', offset: 0.3}, 
                {transform: 'translate3d(10px, 0, 0)', offset: 0.4}, 
                {transform: 'translate3d(-10px, 0, 0)', offset: 0.5}, 
                {transform: 'translate3d(10px, 0, 0)', offset: 0.6}, 
                {transform: 'translate3d(-10px, 0, 0)', offset: 0.7}, 
                {transform: 'translate3d(10px, 0, 0)', offset: 0.8}, 
                {transform: 'translate3d(-10px, 0, 0)', offset: 0.9}, 
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
           
            break;   
            
        case "slideInDown":
        case "slide-in-down":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(0, -100%, 0)', visibility: 'hidden', offset: 0},  
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break; 
        
        case "slideInLeft":
        case "slide-in-left":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden', offset: 0},  
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;  
            
        case "slideInRight":
        case "slide-in-right":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(100%, 0, 0)', visibility: 'hidden', offset: 0},  
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break; 
             
        case "slideInUp":
        case "slide-in-up":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(0, 100%, 0)', visibility: 'hidden', offset: 0},  
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break; 
                 
        case "slideOutDown":
        case "slide-out-down":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 0},  
                {transform: 'translate3d(0, 100%, 0)', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break; 
        
        case "slideOutLeft":
        case "slide-out-left":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 0},  
                {transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;  
            
        case "slideOutRight":
        case "slide-out-right":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 0},  
                {transform: 'translate3d(100%, 0, 0)', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break; 
             
        case "slideOutUp":
        case "slide-out-up":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 0},  
                {transform: 'translate3d(0, -100%, 0)', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break; 
        
        case "swing":
            keyframes = [
                {transform: 'translate(0%)', visibility: 'visible', offset: 0}, 
                {transform: 'rotate3d(0, 0, 1, 15deg)', offset: 0.2}, 
                {transform: 'rotate3d(0, 0, 1, -10deg)', offset: 0.4}, 
                {transform: 'rotate3d(0, 0, 1, 5deg)', offset: 0.6}, 
                {transform: 'rotate3d(0, 0, 1, -5deg)', offset: 0.8}, 
                {transform: 'rotate3d(0, 0, 1, 0deg)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;   
            
        case "tada":
            keyframes = [
                {transform: 'scale3d(1, 1, 1)', visibility: 'visible', offset: 0}, 
                {transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)', offset: 0.1}, 
                {transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)', offset: 0.2}, 
                {transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.3}, 
                {transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.4}, 
                {transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.5}, 
                {transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.6}, 
                {transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.7}, 
                {transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.8}, 
                {transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.9}, 
                {transform: 'scale3d(1, 1, 1)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
           
            break;     
            
        case "wobble":
            keyframes = [
                {transform: 'translate(0%)', visibility: 'visible', offset: 0}, 
                {transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)', offset: 0.15}, 
                {transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)', offset: 0.45}, 
                {transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)', offset: 0.6}, 
                {transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)', offset: 0.75}, 
                {transform: 'translateX(0%)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
           
            break;  
                                             
        case "zoomIn":
        case "zoom-in":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'scale3d(.3, .3, .3)  ', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
             
            break;  
                                                 
        case "zoomOutDown":
        case "zoom-out-down":
            elt.style.visibility = 'hidden';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'center bottom', offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)', opacity: '1', visibility: 'visible',  transformOrigin: 'center bottom', offset: 0.4},
                {transform: 'scale3d(.1, .1, .1) translate3d(0, 2000px, 0)', opacity: '0', visibility: 'hidden', transformOrigin: 'center bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'};
            
            break;  
                                                 
        case "zoomOutUp":
        case "zoom-out-up":
            elt.style.visibility = 'hidden';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'center bottom', offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)', opacity: '1', visibility: 'visible',  transformOrigin: 'center bottom', offset: 0.4},
                {transform: 'scale3d(.1, .1, .1) translate3d(0, -2000px, 0)', opacity: '0', visibility: 'hidden', transformOrigin: 'center bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'};
            
            break;  
                                                 
        case "zoomOutRight":
        case "zoom-out-right":
            elt.style.visibility = 'hidden';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'right center', offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(-42px, 0, 0)', opacity: '1', visibility: 'visible',  transformOrigin: 'right center', offset: 0.4},
                {transform: 'scale(.1) translate3d(2000px, 0, 0)', opacity: '0', visibility: 'hidden', transformOrigin: 'right center', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'};
              
            break;  
                                                 
        case "zoomOutLeft":
        case "zoom-out-left":
            elt.style.visibility = 'hidden';
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'left center', offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(42px, 0, 0)', opacity: '1',  transformOrigin: 'left center', offset: 0.4},
                {transform: 'scale(.1) translate3d(-2000px, 0, 0)', opacity: '0', visibility: 'hidden', transformOrigin: 'left center', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'};
             
            break;  
                                                      
        case "zoomInDown":
        case "zoom-in-down":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'scale3d(.1, .1, .1) translate3d(0, -1000px, 0)', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)', opacity: '1', visibility: 'visible', offset: 0.6},
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'};
           
            break;  
                                                      
        case "zoomInLeft":
        case "zoom-in-left":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'scale3d(.1, .1, .1) translate3d(-1000px, 0, 0)', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(10px, 0, 0)', opacity: '1', visibility: 'visible', offset: 0.6},
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
           
            break;  
                                                      
        case "zoomInRight":
        case "zoom-in-right":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'scale3d(.1, .1, .1) translate3d(1000px, 0, 0)', opacity: '0', visibility: 'hidden',  offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(-10px, 0, 0)', opacity: '1', visibility: 'visible', offset: 0.6},
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'};
            
            break;  
                                                      
        case "zoomInUp":
        case "zoom-in-up":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'scale3d(.1, .1, .1) translate3d(0, 1000px, 0)', opacity: '0', visibility: 'hidden',  offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)', opacity: '1', visibility: 'visible', offset: 0.6},
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'};
            
            break;  
                                                          
        case "zoomOut":
        case "zoom-out":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 0},
                {transform: 'scale3d(.3, .3, .3)  ', opacity: '0', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;  
            
        default:
            keyframes = [
                {opacity: '0', visibility: 'visible', offset: 0},
                {opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;
    }
    
    return elt.animate( keyframes, timing) ;

}


/* Here is where the animations dependencies are included. 
 * iJS animations features requires **web-animations.js** library.
 * Some browser like *chrome* or webkit's base applications implement it.
 * However, on waiting of its full support, it's more efficient to prevent non full support by directly use the library.
 * Therefore, user who have to use that, do not have to include it again when he use *iJS*.
 _______________________________________________________________________________________________________________________
 */
require('web-animations-js') ;


},{"web-animations-js":1}]},{},[2]);
