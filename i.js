/* "iJS"(pour "inside JS") initié ici est une mini bibliothèque pour le développement en JavaScript des projets associés. 
 * En effet s'il est une chose que JQuery ne fais pas c'est le respect de la syntaxe JavaScript; ce qui constitue un problème lorsque après avoir appris le JavaScript, 
 *il ne suffit plus seulement de connaître les fonctionnalités qu'apporte JQuery (ce qui se doit normalement d'être suffisant) mais aussi sa syntaxe à elle.
 * "iJS" tout comme "Dojo" s'oriente avant tout dans le respect de la syntaxe; sauf que seules sont récrites les fonctionnalités JS trop verbeux ou difficile d'utilisation.
 *___________________________________________________________________________________________________________________________________________________________________________
 */

//"use strict";

//manage possible conflict in iJS namespace definition.
if ( typeof iJS !== "undefined" ) {
    
    console.warn("Seem like `iJS` namespace is use for another purpose. Taking risk of an overwrite ...") ;
    window.iJS = iJS = {} ;
    console.warn("Forcing iJS namespace initialization ... done.") ;
    
} else {
    
    window.iJS = {} ;
}

/**   
 * This name space provide some functionalities that facilitate JavaScript development of the associated projects.
 * It’s firstly build with UMI web’s projects and for pure JavaScript development.
 * However it can be use for any JavaScript projects.
 * 
 * @license LGPL v3.0
 * @author  [Tindo Ngoufo Arsel](mailto:devtnga@gmail.com)
 * @version 0.0_(15.07) 
 * 
 * @namespace iJS
 */

iJS = {
    
    /**
     *@property {string} version Inform about the version of library that is use.
     */
    version: "0.0_15.07",
    
    /**
     * Let you know if a value or a variable is type of Number or not.
     * @function isNumber
     * @param   {all}     arg argument of test.
     * @returns {boolean} true if it is, false if it isn’t.
     */
    isNumber: function (arg) {

        return ((typeof arg).toLowerCase() === "number" || arg instanceof Number);
    },

    /**
     * Let you know if a value or a variable is type of Boolean or not.
     * @function isBoolean
     * @param   {all}     arg argument of test.
     * @returns {boolean} true if it is, false if it isn’t.
     */
    isBoolean: function (arg) {

        return ((typeof arg).toLowerCase() === "boolean" || arg instanceof Boolean);
    },

    /**
     * Let you know if a value or a variable is type of String or not.
     * @function isString
     * @param   {all}     arg argument of test.
     * @returns {boolean} true if it is, false if it isn’t.
     */
    isString: function (arg) {

        return ((typeof arg).toLowerCase() === "string" || arg instanceof String);
    },
    
    /**
     * Let you know if a value’s suite or a variable is type of Array or not.
     * @function isArray
     * @param   {all}     arg argument of test.
     * @returns {boolean} true if it is, false if it isn’t.
     */
    isArray: function (arg) {

        return (arg instanceof Array);
    },

    /**
     * Let you know if a variable is type of HTMLElement or not.
     * @function isHTMLElement
     * @param   {all}     arg argument of test.
     * @returns {boolean} true if it is, false if it isn’t.
     */
    isHTMLElement: function (arg) {

        return (arg instanceof HTMLElement);
    },

    /**
     * Let you know if a variable is type of HTMLImageElement or not.
     * @function isHTMLImageElement
     * @param   {all}     arg argument of test.
     * @returns {boolean} true if it is, false if it isn’t.
     */
    isHTMLImageElement: function (arg) {

        return (arg instanceof HTMLImageElement);
    },

    /**
     * Let you know if a variable is type of Object or not.
     * @function isObject
     * @param   {all}     arg argument of test.
     * @returns {boolean} true if it is, false if it isn’t.
     */
    isObject: function (arg) {

        return ((typeof arg).toLowerCase() === "object");
    },
    
    /**
     * Let you know if a value or a variable is valid or not.
     * ie: if an object is `null` or `undefined`.
     * @function isSet
     * @param   {all} arg object to evaluate
     * @returns {boolean} true if it is, false if it isn’t.
     */
    isSet: function (arg) {
        
        return ( (arg !== undefined) && (arg != null) ) ; 
    },
    
    /**
     * Let you know if a variable is defined or not.
     * ie: if an object is not `undefined`.
     * @function isDefined
     * @param   {all} arg object to evaluate
     * @returns {boolean} true if it is, false if it isn’t.
     */
    isDefined: function (arg) {
      
        return (arg !== undefined) ;
    },
    
    /**
     * Let you know if a variable is undefined or not.
     * ie: if an object is not defined.
     * @function isUndefined
     * @param   {all} arg object to evaluate
     * @returns {boolean} true if it is, false if it isn’t.
     */
    isUndefined: function (arg) {
      
        return (arg === undefined) ;
    },

    /**
     * Easily create compatible Ajax XMLHttpResquest object, depending of web browsers support.
     * @function newHTTPRequest
     * @returns {XMLHttpRequest} new instance of `XMLHttpRequest` class.
     */
    newHTTPRequest: function () {
        
        var xhr = null ;

        if (window.XMLHttpRequest) {
            
            xhr = new XMLHttpRequest(); //For Chrome, Firefox, Opera and others...
            
            if (xhr.overrideMimeType)
                xhr.overrideMimeType("text/xml"); //Avoid Safari’s bug
        }
        else if (window.ActiveXObject) {
            //For Internet Explorer
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");  
            } catch (e1) {
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");  
                } catch (e2) {
                    console.warn( e1.message );
                    console.warn( e2.message );
                }
            }
        }else {
            console.warn ("Can’t init Ajax functionalities. Maybe it’s your navigator version?");
        }
        
        return xhr;
    },
    
    /**
     * Allow to change images for animations **it’s specialy usefull to simulate a loading**
     * @class
     * @param {Object} imgContainer  is an *id* name of a `HTMLImageElement` or represent a `HTMLImageElement`
     * @param {string} imgDir        is a path where are the images to animate
     * @param {number} imgLength     is the number of images to animate
     * @param {string} imgGlobalName is the global name of images to animate. 
     *                               egg: if *imgload* is your given global name, corresponding images names have to be *imgload0*, *imgload1*, *imgload2*, ...
     * @param {string} imgFormat     the format of images. By default it’s *png*.
     */
    mi_loader: function (imgContainer, imgDir, imgLength, imgGlobalName, imgFormat) {

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

}