/* "iJS"(pour "inside JS") initié ici est une mini bibliothèque pour le développement en JavaScript des projets associés. 
 * Le but n’est pas de refaire ce que des grandes bibliothèques telles que **Jquery**, **mootools**, AngularJS** et autres font assez bien, mais de fournir 
 *soit des fonctionnalités en plus ou soit une meilleur approche pour une certaine facilité.
 * Cette bibliothèque se veut être leger, indépendante et fonctionnelle. Elle peut donc être utilisable dans n’importe quel projet développé en JavaScript.
 *__________________________________________________________________________________________________________________________________________________________
 */
/*
 * This library is firstly build with UMI web’s projects and for pure JavaScript development.
 * However it can be use for any JavaScript projects.
 * 
 * @license LGPL v3.0
 * @author  [Tindo Ngoufo Arsel](mailto:devtnga@gmail.com)
 * @version 0.0_15.07 
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
     * Let you know if a variable is type of HTMLLinkElement or not.
     * @function isHTMLLinkElement
     * @param   {all}     arg argument of test.
     * @returns {boolean} true if it is, false if it isn’t.
     */
    isHTMLLinkElement: function (arg) {

        return (arg instanceof HTMLLinkElement);
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
            console.error("iJS:'newHTTPRequest': Can’t init Ajax functionalities. Maybe it’s your browser version?");
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

};



/*=================================================================================================================================================
 * Pure Javascript implementation of Uniforum message translation.
 * This implementation of GNU Gettext, providing internationalization support for javascript. 
 * It differs from existing javascript implementations in that it will support all current Gettext features 
 *(ex. plural and context support), and will also support loading language catalogs from .mo, .po, or preprocessed json files (converter included).
 * It use this [2008 - Javascript Gettext](https://sourceforge.net/projects/jsgettext.berlios/?source=navbar)
 * Thank to [Joshua I. Miller](mailto:unrtst@cpan.org) for that great work.
 *=================================================================================================================================================

-   The following methods are kept in:

  textdomain  (domain)
  gettext     (msgid)
  dgettext    (domainname, msgid)
  dcgettext   (domainname, msgid, LC_MESSAGES)
  ngettext    (msgid, msgid_plural, count)
  dngettext   (domainname, msgid, msgid_plural, count)
  dcngettext  (domainname, msgid, msgid_plural, count, LC_MESSAGES)
  pgettext    (msgctxt, msgid)
  dpgettext   (domainname, msgctxt, msgid)
  dcpgettext  (domainname, msgctxt, msgid, LC_MESSAGES)
  npgettext   (msgctxt, msgid, msgid_plural, count)
  dnpgettext  (domainname, msgctxt, msgid, msgid_plural, count)
  dcnpgettext (domainname, msgctxt, msgid, msgid_plural, count, LC_MESSAGES)
  strargs     (string, args_array)
  
-   The following methods are removed

    get_lang_refs (link)
    isValidOject  ()
    isArray       (Object)
    
-   The following methods are completely rewrote

    new Gettext   ()
    try_load_lang ()
    
-   The following methods are added

    setlocale                 (locale)
    bindtextdomaine           (domain, path_to_locale, type)
    try_load_alternative_lang (domain, link)
    
-   Some other modifications are done for changes and updates

The implementation of this library have been made to be more convenient with GNU Gettext references.
In addition, no only "po" or "mo" files can be use to content the messages data, but also "json" files or objects.

This has been tested on the following browsers. It may work on others, but these are all those to which I have access.
    FF1.5, FF2, FF3, IE6, IE7, Opera9, Opera10, Safari3.1, Chrome
    *FF = Firefox
    *IE = Internet Explorer
    
SEE ALSO
--------
po2json (included),
docs/index.html,
test/
Locale::gettext_pp(3pm), POSIX(3pm), gettext(1), gettext(3)

*/

/**
 * Javascript implemenation of GNU Gettext API.
 * @class
 * @constructs iJS.Gettext
 * @returns {iJS.Gettext}
 * @example
 * //create new instance
 * var igt = new iJS.Gettext() ;
 * //set the locale in which the messages have to be translated.
 * igt.setlocale("fr_FR.utf8") ; // local can also be *fr_FR* or *fr*.
 * //Supposing that most users now have browser that support Ajax;
 * //also add or register a domain where to get the messages data.
 * igt.bindtextdomain("mydomain", "./path_to_locale", "po") ; //"po" can also be "json" or by default "mo".
 * //Always do this after a `setlocale` or a `bindtextdomain` call.
 * igt.try_load_lang() ; //will load and parse messages data from the setting catalog.
 * //Then print your messages
 * alert( igt.gettext("Hello world!") ) ;
 * 
 * //Like with GNU gettext, your domain path have to be
 * // path_to_locale/LC_MESSAGES/fr_FR.utf8/mydomain.po
 * // if "fr_FR.utf8" is not found, "fr_FR" or "fr" will be use for replacement.
 * //This is just an overview. See tutoriels for more.
 * 
 * //Optimum caching way to add domain is to use *<script>* tag to load it via *iJS.Gettext*’s json like file.
 * //just do this to add or register a domain where to get the messages data.
 * igt.locale_data = external_locale_data ;
 * igt.bindtextdomain("json-domain") ; //domain can be any domain in *external_locale_date*
 * /* Supposing that this declaration have be done:`<SCRIPT language="javascript" src="path_to/gettext_json_file"></SCRIPT>`
 *  * and the gettext_json_file content structurate object like:
 *  external_locale_data = {
        "json-domain" : {
            // po header fields
            "" : {
                "plural-forms" : "...",
                "lang" : "en",
                },
            // all the msgid strings and translations
            "msgid" : [ "msgid_plural", "translation", "plural_translation" ],
            "msgctxt\004msgid" : [ null, "msgstr" ],
         },
     "AnotherDomain" : {
         },
    };
  */
