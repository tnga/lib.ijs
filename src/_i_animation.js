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
                 {transform: 'scale3d(1.1, 1.1, 1.1)', visibility: 'visible', offset: 0.2},
                {transform: 'scale3d(.9, .9, .9)', offset: 0.4},
                 {transform: 'scale3d(1.03, 1.03, 1.03)', opacity: '1', offset: 0.6},
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
                {transform: 'scale3d(.9, .9, .9)', opacity: '1', offset: 0.2},
                {transform: 'scale3d(1.1, 1.1, 1.1)', offset: 0.5},
                {transform: 'scale3d(1.1, 1.1, 1.1)', offset: 0.55},
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
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', offset: 0},
                {transform: 'translate3d(0, 50px, 0)', opacity: '1', offset: 0.2},
                {transform: 'translate3d(0, -20px, 0)', offset: 0.4},
                {transform: 'translate3d(0, -20px, 0)', offset: 0.45},
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
                {transform: 'translate3d(0, 50px, 0)', opacity: '1', offset: 0.2},
                {transform: 'translate3d(0, 20px, 0)', offset: 0.4},
                {transform: 'translate3d(0, 20px, 0)', offset: 0.45},
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
                {transform: 'translate3d(100px, 0, 0)', opacity: '1', offset: 0.2},
                {transform: 'translate3d(-20px, 0, 0)', offset: 0.4},
                {transform: 'translate3d(-20px, 0, 0)', offset: 0.45},
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
                {transform: 'translate3d(100px, 0, 0)', opacity: '1', offset: 0.2},
                {transform: 'translate3d(-20px, 0, 0)', offset: 0.4},
                {transform: 'translate3d(-20px, 0, 0)', offset: 0.45},
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
                {transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)', visibility: 'visible', offset: 0.4},
                {transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)', opacity: '1', offset: 0.6},
                {transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)', opacity: '1', offset: 0.8},
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
            keyframes = [
                {transform: 'skewX(0deg) skewY(0deg)', visibility: 'visible', transformOrigin: 'center', offset: 0}, 
                {transform: 'skewX(-12.5deg) skewY(-12.5deg)', offset: 0.2}, 
                {transform: 'skewX(6.2deg) skewY(6.2deg)', offset: 0.3},
                {transform: 'skewX(-3.1deg) skewY(-3.1deg)', offset: 0.4}, 
                {transform: 'skewX(1.5deg) skewY(1.5deg)', offset: 0.5}, 
                {transform: 'skewX(-0.78deg) skewY(-0.78deg)', offset: 0.6}, 
                {transform: 'skewX(0.39deg) skewY(0.39deg)', offset: 0.7}, 
                {transform: 'skewX(-0.19deg) skewY(-0.19deg)', offset: 0.8}, 
                {transform: 'skewX(0deg) skewY(0deg)', visibility: 'visible', transformOrigin: 'center', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break; 
                        
        case "jelloIn":
        case "jello-in":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'skewX(0deg) skewY(0deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'center', offset: 0}, 
                {transform: 'skewX(-12.5deg) skewY(-12.5deg)', opacity: '0.2', visibility: 'visible', offset: 0.2}, 
                {transform: 'skewX(6.2deg) skewY(6.2deg)', opacity: '0.4', offset: 0.3},
                {transform: 'skewX(-3.1deg) skewY(-3.1deg)', opacity: '0.6', offset: 0.4}, 
                {transform: 'skewX(1.5deg) skewY(1.5deg)', opacity: '0.8', offset: 0.5}, 
                {transform: 'skewX(-0.78deg) skewY(-0.78deg)', opacity: '1', offset: 0.6}, 
                {transform: 'skewX(0.39deg) skewY(0.39deg)', offset: 0.7}, 
                {transform: 'skewX(-0.19deg) skewY(-0.19deg)', offset: 0.8}, 
                {transform: 'skewX(0deg) skewY(0deg)', opacity: '1', visibility: 'visible', transformOrigin: 'center', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break; 
            
        case "jelloOut":
        case "jello-out":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'skewX(0deg) skewY(0deg)', opacity: '1', visibility: 'visible', transformOrigin: 'center', offset: 0}, 
                {transform: 'skewX(12.5deg) skewY(12.5deg)', opacity: '0.8', offset: 0.2}, 
                {transform: 'skewX(-6.2deg) skewY(-6.2deg)', opacity: '0.7', offset: 0.3},
                {transform: 'skewX(3.1deg) skewY(3.1deg)', opacity: '0.6', offset: 0.4}, 
                {transform: 'skewX(-1.5deg) skewY(-1.5deg)', opacity: '0.5', offset: 0.5}, 
                {transform: 'skewX(0.78deg) skewY(0.78deg)', opacity: '0.4', offset: 0.6}, 
                {transform: 'skewX(-0.39deg) skewY(-0.39deg)', opacity: '0.3', offset: 0.7}, 
                {transform: 'skewX(0.19deg) skewY(0.19deg)', opacity: '0.2', offset: 0.8}, 
                {transform: 'skewX(0deg) skewY(0deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'center', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break; 
            
        case "lightSpeed":
        case "lightspeed":
            keyframes = [
                {transform: 'skewX(-30deg)', visibility: 'visible', offset: 0}, 
                {transform: 'skewX(20deg)', offset: 0.6}, 
                {transform: 'skewX(-5deg)', offset: 0.8}, 
                {transform: 'none', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  
              
        case "lightSpeedIn":
        case "lightspeed-in":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'skewX(-30deg)', opacity: '0', visibility: 'hidden', offset: 0}, 
                {transform: 'skewX(20deg)', opacity: '1', visibility: 'visible', offset: 0.6}, 
                {transform: 'skewX(-5deg)', opacity: '1', visibility: 'visible', offset: 0.8}, 
                {transform: 'none', opacity: '1 ', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  
        
        case "lightSpeedOut":
        case "lightspeed-out":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'none', opacity: '1 ', visibility: 'visible', offset: 0}, 
                {transform: 'skewX(30deg)', opacity: '0', visibility: 'hidden', offset: 1}
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
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, 0deg)', transformOrigin: 'top left', visibility: 'visible', offset: 0}, 
                {transform: 'rotate3d(0, 0, 1, 80deg)', transformOrigin: 'top left', offset: 0.1}, 
                {transform: 'rotate3d(0, 0, 1, 60deg)', transformOrigin: 'top left', offset: 0.3}, 
                {transform: 'rotate3d(0, 0, 1, 160deg)', transformOrigin: 'top left', offset: 0.4}, 
                {transform: 'rotate3d(0, 0, 1, 120deg)', transformOrigin: 'top left', offset: 0.6},
                {transform: 'rotate3d(0, 0, 1, 320deg)', transformOrigin: 'top left', offset: 0.7}, 
                {transform: 'rotate3d(0, 0, 1, 240deg)', transformOrigin: 'top left', offset: 0.8},
                {transform: 'rotate3d(0, 0, 1, 360deg)', transformOrigin: 'top left', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'ease-in-out'};

            break; 

        case "overHingeIn":
        case "overhinge-in":
            elt.style.visibility = 'visible';
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
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, -200deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'center', offset: 0}, 
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'center', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateInDownLeft":
        case "rotate-in-down-left":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, -45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'left bottom', offset: 0}, 
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'left bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateInDownRight":
        case "rotate-in-down-right":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, 45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'right bottom', offset: 0}, 
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'right bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateInUpLeft":
        case "rotate-in-up-left":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, 45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'left bottom', offset: 0}, 
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'left bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateInUpRight":
        case "rotate-in-up-right":
            elt.style.visibility = 'visible';
            keyframes = [
                {transform: 'rotate3d(0, 0, 1, -45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'right bottom', offset: 0}, 
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'right bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateOutDownLeft":
        case "rotate-out-down-left":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'left bottom', offset: 0},
                {transform: 'rotate3d(0, 0, 1, 45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'left bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateOutDownRight":
        case "rotate-out-down-right":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'right bottom', offset: 0},
                {transform: 'rotate3d(0, 0, 1, -45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'right bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateOutUpLeft":
        case "rotate-out-up-left":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'left bottom', offset: 0},
                {transform: 'rotate3d(0, 0, 1, -45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'left bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateOutUpRight":
        case "rotate-out-up-right":
            elt.style.visibility = 'hidden';
            keyframes = [
                {transform: 'none', opacity: '1', visibility: 'visible', transformOrigin: 'right bottom', offset: 0},
                {transform: 'rotate3d(0, 0, 1, 45deg)', opacity: '0', visibility: 'hidden', transformOrigin: 'right bottom', offset: 1}
            ];
            timing = {duration: time, iterations: iterations};

            break;  

        case "rotateOut":
        case "rotate-out":
            elt.style.visibility = 'hidden';
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
        
        case "squiggle":
            keyframes = [
                {transform: 'scaleX(0.7) scaleY(0) translate(0,-100%)', opacity: '0', visibility: 'visible', offset: 0}, 
                {transform: 'scaleX(1.5) scaleY(1) translate(0,0%)', opacity: '0.3', offset: 0.1}, 
                {transform: 'scaleX(0.8) scaleY(1) translate(0%,-20%)', opacity: '0.6', offset: 0.2}, 
                {transform: 'scaleX(1.3) scaleY(1) translate(0%,0%)', opacity: '0.7', offset: 0.35}, 
                {transform: 'scaleX(0.9) scaleY(1) translate(0%,-5%)', opacity: '0.8', offset: 0.5}, 
                {transform: 'scaleX(1.1) scaleY(1) translate(0%,0%)', opacity: '0.9', offset: 0.7},
                {transform: 'scaleX(1) scaleY(1) translate(0%,0%)', opacity: '1', offset: 0.9},
                {transform: 'inherit', opacity: '1', visibility: 'visible', offset: 1}
            ];
            timing = {duration: time, iterations: iterations, easing: 'ease-in'};
            
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
            console.warn('iJS-animate: unknown animation "'+anime+'"') ;
            
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

