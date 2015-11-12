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
 * @param   {Number}          iterations Number of animation's iteration. 1 by default, -1 for infinite animation.
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
    if (!iJS.isNumber( iterations )) iterations = 1 ; //@TODO allow infinite itérations value for infinite animation.
    if (!iJS.isString( anime )) anime = "_default" ;
    
    var keyframes = [] ,
        timing = {} ;
    
    switch (anime) {
            
        case "bounce":
            keyframes = [
                {transform: 'translate3d(0,0,0)', offset: 0}, 
                {transform: 'translate3d(0,0,0)', offset: 0.2},
                {transform: 'translate3d(0,-30px,0)', offset: 0.4},
                {transform: 'translate3d(0,-30px,0)', offset: 0.43},
                {transform: 'translate3d(0,0,0)', offset: 0.53},
                {transform: 'translate3d(0,-15px,0)', offset: 0.7},
                {transform: 'translate3d(0,0,0)', offset: 0.8},
                {transform: 'translate3d(0,-15px,0)', offset: 0.9},
                {transform: 'translate3d(0,0,0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'};
            
            break;
        
        case "bounce-in":
             keyframes = [
                {transform: 'scale3d(.3, .3, .3)', opacity: '0', offset: 0}, 
                {transform: 'scale3d(1.1, 1.1, 1.1)', offset: 0.2},
                {transform: 'scale3d(.9, .9, .9)', offset: 0.4},
                {transform: 'scale3d(1.03, 1.03, 1.03)', opacity: '1', offset: 0.6},
                {transform: 'scale3d(.97, .97, .97)', offset: 0.8},
                {transform: 'scale3d(1, 1, 1)', opacity: '1', offset: 1}
             ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'};
            
            break;
        
        case "bounce-out":
            keyframes = [
                {transform: 'none', opacity: '1', offset: 0},
                {transform: 'scale3d(.9, .9, .9)', opacity: '1', offset: 0.2},
                {transform: 'scale3d(1.1, 1.1, 1.1)', opacity: '1', offset: 0.5},
                {transform: 'scale3d(1.1, 1.1, 1.1)', opacity: '1', offset: 0.55},
                {transform: 'scale3d(.3, .3, .3)', opacity: '0', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;
        
        case "bounce-in-down":
            keyframes = [
                {transform: 'translate3d(0, -3000px, 0)', opacity: '0', offset: 0}, 
                {transform: 'translate3d(0, 25px, 0)', opacity: '1', offset: 0.6},
                {transform: 'translate3d(0, -100px, 0)', offset: 0.75},
                {transform: 'translate3d(0, 5px, 0)', offset: 0.9},
                {transform: 'none', opacity: '1', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'};
            
            break;
            
        case "bounce-out-down":
            var transitingTimingFunction = elt.style['transition-timing-function'];
            keyframes = [
                {transform: 'none', opacity: '1', offset: 0},
                {transform: 'translate3d(0, 50px, 0)', opacity: '1', offset: 0.2},
                {transform: 'translate3d(0, -20px, 0)', opacity: '1', offset: 0.4},
                {transform: 'translate3d(0, -20px, 0)', opacity: '1', offset: 0.45},
                {transform: 'translate3d(0, 2000px, 0)', opacity: '0', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
           
            break;   
            
        case "bounce-in-up":
            keyframes = [
                {transform: 'translate3d(0, 3000px, 0)', opacity: '0', offset: 0}, 
                {transform: 'translate3d(0, -25px, 0)', opacity: '1', offset: 0.6},
                {transform: 'translate3d(0, 100px, 0)', offset: 0.75},
                {transform: 'translate3d(0, -5px, 0)', offset: 0.9},
                {transform: 'translate3d(0, 0, 0)', opacity: '1', offset: 1}];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'};
            
            break;  
            
        case "bounce-out-up":
            keyframes = [
                {transform: 'none', opacity: '1', offset: 0},
                {transform: 'translate3d(0, 50px, 0)', opacity: '1', offset: 0.2},
                {transform: 'translate3d(0, 20px, 0)', opacity: '1', offset: 0.4},
                {transform: 'translate3d(0, 20px, 0)', opacity: '1', offset: 0.45},
                {transform: 'translate3d(0, -2000px, 0)', opacity: '0', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;  
            
        case "bounce-in-left":
            keyframes = [
                {transform: 'translate3d(-3000px, 0, 0)', opacity: '0', offset: 0}, 
                {transform: 'translate3d(25px, 0, 0)', opacity: '1', offset: 0.6},
                {transform: 'translate3d(-100px, 0, 0)', offset: 0.75},
                {transform: 'translate3d(5px, 0, 0)', offset: 0.9},
                {transform: 'none', opacity: '1', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'};
           
            break;     
            
        case "bounce-out-left":
            keyframes = [
                {transform: 'none', opacity: '1', offset: 0},
                {transform: 'translate3d(100px, 0, 0)', opacity: '1', offset: 0.2},
                {transform: 'translate3d(-20px, 0, 0)', opacity: '1', offset: 0.4},
                {transform: 'translate3d(-20px, 0, 0)', opacity: '1', offset: 0.45},
                {transform: 'translate3d(-2000px, 0, 0)', opacity: '0', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;    
            
        case "bounce-in-right":
            
            keyframes = [
                {transform: 'translate3d(3000px, 0, 0)', opacity: '0', offset: 0}, 
                {transform: 'translate3d(-25px, 0, 0)', opacity: '1', offset: 0.6},
                { transform: 'translate3d(100px, 0, 0)', offset: 0.75},
                {transform: 'translate3d(-5px, 0, 0)', offset: 0.9},
                {transform: 'none', opacity: '1', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'};
            
            break;   
            
        case "bounce-out-right":
            keyframes = [
                {transform: 'none', opacity: '1', offset: 0},
                {transform: 'translate3d(100px, 0, 0)', opacity: '1', offset: 0.2},
                {transform: 'translate3d(-20px, 0, 0)', opacity: '1', offset: 0.4},
                {transform: 'translate3d(-20px, 0, 0)', opacity: '1', offset: 0.45},
                {transform: 'translate3d(2000px, 0, 0)', opacity: '0', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
           
            break;    
            
        case "fade-in":
            keyframes = [
                {opacity: '0', offset: 0}, 
                {opacity: '1', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-out":
            keyframes = [
                {opacity: '1', offset: 0}, 
                {opacity: '0', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-in-down":
            keyframes = [
                {opacity: '0', transform: 'translate3d(0, -100%, 0)', offset: 0}, 
                {opacity: '1', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-out-down":
            keyframes = [
                {opacity: '1', transform: 'none', offset: 0},
                {opacity: '0', transform: 'translate3d(0, 100%, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;    

        case "fade-out-up":
            keyframes = [
                {opacity: '1', transform: 'none', offset: 0},
                {opacity: '0', transform: 'translate3d(0, -100%, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-out-up-big":
            keyframes = [
                {opacity: '1', transform: 'none', offset: 0},
                {opacity: '0', transform: 'translate3d(0, -2000px, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-in-up":
            keyframes = [
                {opacity: '0', transform: 'translate3d(0, 100%, 0)', offset: 0}, 
                {opacity: '1', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-in-down-big":
            keyframes = [
                {opacity: '0', transform: 'translate3d(0, -2000px, 0)', offset: 0}, 
                {opacity: '1', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-out-down-big":
            keyframes = [
                {opacity: '1', transform: 'none', offset: 0},
                {opacity: '0', transform: 'translate3d(0, 2000px, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-in-up-big":
            keyframes = [
                {opacity: '0', transform: 'translate3d(0, 2000px, 0)', offset: 0}, 
                {opacity: '1', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-in-right-big":
            keyframes = [
                {opacity: '0', transform: 'translate3d(2000px, 0, 0)', offset: 0}, 
                {opacity: '1', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-out-left-big":
            keyframes = [
                {opacity: '1', transform: 'none', offset: 0}, 
                {opacity: '0', transform: 'translate3d(-2000px, 0, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-in-left":
            keyframes = [
                {opacity: '0', transform: 'translate3d(-100%, 0, 0)', offset: 0}, 
                {opacity: '1', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-in-left-big":
            keyframes = [
                {opacity: '0', transform: 'translate3d(-2000px, 0, 0)', offset: 0}, 
                {opacity: '1', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-in-right":
            keyframes = [
                {opacity: '0', transform: 'translate3d(100%, 0, 0)', offset: 0}, 
                {opacity: '1', transform: 'none', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-out-left":
            keyframes = [
                {opacity: '1', transform: 'none', offset: 0}, 
                {opacity: '0', transform: 'translate3d(-100%, 0, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-out-right":
            keyframes = [
                {opacity: '1', transform: 'none', offset: 0},
                {opacity: '0', transform: 'translate3d(100%, 0, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "fade-out-right-big":
            keyframes = [
                {opacity: '1', transform: 'none', offset: 0},
                {opacity: '0', transform: 'translate3d(2000px, 0, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  
            
        case "flash":
            keyframes = [
                {opacity: '1', offset: 0}, 
                {opacity: '0', offset: 0.25}, 
                {opacity: '1', offset: 0.5}, 
                {opacity: '0', offset: 0.75}, 
                {opacity: '1', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  
            
        case "flip":
            keyframes = [
                {transform: 'perspective(400px) rotate3d(0, 1, 0, -360deg)', offset: 0},
                {transform: 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)', offset: 0.4},
                {transform: 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)', offset: 0.5},
                {transform: 'perspective(400px) scale3d(.95, .95, .95)', offset: 0.8},
                {transform: 'perspective(400px)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'ease-in'};
           
            break;
            
        case "flip-in-x":
            keyframes = [
                {transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)', opacity: '0', offset: 0},
                {transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)', offset: 0.4},
                {transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)', opacity: '1', offset: 0.6},
                {transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)', opacity: '1',offset: 0.8},
                {transform: 'perspective(400px)', opacity: '1', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'ease-in'};
           
            break;  
                  
        case "flip-out-x":
            keyframes = [
                {transform: 'perspective(400px)', opacity: '1', offset: 0},
                {transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)', opacity: '1', offset: 0.3},
                {transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)', opacity: '0', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
           
            break;  
                  
        case "flip-in-y":
            keyframes = [
                {transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)', opacity: '0', offset: 0},
                {transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)', offset: 0.4},
                {transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)', opacity: '1', offset: 0.6},
                {transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)', opacity: '1',offset: 0.8},
                {transform: 'perspective(400px)', opacity: '1', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'ease-in'};
           
            break;  
                  
        case "flip-out-y":
            keyframes = [
                {transform: 'perspective(400px)', opacity: '1', offset: 0},
                {transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)', opacity: '1', offset: 0.3},
                {transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)', opacity: '0', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break; 
            
            /*case "hinge": //@TODO see the partial implementation keyframes problems, to make this work.
                var transformOrigin = elt.style['transform-origin'];
                var animationTimingFunction = elt.style['animation-timing-function'];
                keyframes = [
                    {animationTimingFunction: 'ease-in-out', transformOrigin: 'top left', offset: 0}, 
                    {transform: 'rotate3d(0, 0, 1, 80deg)', animationTimingFunction: 'ease-in-out', transformOrigin: 'top left', offset: 0.2}, 
                    {transform: 'rotate3d(0, 0, 1, 60deg)', animationTimingFunction: 'ease-in-out', transformOrigin: 'top left', offset: 0.4}, 
                    {transform: 'rotate3d(0, 0, 1, 80deg)', animationTimingFunction: 'ease-in-out', transformOrigin: 'top left', offset: 0.6},
                    {transform: 'rotate3d(0, 0, 1, 60deg)', animationTimingFunction: 'ease-in-out', transformOrigin: 'top left', offset: 0.8},
                    {transform: 'translate3d(0, 700px, 0)', opacity: 0, offset: 1}
                ];
                timing = {duration: time, iterations: iterations, easing: 'ease-in-out'};

            break; 
        //*/
            
        /*case "jello": //@TODO see the partial implementation keyframes problems, to make this work.
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', transformOrigin: 'center', offset: 0.11}, 
                {transform: 'skewX(-12.5deg) skewY(-12.5deg)', offset: 0.22}, 
                {transform: 'skewX(6.25deg) skewY(6.25deg)', offset: 0.33},
                {transform: 'skewX(-3.125deg) skewY(-3.125deg)', offset: 0.44}, 
                {transform: 'skewX(1.5625deg) skewY(1.5625deg)', offset: 0.55}, 
                {transform: 'skewX(-0.78125deg) skewY(-0.78125deg)', offset: 0.66}, 
                {transform: 'skewX(0.390625deg) skewY(0.390625deg)', offset: 0.77}, 
                {transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)', offset: 0.88}, 
                {transform: 'none', transformOrigin: 'center', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break; 
        //*/
            
        case "lightspeed-in-right":
            keyframes = [
                {transform: 'translate3d(100%, 0, 0) skewX(-30deg)', opacity: '0', offset: 0}, 
                {transform: 'skewX(20deg)', opacity: '1', offset: 0.6}, 
                {transform: 'skewX(-5deg)', opacity: '1', offset: 0.8}, 
                {transform: 'none', opacity: '1 ', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "lightspeed-out-right":
            keyframes = [
                {transform: 'none', opacity: '1 ', offset: 0}, 
                {transform: 'translate3d(100%, 0, 0) skewX(30deg)', opacity: '0', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "lightspeed-in-left":
            keyframes = [
                {transform: 'translate3d(-100%, 0, 0) skewX(-30deg)', opacity: '0', offset: 0}, 
                {transform: 'skewX(20deg)', opacity: '1', offset: 0.6}, 
                {transform: 'skewX(-5deg)', opacity: '1', offset: 0.8}, 
                {transform: 'none', opacity: '1 ', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "lightspeed-out-left":
            keyframes = [
                {transform: 'none', opacity: '1 ', offset: 0}, 
                {transform: 'translate3d(-100%, 0, 0) skewX(30deg)', opacity: '0', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  
                            
        case "pulse":
            keyframes = [
                {transform: 'scale3d(1, 1, 1)', offset: 0}, 
                {transform: 'scale3d(1.05, 1.05, 1.05)', offset: 0.5}, 
                {transform: 'scale3d(1, 1, 1)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;  
                      
        case "roll-in":
            keyframes = [
                {transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)', opacity: '0', offset: 0}, 
                {transform: 'none', opacity: '1', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "roll-out":
            keyframes = [
                {transform: 'none', opacity: '1', offset: 0}, 
                {transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, -120deg)', opacity: '0', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  
            
        case "rotate-in":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, -200deg)', opacity: '0', transformOrigin: 'center', offset: 0}, 
                {transform: 'none', opacity: '1', transformOrigin: 'center', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotate-in-down-left":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, -45deg)', opacity: '0', transformOrigin: 'left bottom', offset: 0}, 
                {transform: 'none', opacity: '1', transformOrigin: 'left bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotate-in-down-right":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, 45deg)', opacity: '0', transformOrigin: 'right bottom', offset: 0}, 
                {transform: 'none', opacity: '1', transformOrigin: 'right bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotate-in-up-left":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, 45deg)', opacity: '0', transformOrigin: 'left bottom', offset: 0}, 
                {transform: 'none', opacity: '1', transformOrigin: 'left bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotate-in-up-right":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, -45deg)', opacity: '0', transformOrigin: 'right bottom', offset: 0}, 
                {transform: 'none', opacity: '1', transformOrigin: 'right bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotate-out-down-left":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', transformOrigin: 'left bottom', offset: 0},
                {transform: 'rotate3d(0, 0, 1, 45deg)', opacity: '0', transformOrigin: 'left bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotate-out-down-right":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', transformOrigin: 'right bottom', offset: 0},
                {transform: 'rotate3d(0, 0, 1, -45deg)', opacity: '0', transformOrigin: 'right bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotate-out-up-left":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', transformOrigin: 'left bottom', offset: 0},
                {transform: 'rotate3d(0, 0, 1, -45deg)', opacity: '0', transformOrigin: 'left bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotate-out-up-right":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', transformOrigin: 'right bottom', offset: 0},
                {transform: 'rotate3d(0, 0, 1, 45deg)', opacity: '0', transformOrigin: 'right bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotate-out":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', transformOrigin: 'center', offset: 0}, 
                {transform: 'rotate3d(0, 0, 1, 200deg)', opacity: '0', transformOrigin: 'center', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  
            
        case "rubberband":
            keyframes = [
                {transform: 'scale3d(1, 1, 1)', offset: 0}, 
                {transform: 'scale3d(1.25, 0.75, 1)', offset: 0.3}, 
                {transform: 'scale3d(0.75, 1.25, 1)', offset: 0.4}, 
                {transform: 'scale3d(1.15, 0.85, 1)', offset: 0.5}, 
                {transform: 'scale3d(.95, 1.05, 1)', offset: 0.65}, 
                {transform: 'scale3d(1.05, .95, 1)', offset: 0.75}, 
                {transform: 'scale3d(1, 1, 1)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
             
            break;  
                                   
        case "shake":
            keyframes = [
                {transform: 'translate3d(0, 0, 0)', offset: 0}, 
                {transform: 'translate3d(-10px, 0, 0)', offset: 0.1}, 
                {transform: 'translate3d(10px, 0, 0)', offset: 0.2}, 
                {transform: 'translate3d(-10px, 0, 0)', offset: 0.3}, 
                {transform: 'translate3d(10px, 0, 0)', offset: 0.4}, 
                {transform: 'translate3d(-10px, 0, 0)', offset: 0.5}, 
                {transform: 'translate3d(10px, 0, 0)', offset: 0.6}, 
                {transform: 'translate3d(-10px, 0, 0)', offset: 0.7}, 
                {transform: 'translate3d(10px, 0, 0)', offset: 0.8}, 
                {transform: 'translate3d(-10px, 0, 0)', offset: 0.9}, 
                {transform: 'translate3d(0, 0, 0)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
           
            break;   
            
        case "slide-in-down":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(0, -100%, 0)', visibility: 'hidden', offset: 0},  
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break; 
        
        case "slide-in-left":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden', offset: 0},  
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;  
            
        case "slide-in-right":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(100%, 0, 0)', visibility: 'hidden', offset: 0},  
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break; 
             
        case "slide-in-up":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'translate3d(0, 100%, 0)', visibility: 'hidden', offset: 0},  
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break; 
                 
        case "slide-out-down":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 0},  
                {transform: 'translate3d(0, 100%, 0)', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break; 
        
        case "slide-out-left":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 0},  
                {transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;  
            
        case "slide-out-right":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'translate3d(0, 0, 0)', visibility: 'visible', offset: 0},  
                {transform: 'translate3d(100%, 0, 0)', visibility: 'hidden', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break; 
             
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
                {transform: 'translate(0%)', offset: 0}, 
                {transform: 'rotate3d(0, 0, 1, 15deg)', offset: 0.2}, 
                {transform: 'rotate3d(0, 0, 1, -10deg)', offset: 0.4}, 
                {transform: 'rotate3d(0, 0, 1, 5deg)', offset: 0.6}, 
                {transform: 'rotate3d(0, 0, 1, -5deg)', offset: 0.8}, 
                {transform: 'rotate3d(0, 0, 1, 0deg)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;   
            
        case "tada":
            keyframes = [
                {transform: 'scale3d(1, 1, 1)', offset: 0}, 
                {transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)', offset: 0.1}, 
                {transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)', offset: 0.2}, 
                {transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.3}, 
                {transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.4}, 
                {transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.5}, 
                {transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.6}, 
                {transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.7}, 
                {transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.8}, 
                {transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.9}, 
                {transform: 'scale3d(1, 1, 1)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
           
            break;     
            
        case "wobble":
            keyframes = [
                {transform: 'translate(0%)', offset: 0}, 
                {transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)', offset: 0.15}, 
                {transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)', offset: 0.45}, 
                {transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)', offset: 0.6}, 
                {transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)', offset: 0.75}, 
                {transform: 'translateX(0%)', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
           
            break;  
                                             
        case "zoom-in":
            keyframes = [
                {transform: 'scale3d(.3, .3, .3)  ', opacity: '0', offset: 0}, 
                {transform: 'none', opacity: '1', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
             
            break;  
                                                 
        case "zoom-out-down":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', transformOrigin: 'center bottom', offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)', opacity: '1',  transformOrigin: 'center bottom', offset: 0.4},
                {transform: 'scale3d(.1, .1, .1) translate3d(0, 2000px, 0)', opacity: '0',  transformOrigin: 'center bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'};
            
            break;  
                                                 
        case "zoom-out-up":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', transformOrigin: 'center bottom', offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)', opacity: '1',  transformOrigin: 'center bottom', offset: 0.4},
                {transform: 'scale3d(.1, .1, .1) translate3d(0, -2000px, 0)', opacity: '0', transformOrigin: 'center bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'};
            
            break;  
                                                 
        case "zoom-out-right":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', transformOrigin: 'right center', offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(-42px, 0, 0)', opacity: '1',  transformOrigin: 'right center', offset: 0.4},
                {transform: 'scale(.1) translate3d(2000px, 0, 0)', opacity: '0', transformOrigin: 'right center', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'};
              
            break;  
                                                 
        case "zoom-out-left":
            var transformOrigin = elt.style['transform-origin'];
            keyframes = [
                {transform: 'none', opacity: '1', transformOrigin: 'left center', offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(42px, 0, 0)', opacity: '1',  transformOrigin: 'left center', offset: 0.4},
                {transform: 'scale(.1) translate3d(-2000px, 0, 0)', opacity: '0', transformOrigin: 'left center', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'};
             
            break;  
                                                      
        case "zoom-in-down":
            keyframes = [
                {transform: 'scale3d(.1, .1, .1) translate3d(0, -1000px, 0)', opacity: '0',  offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)', opacity: '1', offset: 0.6},
                {transform: 'none', opacity: '1', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'};
           
            break;  
                                                      
        case "zoom-in-left":
            keyframes = [
                {transform: 'scale3d(.1, .1, .1) translate3d(-1000px, 0, 0)', opacity: '0',  offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(10px, 0, 0)', opacity: '1', offset: 0.6},
                {transform: 'none', opacity: '1', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
           
            break;  
                                                      
        case "zoom-in-right":
            keyframes = [
                {transform: 'scale3d(.1, .1, .1) translate3d(1000px, 0, 0)', opacity: '0',  offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(-10px, 0, 0)', opacity: '1', offset: 0.6},
                {transform: 'none', opacity: '1', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'};
            
            break;  
                                                      
        case "zoom-in-up":
            keyframes = [
                {transform: 'scale3d(.1, .1, .1) translate3d(0, 1000px, 0)', opacity: '0',  offset: 0}, 
                {transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)', opacity: '1', offset: 0.6},
                {transform: 'none', opacity: '1', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'};
            
            break;  
                                                          
        case "zoom-out":
            keyframes = [
                {transform: 'none', opacity: '1', offset: 0},
                {transform: 'scale3d(.3, .3, .3)  ', opacity: '0', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};
            
            break;  
            
        default:
            keyframes = [
                {opacity: '0', offset: 0},
                {opacity: '1', offset: 1}
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