iJS.Gettext = function () {
    
    this.domain = 'messages';
    this.domain_registry = [] ; // will content all the indicated domain and associated paths
    // locale_data will be populated when will `try_load_lang`
    this.locale_data = undefined;
    this.locale_format = null; // will indicate how the locale name is formatted
    this.locale = null;

    return this;
}

/**
 * @property {iJS.Gettext} i18n  Defined `Gettext` object, to make *iJS gettext* functionnalities to be directly use.
 * @example 
 * //set the locale in which the messages will be translated
 * iJS.i18n.setlocale("en_US.utf8") ;
 * //add domain where to find messages data
 * iJs.i18n.bindtextdomain("domain_po", "./path_to_locale", "po") ; 
 * //add another domain where to find messages data
 * iJs.i18n.bindtextdomain("domain_json", "./path_to_locale", "json") ;
 * //set the current domain
 * iJS.i18n.textdomain("domain_po") ;
 * //now print your messages
 * alert( iJS.i18n.gettext("messages to be translated") ) ;
 */
iJS.i18n = new iJS.Gettext() ;

/**
 * Easily translate your messages when use `Gettext` functionnalities.<BR/>
 * Same as you call `iJS.i18n.gettext()`. See documentation of associated terms for more informations.
 * @param   {String} msgid  message to be translated
 * @returns {String} translated message if is found or `msgid` if not.
 * @example 
 * //set the locale in which the messages will be translated
 * iJS.i18n.setlocale("en_US.utf8") ;
 * //add domain where to find messages data
 * iJs.i18n.bindtextdomain("domain_po", "./path_to_locale", "po") ; 
 * //now print your messages
 * alert( iJS._("messages to be translated") ) ;
 */
iJS._ = function (msgid) {

    return iJS.i18n.gettext( msgid ) ;
}

/**
 * Set the locale in which the messages have to be translated.
 * @memberof iJS.Gettext
 * @param {String} locale egg: "en", "en_US.utf8", "en_GB" ...
 */
iJS.Gettext.prototype.setlocale = function (locale) {
    
    if (iJS.isString( locale )) {
        
        if (/^.._..\./.test( locale )) {
            this.locale_format = 2 ; //egg: *en_US.utf8*
            
        } else if (/^.._..$/.test( locale )) {
            this.locale_format = 1 ; //egg: *en_US*
            
        } else if (/^..$/.test( locale )) {
            this.locale_format = 0 ; //egg: *en*
            
        } else {
            this.locale_format = -1 ; //egg: *french*
            console.warn("iJS-gettext:'setlocale': It seem like locale: *"+locale+"* do not conform to the **i18n standard format**.") ;
        }
        
        this.locale = locale ;
        //alert(this.locale)
    } else {
        throw new Error("iJS-gettext:'setlocale': Invalid argument: *"+locale+"* have to be a `string`.") ;
    }
};

/**
 * Add or register a domain where to get the messages data
 * @memberof iJS.Gettext
 * @param {string} domain     The Gettext domain, not www.whatev.com. If the .po file was "myapp.po", this would be "myapp".
 * @param {string} localePath Path to the locale directory where to find the domain. <BR/>
 *                            <U>egg:</U> "./locale" in which we can have ".locale/LC_MESSAGES/fr_FR.utf8/domain.po". <BR/>
 *                            If omitted, it will mean that domain will be considered in a json Object or file.
 *                            See tutorials for more explanation.
 * @param {string} dtype      Type of domain file. Supported files are "po", "json" and "mo"(support is planned).
 *                            If omitted, the default value will be "mo".
 */
iJS.Gettext.prototype.bindtextdomain = function (domain, localePath, dtype) {
    
    var new_domain, new_locale_path, new_dtype ;
    
    if (iJS.isString( domain )) {
        new_domain = domain ;
        
    } else {
        throw new Error("iJS-gettext:'bindtextdomain': a *domaine* have to be defined as argument.") ;
    }
    
    if (iJS.isString( dtype )){
        
        if ( dtype == "mo" || dtype == "po" || dtype == "json" ) {
            new_dtype = dtype ;
            
        } else {
            throw new Error("iJS-gettext:'bindtextdomain': type: *"+dtype+"* is not supported. Use *mo*, *po* or *json* files.") ;
        }
    } else {
        new_dtype = "mo" ;
    };
    
    if (iJS.isString( localePath ) ) {
        new_locale_path = localePath ;
        
    } else {
        new_locale_path = "" ;
    }

        
    if ( !iJS.isArray( this.domain_registry ) ) this.domain_registry = [];
    
    if (!this.domain_registry.length) {    //first initialization
        this.domain_registry.push( {value: new_domain, path: new_locale_path, type: new_dtype} ) ;
        
    } else {    //attempt to add new domain or reset if it’s already added. 
        
        var isNewDomaine = true ;
        
        for (var d in this.domain_registry) {
            
            if (this.domain_registry[d].value == new_domain) {
                
                console.warn("iJS-gettext:'bindtextdomain': domaine: *"+new_domain+"* is already added and will just be reset") ;
                this.domain_registry[d].path = new_locale_path ;
                this.domain_registry[d].type = new_dtype ;
                isNewDomaine = false ;
                break;
            }
        }
        
        if (isNewDomaine) this.domain_registry.push( {value: new_domain, path: new_locale_path, type: new_dtype} ) ;
    }
};

/**
 * Use for some concatenation: see for example `iJS.Gettext.prototype.parse_po`.
 * @private
 * @memberof iJS.Gettext
 */
iJS.Gettext.context_glue = "\004" ;
/**
 * json structure of all registered domain with corresponding messages data.
 * It depend of setting locale which define the catalog that will be load.
 * It will also content messages data that are parsed from developer’s defined json'd portable object. 
 * @private
 * @memberof iJS.Gettext
 */
iJS.Gettext._locale_data = {} ;

