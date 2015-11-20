/* "iJS"(pour "inside JS") initiée ici est une mini bibliothèque pour le développement en JavaScript des projets associés. 
 * Le but n’est pas de refaire ce que des grandes bibliothèques telles que **Jquery**, **mootools**, AngularJS** et autres font assez bien, mais de fournir soit des fonctionnalités en plus ou soit une meilleur approche pour une certaine facilité.
 * Cette bibliothèque se veut être legère, indépendante et fonctionnelle. Elle peut donc être utilisable dans n’importe quel projet développé en JavaScript.
 *__________________________________________________________________________________________________________________________________________________________
 */
/*
 * This library is firstly build for UMI web’s projects and for pure JavaScript development.
 * However it can be use for any JavaScript projects.
 * 
 * @license LGPL v2.1 or later
 * @author  [Tindo Ngoufo Arsel](mailto:devtnga@gmail.com)
 * @version 0.99.7_15.11 
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
 * 
 * @namespace iJS
 */

iJS = {
    
    /**
     *@property {string} version Inform about the version of library that is use.
     */
    version: "0.99.7_15.11 ",
    
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
     * Let you know if a variable is type of Element or not.
     * @function isElement
     * @param   {all}     arg argument of test.
     * @returns {boolean} true if it is, false if it isn’t.
     */
    isElement: function (arg) {

        return (arg instanceof Element);
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
     * Let you know if a variable is type of HTMLLinkElement or not.
     * @function isHTMLLinkElement
     * @param   {all}     arg argument of test.
     * @returns {boolean} true if it is, false if it isn’t.
     */
    isHTMLLinkElement: function (arg) {

        return (arg instanceof HTMLLinkElement);
    },

   /**
     * Let you know if a variable is type of HTMLInputElement or not.
     * @function isHTMLInputElement
     * @param   {all}     arg argument of test.
     * @returns {boolean} true if it is, false if it isn’t.
     */
    isHTMLInputElement: function (arg) {

        return (arg instanceof HTMLInputElement);
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
     * clear a string by deleting space at the beginning and at the end.
     * @function stringClear
     * @param   {String} arg a string to clear
     * @returns {String} null or the formatted string
     */
    stringClear: function (arg) {
      
        var str = iJS.isString(arg) ? arg : null ;
        
        if (str) {
            
            var tabChar = str.split('') ;

            for( var i = 0 ; i < tabChar.length && tabChar[i] == ' ' ; i++) {
                
                tabChar.shift() ;
                --i ;
            }
            for( var i = (tabChar.length - 1) ; i >= 0 && tabChar[i] == ' ' ; i--) {
                
                tabChar.pop() ;
            }
            
            str = tabChar.join('') ;
        }

        return str ;
    },

    /**
     * Set the `textContent` of an element without worry about browser’s support.
     * @function setTextContent
     * @param {HTMLElement}   arg  Element to set the text’s content
     * @param {String} text Text that will be used
     */
    setTextContent: function (arg, text) {

        if (iJS.isHTMLElement(arg) && iJS.isDefined(text)) {

            if (arg.textContent) arg.textContent = ''+text ;
            if (arg.innerText) arg.innerText = ''+text ;
        }

    },

    /**
     * Get the `textContent` of an element without worry about browser’s support.
     * @function getTextContent
     * @param   {HTMLElement}   arg  Element to get the text content
     * @returns {String} the text content, empty string if can not be got or `null` if the element is not a *HTMLElement*.
     */
    getTextContent: function (arg) {

       return iJS.isHTMLElement(arg) || iJS.isElement(arg) ? arg.textContent || arg.innerText || '' : null ;
    },

    /**
     * Get the coordonnate of an element relative to document.
     * @function getXY
     * @param   {Object} arg a `HTMLElement` or a `id` of an element
     * @returns {Object} coordonnate `{x:x, y:y}`
     * @example var eltPos = iJS.getXY( HTMLElt ) ;
     *          alert( eltPos.x ) ;
     *          alert( eltPos.y ) ;
     */
    getXY: function (arg) {

        if (iJS.isString(arg)) arg = document.getElementById( arg ) ;
        if (! iJS.isHTMLElement(arg)) return null ;

        var x=0, y=0 ;

        while (iJS.isSet(arg)) {

            x += arg.offsetLeft - arg.scrollLeft ;
            y += arg.offsetTop - arg.scrollTop ;
            arg = arg.offsetParent;
        }

        return {x:x, y:y} ;
    },

    /**
     * Get the coordonnate of an element relative to window.
     * @function getPageXY
     * @param   {Object} arg a `HTMLElement` or a `id` of an element
     * @returns {Object} coordonnate `{x:x, y:y}`
     * @example var eltScrollPos = iJS.getPageXY( HTMLElt ) ;
     *          alert( eltScrollPos.x ) ;
     *          alert( eltScrollPos.y ) ;
     */
    getPageXY : function (arg) {

        if (iJS.isString(arg)) arg = document.getElementById( arg ) ;

        var x=0, y=0 ;

        if ( arg === window || arg === document || arg === document.documentElement ) {

            x = window.pageXOffset ? window.pageXOffset : document.documentElement.scrollLeft ;
            y = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop ;

        } else if (! iJS.isHTMLElement(arg)) {
            return null ;

        } else {

            x = window.pageXOffset ? iJS.getXY( arg ).x - window.pageXOffset : iJS.getXY( arg ).x - document.documentElement.scrollLeft ;
            y = window.pageYOffset ? iJS.getXY( arg ).y - window.pageYOffset : iJS.getXY( arg ).y - document.documentElement.scrollTop ;
        }

        return {x:x, y:y} ;
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
            console.error("iJS:'newHTTPRequest': Can’t init Ajax functionalities. Maybe it’s your browser version?");
        }
        
        return xhr;
    }

};


/* Here is where the animations dependencies are included. 
 * iJS animations features requires **web-animations.js** library.
 * Some browser like *chrome* or webkit's base applications implement it.
 * However, on waiting of its full support, it's more efficient to prevent non full support by directly use the library.
 * Therefore, user who have to use that, do not have to include it again when he use *iJS*.
 _______________________________________________________________________________________________________________________
 */
iJS.Buffer = require('buffer/').Buffer ;