/**
 * Load and parse all the messages data from domain in the domain’s registry.
 * Data are load depending of the setting catalog or developer’s defined json’d portable object.
 * Parsed data are save in a internal json structure, to make them easily accessible, depending of the current domain.
 * This method have to be always call after a `setlocale` and `bindtextdomain` call.
 * @memberof iJS.Gettext
 */
iJS.Gettext.prototype.try_load_lang = function () {
    
    if (iJS.isSet( this.domain_registry ) && iJS.isSet( this.locale) ) {
        
        //firstly clean the locale data, assuming that it will content new parsed data.
        iJS.Gettext._locale_data = {} ;
        
        // NOTE: there will be a delay here, as this is async.
        // So, any i18n calls made right after page load may not
        // get translated.
        // XXX: we may want to see if we can "fix" this behavior
        var domain = null ,
            link   = null ;
        for (var d in this.domain_registry) {
            
            domain = this.domain_registry[d] ;
            //When get *link.href* it return the absolute path, event if it initially define with *relative path*.
            //That why is more convenient to define *link* as `HTMLlinkElement` than as `string`.
            link = document.createElement("link") ; 
            if (domain.type == 'json') {
                
                link.href = domain.path+"/"+this.locale+"/LC_MESSAGES/"+domain.value+".json" ;
                if (! this.try_load_lang_json(link.href) ) {
                    
                    this.try_load_alternative_lang(domain, link) ;
                }
            } else if (domain.type == 'po') {
                
                link.href = domain.path+"/"+this.locale+"/LC_MESSAGES/"+domain.value+".po" ;
                if (! this.try_load_lang_po(link.href) ) {

                    this.try_load_alternative_lang(domain, link) ;
                }
            } else {
                //if `domain.path` is not define, check to see if language is statically included via  a json object.
                if (domain.path == "") {
                    
                    if (typeof( this.locale_data ) != 'undefined') {
                        // we're going to reformat it, and overwrite the variable
                        var locale_data_copy = this.locale_data ;
                        this.locale_data = undefined ;
                        this.parse_locale_data(locale_data_copy) ;

                        if (typeof( iJS.Gettext._locale_data[domain.value] ) == 'undefined') {
                            console.error("iJS-gettext:'try_load_lang':'locale_data': does not contain the domain '"+domain.value+"'") ;
                        }
                    }
                    
                } else {
                    // TODO: implement the other types (.mo)
                    throw new Error("TODO: link type mo found, and support is planned, but not implemented at this time.") ;
                }
                              
            }
        }
        
    } else {
        console.warn("iJS-gettext:'try_load_lang': Not thing to do. It’s seem like no locale or domain have been register. Use `setlocale` or `bindtextdomain` for that.") ;
    }
};

/**
 * Try to load messages data from alternative catalog when associated catalog of user’s given locale can’t be found. <BR/>
 * for example for a given "en_US.UTF8" locale, if associated catalog can’t be found, this will try to find it with "en_US" or "en".
 * @private
 * @memberof iJS.Gettext
 * @param {Object} domain          from domain’s registry
 * @param {HTMLLinkElement} link   content the catalog’s path
 */
iJS.Gettext.prototype.try_load_alternative_lang = function (domain, link) {
    
    if (iJS.isObject( domain ) && iJS.isHTMLLinkElement( link )) {
        
        var isCatalogOk = false ;
        
        switch (this.locale_format) {

            case 2: //locale name format is something like *en_US.utf8*. will try to use *en_US* or *en* format
                console.warn("iJS-gettext:'try_load_lang': domaine: *"+domain.value+"* not found with locale: *"+this.locale+"* format. Will try to use *"+this.locale.split('.')[0]+"* format...") ;
                link.href = domain.path+"/"+this.locale.split('.')[0]+"/LC_MESSAGES/"+domain.value+"."+domain.type ;
                
                if (domain.type == "json")
                    isCatalogOk = (this.try_load_lang_json( link.href )) ? true : false ;
                else if (domain.type == "po")
                    isCatalogOk = (this.try_load_lang_po( link.href )) ? true : false ;
                //else
                    //@TODO it will be by default "mo", not supported yet but it’s plan.

                if (! isCatalogOk) {

                    console.warn("iJS-gettext:'try_load_lang': domaine: *"+domain.value+"* not found with locale: *"+this.locale.split('.')[0]+"* format. Will try to use *"+this.locale.split('_')[0]+"* format...") ;
                    link.href = domain.path+"/"+this.locale.split('_')[0]+"/LC_MESSAGES/"+domain.value+"."+domain.type ;

                    if (domain.type == "json")
                        isCatalogOk = (this.try_load_lang_json( link.href )) ? true : false ;
                    else if (domain.type == "po")
                        isCatalogOk = (this.try_load_lang_po( link.href )) ? true : false ;
                    //else
                        //@TODO it will be by default "mo", not supported yet but it’s plan.
                        
                    if (! isCatalogOk) {

                        link.href = domain.path+"/"+this.locale+"/LC_MESSAGES/"+domain.value+"."+domain.type;
                        console.warn("iJS-gettext:'try_load_lang_"+domain.type+"': failed. Unable to exec XMLHttpRequest for link ["+link.href+"]") ;
                    }
                }
                break;
                
            case 1://locale name format is something like *en_US*. will try to use *en* format
                console.warn("iJS-gettext:'try_load_lang': domaine: *"+domain.value+"* not found with locale: *"+this.locale+"* format. Will try to use *"+this.locale.split('_')[0]+"* format...") ;
                link.href = domain.path+"/"+this.locale.split('_')[0]+"/LC_MESSAGES/"+domain.value+"."+domain.type ;

                if (domain.type == "json")
                    isCatalogOk = (this.try_load_lang_json( link.href )) ? true : false ;
                else if (domain.type == "po")
                    isCatalogOk = (this.try_load_lang_po( link.href )) ? true : false ;
                //else
                    //@TODO it will be by default "mo", not supported yet but it’s plan.

                if (! isCatalogOk) {

                    link.href = domain.path+"/"+this.locale+"/LC_MESSAGES/"+domain.value+"."+domain.type;
                        console.error("iJS-gettext:'try_load_lang_"+domain.type+"': failed. Unable to exec XMLHttpRequest for link ["+link.href+"]") ;
                }
                break;

            default:
                console.error("iJS-gettext:'try_load_lang_"+domain.type+"': failed. Unable to exec XMLHttpRequest for link ["+link.href+"]") ;
                break;
        }
    } else {
        
        console.warn("iJS-gettext:'try_load_alternative_lang': nothing to do or invalid arguments.") ;
    }
    
};

/**
 * This takes a json’d data (a portable object variant) and moves it into an internal form, 
 * for use in our lib, and puts it in our object as: 
 * <PRE><CODE>
   iJS.Gettext._locale_data = {
          domain : {
              head : { headfield : headvalue },
              msgs : {
                  msgid : [ msgid_plural, msgstr, msgstr_plural ],
              },
            ...
   </CODE></PRE>
 * The json’d data have to respect the library specifications for that. 
 * For details see the script **po2json** in the associated binary directory.
 * Also see tutorials for more explanations.
 * @private
 * @memberof iJS.Gettext
 * @param   {Object} locale_data json *portable object*
 * @returns {Object}   [[Description]]
 */
iJS.Gettext.prototype.parse_locale_data = function (locale_data) {
    
    if (typeof( iJS.Gettext._locale_data ) == 'undefined') {
        iJS.Gettext._locale_data = {};
    }

    // suck in every domain defined in the supplied data
    for (var domain in locale_data) {
        // skip empty specs (flexibly)
        if ((! locale_data.hasOwnProperty(domain)) || (! iJS.isSet(locale_data[domain])))
            continue;
        // skip if it has no msgid's
        var has_msgids = false;
        for (var msgid in locale_data[domain]) {
            has_msgids = true;
            break;
        }
        if (! has_msgids) continue;

        // grab shortcut to data
        var data = locale_data[domain];

        // if they specifcy a blank domain, default to "messages"
        if (domain == "") domain = "messages";
        // init the data structure
        if (! iJS.isSet( iJS.Gettext._locale_data[domain]) )
            iJS.Gettext._locale_data[domain] = { };
        if (! iJS.isSet( iJS.Gettext._locale_data[domain].head) )
            iJS.Gettext._locale_data[domain].head = { };
        if (! iJS.isSet( iJS.Gettext._locale_data[domain].msgs) )
            iJS.Gettext._locale_data[domain].msgs = { };

        for (var key in data) {
            if (key == "") {
                var header = data[key];
                for (var head in header) {
                    var h = head.toLowerCase();
                    iJS.Gettext._locale_data[domain].head[h] = header[head];
                }
            } else {
                iJS.Gettext._locale_data[domain].msgs[key] = data[key];
            }
        }
    }

    // build the plural forms function
    for (var domain in iJS.Gettext._locale_data) {
        
        if (iJS.isSet( iJS.Gettext._locale_data[domain].head['plural-forms'] ) &&
            typeof( iJS.Gettext._locale_data[domain].head.plural_func ) == 'undefined') {
            // untaint data
            var plural_forms = iJS.Gettext._locale_data[domain].head['plural-forms'];
            var pf_re = new RegExp('^(\\s*nplurals\\s*=\\s*[0-9]+\\s*;\\s*plural\\s*=\\s*(?:\\s|[-\\?\\|&=!<>+*/%:;a-zA-Z0-9_\(\)])+)', 'm');
            if (pf_re.test(plural_forms)) {
                //ex english: "Plural-Forms: nplurals=2; plural=(n != 1);\n"
                //pf = "nplurals=2; plural=(n != 1);";
                //ex russian: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10< =4 && (n%100<10 or n%100>=20) ? 1 : 2)
                //pf = "nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)";

                var pf = iJS.Gettext._locale_data[domain].head['plural-forms'];
                if (! /;\s*$/.test(pf)) pf = pf.concat(';');
                /* We used to use eval, but it seems IE has issues with it.
                 * We now use "new Function", though it carries a slightly
                 * bigger performance hit.
                var code = 'function (n) { var plural; var nplurals; '+pf+' return { "nplural" : nplurals, "plural" : (plural === true ? 1 : plural ? plural : 0) }; };';
                iJS.Gettext._locale_data[domain].head.plural_func = eval("("+code+")");
                */
                var code = 'var plural; var nplurals; '+pf+' return { "nplural" : nplurals, "plural" : (plural === true ? 1 : plural ? plural : 0) };';
                iJS.Gettext._locale_data[domain].head.plural_func = new Function("n", code);
                
            } else {
                throw new Error("iJS-gettext:'parse_locale_data': Syntax error in language file. Plural-Forms header is invalid ["+plural_forms+"]");
            }   

            // default to english plural form
        } else if (typeof( iJS.Gettext._locale_data[domain].head.plural_func ) == 'undefined') {
            iJS.Gettext._locale_data[domain].head.plural_func = function (n) {
                var p = (n != 1) ? 1 : 0;
                return { 'nplural' : 2, 'plural' : p };
            };
        } // else, plural_func already created
    }

    return;
};


/**
 * Do an ajax call to load in a .po files, language definitions from associated catalog.
 * @private
 * @memberof iJS.Gettext
 * @param   {string} uri link to the "po" files
 * @returns {number} *1* if the operation is a success, *undefined* if not.
 */
iJS.Gettext.prototype.try_load_lang_po = function (uri) {
    
    var data = this.sjax(uri);
    if (! data) return;
    var domain = this.uri_basename(uri);
    var parsed = this.parse_po(data);

    var rv = {};
    // munge domain into/outof header
    if (parsed) {
        if (! parsed[""]) parsed[""] = {};
        if (! parsed[""]["domain"]) parsed[""]["domain"] = domain;
        domain = parsed[""]["domain"];
        rv[domain] = parsed;

        this.parse_locale_data(rv);
    }

    return 1;
};

/**
 * Get the base name of an url.
 * Needed for know in which domain are loaded the messages data.
 * Url’s base name will be considered as domain.
 * @private
 * @memberof iJS.Gettext
 * @param   {string} uri an url
 * @returns {string} the base name of the given url.
 */
iJS.Gettext.prototype.uri_basename = function (uri) {
    
    var rv;
    if (rv = uri.match(/^(.*\/)?(.*)/)) {
        var ext_strip;
        if (ext_strip = rv[2].match(/^(.*)\..+$/))
            return ext_strip[1];
        else
            return rv[2];
    } else {
        return "";
    }
};

/**
 * Parse po data in a json structure. 
 * (like the library associated **po2json** perl script). 
 * @private
 * @memberof iJS.Gettext
 * @param   {String}   data a portable object content
 * @returns {Object} a json parsed data
 */
iJS.Gettext.prototype.parse_po = function (data) {
    
    var rv = {};
    var buffer = {};
    var lastbuffer = "";
    var errors = [];
    var lines = data.split("\n");
    
    for (var i=0; i<lines.length; i++) {
        // chomp
        lines[i] = lines[i].replace(/(\n|\r)+$/, '');

        var match;
        // Empty line / End of an entry.
        if (/^$/.test(lines[i])) {
            if (typeof( buffer['msgid'] ) != 'undefined') {
                var msg_ctxt_id = (typeof( buffer['msgctxt'] ) != 'undefined' &&
                                   buffer['msgctxt'].length) ?
                    buffer['msgctxt']+iJS.Gettext.context_glue+buffer['msgid'] :
                buffer['msgid'];
                var msgid_plural = (typeof( buffer['msgid_plural'] ) != 'undefined' &&
                                    buffer['msgid_plural'].length) ?
                    buffer['msgid_plural'] :
                null;

                // find msgstr_* translations and push them on
                var trans = [];
                for (var str in buffer) {
                    var match;
                    if (match = str.match(/^msgstr_(\d+)/))
                        trans[parseInt(match[1])] = buffer[str];
                }
                trans.unshift(msgid_plural);

                // only add it if we've got a translation
                // NOTE: this doesn't conform to msgfmt specs
                if (trans.length > 1) rv[msg_ctxt_id] = trans;

                buffer = {};
                lastbuffer = "";
            }

            // comments
        } else if (/^#/.test(lines[i])) {
            continue;

            // msgctxt
        } else if (match = lines[i].match(/^msgctxt\s+(.*)/)) {
            lastbuffer = 'msgctxt';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

            // msgid
        } else if (match = lines[i].match(/^msgid\s+(.*)/)) {
            lastbuffer = 'msgid';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

            // msgid_plural
        } else if (match = lines[i].match(/^msgid_plural\s+(.*)/)) {
            lastbuffer = 'msgid_plural';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

            // msgstr
        } else if (match = lines[i].match(/^msgstr\s+(.*)/)) {
            lastbuffer = 'msgstr_0';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

            // msgstr[0] (treak like msgstr)
        } else if (match = lines[i].match(/^msgstr\[0\]\s+(.*)/)) {
            lastbuffer = 'msgstr_0';
            buffer[lastbuffer] = this.parse_po_dequote(match[1]);

            // msgstr[n]
        } else if (match = lines[i].match(/^msgstr\[(\d+)\]\s+(.*)/)) {
            lastbuffer = 'msgstr_'+match[1];
            buffer[lastbuffer] = this.parse_po_dequote(match[2]);

            // continued string
        } else if (/^"/.test(lines[i])) {
            buffer[lastbuffer] += this.parse_po_dequote(lines[i]);

            // something strange
        } else {
            errors.push("Strange line ["+i+"] : "+lines[i]);
        }
    }

    // handle the final entry
    if (typeof( buffer['msgid'] ) != 'undefined') {
        
        var msg_ctxt_id = (typeof( buffer['msgctxt'] ) != 'undefined' && buffer['msgctxt'].length) ?
                        buffer['msgctxt']+iJS.Gettext.context_glue+buffer['msgid'] : buffer['msgid'];
        var msgid_plural = (typeof( buffer['msgid_plural'] ) != 'undefined' &&
                            buffer['msgid_plural'].length) ? buffer['msgid_plural'] : null;

        // find msgstr_* translations and push them on
        var trans = [];
        for (var str in buffer) {
            var match;
            if (match = str.match(/^msgstr_(\d+)/))
                trans[parseInt(match[1])] = buffer[str];
        }
        trans.unshift(msgid_plural);

        // only add it if we've got a translation
        // NOTE: this doesn't conform to msgfmt specs
        if (trans.length > 1) rv[msg_ctxt_id] = trans;

        buffer = {};
        lastbuffer = "";
    }

    // parse out the header
    if (rv[""] && rv[""][1]) {
        var cur = {};
        var hlines = rv[""][1].split(/\\n/);
        for (var i=0; i<hlines.length; i++) {
            if (! hlines.length) continue;

            var pos = hlines[i].indexOf(':', 0);
            if (pos != -1) {
                var key = hlines[i].substring(0, pos);
                var val = hlines[i].substring(pos +1);
                var keylow = key.toLowerCase();

                if (cur[keylow] && cur[keylow].length) {
                    errors.push("SKIPPING DUPLICATE HEADER LINE: "+hlines[i]);
                } else if (/#-#-#-#-#/.test(keylow)) {
                    errors.push("SKIPPING ERROR MARKER IN HEADER: "+hlines[i]);
                } else {
                    // remove begining spaces if any
                    val = val.replace(/^\s+/, '');
                    cur[keylow] = val;
                }

            } else {
                errors.push("PROBLEM LINE IN HEADER: "+hlines[i]);
                cur[hlines[i]] = '';
            }
        }

        // replace header string with assoc array
        rv[""] = cur;
    } else {
        rv[""] = {};
    }

    // TODO: XXX: if there are errors parsing, what do we want to do?
    // GNU iJS.Gettext silently ignores errors. So will we.
    // alert( "Errors parsing po file:\n" + errors.join("\n") );

    return rv;
};

/**
 * Unscaled all embedded quotes in a string. Useful when parsing a po messages data.
 * @private
 * @memberof iJS.Gettext
 * @param   {String}   str string to analyse
 * @returns {String} formated string
 */
iJS.Gettext.prototype.parse_po_dequote = function (str) {
    
    var match;
    if (match = str.match(/^"(.*)"/)) {
        str = match[1];
    }
    // unescale all embedded quotes (fixes bug #17504)
    str = str.replace(/\\"/g, "\"");
    return str;
};


/**
 * Do an ajax call to load in a .json files, language definitions from associated catalog.
 * @private
 * @memberof iJS.Gettext
 * @param   {string} uri link to the "json" files
 * @returns {number} *1* if the operation is a success, *undefined* if not.
 */
iJS.Gettext.prototype.try_load_lang_json = function (uri) {
    
    var data = this.sjax(uri);
    if (! data) return;

    var rv = this.JSON(data);
    this.parse_locale_data(rv);

    return 1;
};

/**
 * Set domain for future `gettext()` calls. <BR/>
 * If the given domain is not NULL, the current message domain is set to it; 
 * else the function returns the current message domain. <BR/>
 * A  message  domain  is  a  set of translatable msgid messages. Usually,
 * every software package has its own message domain. The domain  name  is
 * used to determine the message catalog where a translation is looked up;
 * it must be a non-empty string.
 * @memberof iJS.Gettext
 * @param   {string} domain  message domain to set as current.
 * @returns {string} current message domain.
 */
iJS.Gettext.prototype.textdomain = function (domain) {
    
    if (domain && domain.length) this.domain = domain;
    return this.domain;
}


/**
 * Returns the translation for **msgid**.<BR/>
 * If translation can’t be found, the unmodified **msgid** is returned.
 * @memberof iJS.Gettext
 * @param   {String} msgid  Message to translate
 * @returns {String} translated text or the *msgid* if not found
 */
iJS.Gettext.prototype.gettext = function (msgid) {
    
    var msgctxt;
    var msgid_plural;
    var n;
    var category;
    return this.dcnpgettext(null, msgctxt, msgid, msgid_plural, n, category);
};


/**
 * Like `gettext()`, but retrieves the message for the specified 
 * **TEXTDOMAIN** instead of the default domain.
 * @memberof iJS.Gettext
 * @param   {String} domain  Domain where translation can be found.
 * @param   {String} msgid   Message to translate
 * @returns {String} translated text or the *msgid* if not found
 */
iJS.Gettext.prototype.dgettext = function (domain, msgid) {
    
    var msgctxt;
    var msgid_plural;
    var n;
    var category;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

/**
 * Like `dgettext()` but retrieves the message from the specified **CATEGORY**
 * instead of the default category "LC_MESSAGES". <BR/>
 * <U>NOTE:</U> the categories are really useless in javascript context. This is
 * here for GNU Gettext API compatibility. In practice, you'll never need
 * to use this. This applies to all the calls including the **CATEGORY**.
 * @memberof iJS.Gettext
 * @param   {String} domain      Domain where translation can be found.
 * @param   {String} msgid       Message to translate
 * @param   {String} category    (for now is will always be "LC_MESSAGES")
 * @returns {String} translated  text or the *msgid* if not found
 */
iJS.Gettext.prototype.dcgettext = function (domain, msgid, category) {
    
    var msgctxt;
    var msgid_plural;
    var n;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};


/**
 * Retrieves the correct translation for **count** items.
 * @memberof iJS.Gettext
 * @param   {String} msgid        Message to translate
 * @param   {String} msgid_plural Plural form of text to translate
 * @param   {Number} n            Counting number
 * @returns {String} translated text or the *msgid* if not found
 * @example
 * //In legacy software you will often find something like:
 * alert( count + " file(s) deleted.\n" );
 * //Before ngettext() was introduced, one of best practice for internationalized programs was:
    if (count == 1)
        alert( iJS._("One file deleted.\n") );
    else ...
    
   //This is a nuisance for the programmer and often still not sufficient for an adequate translation.  
   //Many languages have completely different ideas on numerals.  Some (French, Italian, ...) treat 0 and 1 alike,
   //others make no distinction at all (Japanese, Korean, Chinese, ...), others have two or more plural forms (Russian, 
   //Latvian, Czech, Polish, ...).  The solution is:
   
    alert( iJS.i18n.ngettext("One file deleted.\n", "%d files deleted.\n", count) );
 */
iJS.Gettext.prototype.ngettext = function (msgid, msgid_plural, n) {
    
    var msgctxt;
    var category;
    return this.dcnpgettext(null, msgctxt, msgid, msgid_plural, n, category);
};

/**
 * Like `ngettext()` but retrieves the translation from the specified
 * textdomain instead of the default domain.
 * @memberof iJS.Gettext
 * @param   {String} domain       Domain where translation can be found.
 * @param   {String} msgid        Message to translate
 * @param   {String} msgid_plural Plural form of text to translate
 * @param   {Number} n            Counting number
 * @returns {String} translated text or the *msgid* if not found
 */
iJS.Gettext.prototype.dngettext = function (domain, msgid, msgid_plural, n) {
    
    var msgctxt;
    var category;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

/**
 * Like `dngettext()` but retrieves the translation from the specified
 * category, instead of the default category **LC_MESSAGES**.
 * @memberof iJS.Gettext
 * @param   {String} domain       Domain where translation can be found.
 * @param   {String} msgid        Message to translate
 * @param   {String} msgid_plural Plural form of text to translate
 * @param   {Number} n            Counting number
 * @param   {String} category    (for now is will always be "LC_MESSAGES")
 * @returns {String} translated text or the *msgid* if not found
 */
iJS.Gettext.prototype.dcngettext = function (domain, msgid, msgid_plural, n, category) {
    
    var msgctxt;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category, category);
};

/**
 * Returns the translation of **msgid**, given the context of **msgctxt**.<BR/>
 * Both items are used as a unique key into the message catalog.
 * This allows the translator to have two entries for words that may
 * translate to different foreign words based on their context.
 * @memberof iJS.Gettext
 * @param   {String} msgctxt  context of text
 * @param   {String} msgid    Message to translate
 * @returns {String} translated text or the *msgid* if not found
 * @example 
 * // The word "View" may be a noun or a verb, which may be
 * //used in a menu as File->View or View->Source.

    alert( iJS.i18n.pgettext( "Verb: To View", "View" ) );
    alert( iJS.i18n.pgettext( "Noun: A View", "View"  ) );
 * // The above will both lookup different entries in the message catalog.
 */
iJS.Gettext.prototype.pgettext = function (msgctxt, msgid) {
    
    var msgid_plural;
    var n;
    var category;
    return this.dcnpgettext(null, msgctxt, msgid, msgid_plural, n, category);
};

/**
 * Like `pgettext()`, but retrieves the message for the specified 
 * **domain** instead of the default domain.
 * @memberof iJS.Gettext
 * @param   {String} domain   Domain where translation can be found.
 * @param   {String} msgctxt  Context of text
 * @param   {String} msgid    Message to translate
 * @returns {String} translated text or the *msgid* if not found
 */
iJS.Gettext.prototype.dpgettext = function (domain, msgctxt, msgid) {
    
    var msgid_plural;
    var n;
    var category;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};

/**
 * Like `dpgettext()` but retrieves the message from the specified **category**
 * instead of the default category **LC_MESSAGES**.
 * @memberof iJS.Gettext
 * @param   {String} domain   Domain where translation can be found.
 * @param   {String} msgctxt  Context of text
 * @param   {String} msgid    Message to translate
 * @param   {String} category (for now is will always be "LC_MESSAGES")
 * @returns {String} translated text or the *msgid* if not found
 */
iJS.Gettext.prototype.dcpgettext = function (domain, msgctxt, msgid, category) {
    
    var msgid_plural;
    var n;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};


/**
 * Like `ngettext()` with the addition of context as in `pgettext()`. <BR/>
 * In English, or if no translation can be found, the second argument
 * *msgid* is picked if *n* is one, the third one otherwise.
 * @memberof iJS.Gettext
 * @param   {String} msgctxt      Context of text
 * @param   {String} msgid        Message to translate
 * @param   {String} msgid_plural Plural form of text to translate
 * @param   {Number} n            Counting number
 * @returns {String} translated text or the *msgid* if not found
 */
iJS.Gettext.prototype.npgettext = function (msgctxt, msgid, msgid_plural, n) {
    
    var category;
    return this.dcnpgettext(null, msgctxt, msgid, msgid_plural, n, category);
};

/**
 * Like `npgettext()` but retrieves the translation from the specified
 * textdomain instead of the default domain.
 * @memberof iJS.Gettext
 * @param   {String} domain       Domain where translation can be found.
 * @param   {String} msgctxt      Context of text
 * @param   {String} msgid        Message to translate
 * @param   {String} msgid_plural Plural form of text to translate
 * @param   {Number} n            Counting number
 * @returns {String} translated text or the *msgid* if not found
 */
iJS.Gettext.prototype.dnpgettext = function (domain, msgctxt, msgid, msgid_plural, n) {
    
    var category;
    return this.dcnpgettext(domain, msgctxt, msgid, msgid_plural, n, category);
};


// this has all the options, so we use it for all of previous `gettext()`.
/**
 * Like `dnpgettext()` but retrieves the translation from the specified
 * category, instead of the default category **LC_MESSAGES**.
 * @memberof iJS.Gettext
 * @param   {String} domain       Domain where translation can be found.
 * @param   {String} msgctxt      Context of text
 * @param   {String} msgid        Message to translate
 * @param   {String} msgid_plural Plural form of text to translate
 * @param   {Number} n    
 * @param   {String} category (for now is will always be "LC_MESSAGES")
 * @returns {String} translated text or the *msgid* if not found
 */
iJS.Gettext.prototype.dcnpgettext = function (domain, msgctxt, msgid, msgid_plural, n, category) {
    
    if (! iJS.isSet(msgid)) return '';

    var plural = iJS.isSet(msgid_plural);
    var msg_ctxt_id = iJS.isSet(msgctxt) ? msgctxt+iJS.Gettext.context_glue+msgid : msgid;

    var domainname = iJS.isSet(domain) ? domain : iJS.isSet(this.domain) ? this.domain : 'messages';

    // category is always LC_MESSAGES. We ignore all else
    var category_name = 'LC_MESSAGES';
    var category = 5;

    var locale_data = new Array();
    if (typeof( iJS.Gettext._locale_data ) != 'undefined' &&
        iJS.isSet( iJS.Gettext._locale_data[domainname]) ) {
        locale_data.push( iJS.Gettext._locale_data[domainname] );

    } else if (typeof( iJS.Gettext._locale_data ) != 'undefined') {
        // didn't find domain we're looking for. Search all of them.
        for (var dom in iJS.Gettext._locale_data) {
            locale_data.push( iJS.Gettext._locale_data[dom] );
        }
    }

    var trans = [];
    var found = false;
    var domain_used; // so we can find plural-forms if needed
    if (locale_data.length) {
        for (var i=0; i<locale_data.length; i++) {
            var locale = locale_data[i];
            if (iJS.isSet(locale.msgs[msg_ctxt_id])) {
                // make copy of that array (cause we'll be destructive)
                for (var j=0; j<locale.msgs[msg_ctxt_id].length; j++) {
                    trans[j] = locale.msgs[msg_ctxt_id][j];
                }
                trans.shift(); // throw away the msgid_plural
                domain_used = locale;
                found = true;
                // only break if found translation actually has a translation.
                if ( trans.length > 0 && trans[0].length != 0 )
                    break;
            }
        }
    }

    // default to english if we lack a match, or match has zero length
    if ( trans.length == 0 || trans[0].length == 0 ) {
        trans = [ msgid, msgid_plural ];
    }

    var translation = trans[0];
    if (plural) {
        var p;
        if (found && iJS.isSet(domain_used.head.plural_func) ) {
            var rv = domain_used.head.plural_func(n);
            if (! rv.plural) rv.plural = 0;
            if (! rv.nplural) rv.nplural = 0;
            // if plurals returned is out of bound for total plural forms
            if (rv.nplural <= rv.plural) rv.plural = 0;
            p = rv.plural;
        } else {
            p = (n != 1) ? 1 : 0;
        }
        if (iJS.isSet(trans[p]))
            translation = trans[p];
    }

    return translation;
};


/**
 * This is a utility method to provide some way to support positional parameters within a string, as javascript lacks a printf() method.
 * The format is similar to printf(), but greatly simplified (ie. fewer features).<BR/>
 * Any percent signs followed by numbers are replaced with the corresponding item from the argument’s array.
 * @class
 * @constructs Strargs
 * @memberof iJS.Gettext
 * @param   {String} str  a string that potentially contains formatting characters
 * @param   {Array} args  an array of positional replacement values
 * @returns {String} The formatted text.
 * @example
 * iJS.i18n.setlocale("fr_FR.UTF8") ;
 * iJS.i18n.bindtextdomain("fr_FR.UTF8") ;
 * iJS.i18n.try_load_lang() ;
 * //One common mistake is to interpolate a variable into the string like this:
 * var translated = iJS._("Hello " + full_name); //`iJS._()` can be replace by `iJS.i18n.gettext()`
   
 * //The interpolation will happen before it's passed to gettext, and it's 
 * //unlikely you'll have a translation for every "Hello Tom" and "Hello Dick"
 * //and "Hellow Harry" that may arise.

 * //Use `strargs()` (see below) to solve this problem:

 * var translated = iJS.Gettext.strargs( iJS._("Hello %1"), [full_name] );

 /* This is espeically useful when multiple replacements are needed, as they 
  * may not appear in the same order within the translation. As an English to
  * French example:

  * Expected result: "This is the red ball"
  * English: "This is the %1 %2"
  * French:  "C'est le %2 %1"
  * Code: iJS.Gettext.strargs( iJS._("This is the %1 %2"), ["red", "ball"] );

  * (The example show thing that not have to be done because neither color nor text 
  * will get translated here ...).
  
 */
iJS.Gettext.strargs = function (str, args) {
    
    // make sure args is an array
    if ( null == args || 'undefined' == typeof(args) ) {
        args = [];
    } else if (args.constructor != Array) {
        args = [args];
    }

    // NOTE: javascript lacks support for zero length negative look-behind
    // in regex, so we must step through w/ index.
    // The perl equiv would simply be:
    //    $string =~ s/(?<!\%)\%([0-9]+)/$args[$1]/g;
    //    $string =~ s/\%\%/\%/g; # restore escaped percent signs

    var newstr = "";
    while (true) {
        var i = str.indexOf('%');
        var match_n;

        // no more found. Append whatever remains
        if (i == -1) {
            newstr += str;
            break;
        }

        // we found it, append everything up to that
        newstr += str.substr(0, i);

        // check for escpaed %%
        if (str.substr(i, 2) == '%%') {
            newstr += '%';
            str = str.substr((i+2));

            // % followed by number
        } else if ( match_n = str.substr(i).match(/^%(\d+)/) ) {
            var arg_n = parseInt(match_n[1]);
            var length_n = match_n[1].length;
            if ( arg_n > 0 && args[arg_n -1] != null && typeof(args[arg_n -1]) != 'undefined' )
                newstr += args[arg_n -1];
            str = str.substr( (i + 1 + length_n) );

            // % followed by some other garbage - just remove the %
        } else {
            newstr += '%';
            str = str.substr((i+1));
        }
    }

    return newstr;
}


/**
 * instance method wrapper of strargs
 * @memberof iJS.Gettext
 * @param   {String} str  a string that potentially contains formatting characters
 * @param   {Array} args  an array of positional replacement values
 * @returns {String} The formatted text.
 */
iJS.Gettext.prototype.strargs = function (str, args) {
    
    return iJS.Gettext.strargs(str, args);
}

/**
 * Synchronously get a response text via an ajax call to a file’s url.
 * @private
 * @memberof iJS.Gettext
 * @param   {String} uri file url
 * @returns {String} a response text if succeed or *"undefined"* if not.
 */
iJS.Gettext.prototype.sjax = function (uri) {
    
    var xmlhttp = iJS.newHTTPRequest() ;
        
    if (! xmlhttp) {
        console.error("iJS-gettext:'sjax': Your browser doesn't do Ajax. Unable to support external language files.");
        
    } else {
        
        xmlhttp.open('GET', uri, false);
        try { xmlhttp.send(null); }
        catch (e) { return; }

        // we consider status 200 and 0 as ok.
        // 0 happens when we request local file, allowing this to run on local files
        var sjax_status = xmlhttp.status;
        if (sjax_status == 200 || sjax_status == 0) {
            return xmlhttp.responseText;
        } else {
            var error = xmlhttp.statusText + " (Error " + xmlhttp.status + ")";
            if (xmlhttp.responseText.length) {
                error += "\n" + xmlhttp.responseText;
            }
            console.error( error );
            return;
        }
    }

}

/**
 * Evaluate A string representing a JavaScript expression, statement, or sequence of statements. 
 * @private
 * @param   {String} data  JavaScript expression
 * @returns {Object} [[Description]]
 */
iJS.Gettext.prototype.JSON = function (data) {
    return eval('(' + data + ')');
}
