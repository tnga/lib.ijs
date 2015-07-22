/* Le namespace "iJS"(pour "inside JS") initié ici est une mini bibliothèque pour le développement en JavaScript des projets associés. 
 * En effet s'il est une chose que JQuery ne fais pas c'est le respect de la syntaxe JavaScript; ce qui constitue un problème lorsque après avoir appris le JavaScript, 
 *il ne suffit plus seulement de connaître les fonctionnalités qu'apporte JQuery (ce qui se doit normalement d'être suffisant) mais aussi sa syntaxe à elle.
 * "iJS" tout comme "Dojo" s'oriente avant tout dans le respect de la syntaxe; sauf que seules sont récrites les fonctionnalités JS trop verbeux ou difficile d'utilisation.
 *
 * Ce namespace constitue un ensemble de petites fonctionnalités permettant de faciliter le développement en JavaScript.  
 * 
 * @license: GPL v3.0
 * @author : Tindo Ngoufo Arsel
 * @version: 0.0_(15.04) 
 */

var iJS = {

    isNumber: function (arg) {

        if ((typeof arg).toLowerCase() === "number" || arg instanceof Number)
            return true;
        else
            return false;
    },

    isBoolean: function (arg) {

        if ((typeof arg).toLowerCase() === "boolean" || arg instanceof Boolean)
            return true;
        else
            return false;
    },

    isString: function (arg) {

        if ((typeof arg).toLowerCase() === "string" || arg instanceof String)
            return true;
        else
            return false;
    },

    isArray: function (arg) {

        if (arg instanceof Array)
            return true;
        else
            return false;
    },

    isHTMLElement: function (arg) {

        if (arg instanceof HTMLElement)
            return true;
        else
            return false;
    },

    isHTMLImageElement: function (arg) {

        if (arg instanceof HTMLImageElement)
            return true;
        else
            return false;
    },

    isObject: function (arg) {

        if ((typeof arg).toLowerCase() === "object")
            return true;
        else
            return false;
    },

    /* permet de changer les images pour l'animations des chargements (simuler un "loader")
	 *
	 *"imgContainer" représente soit l'id d'un élément "img", soit un élément "img" proprement dit.
	 *"imgDir" représente le chemin du répertoire contenant les images à animer
	 *"imgLength" représente le nombre d'image à animer
	 *"imgGlobalName" représente le nom global des images à animer. En effet les images à animer 
	  doivent être de la forme 'imglaod0.png', 'imglaod1.png', ... où 'imgload' est ici le nom globlal
	 *"imgFormat" est le format des images à animer. Par défaut (ou s'il n'est pas renseigner) c'est 'png'.
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

        this.imgIndex = 0; //représente le numéro de l'image à afficher
        this.imgPath = ""; //représente le chemin vers l'image à afficher
        this.loaderID = 0; //pour contenir le numéro d’identification des événements programés via des fonctions telle que "setTimeout()"

        /* La fonction ci-dessous permet de changer ou remplacer l'image affichée par la suivante.
         * Le paramètre "loader" n'est nécessaire lorsque la fonction est passer en paramètre à une autre. 
         * En effet il fera le plus souvent référence à l'objet lui même (au "this").
         * Sauf que cela ne marche plus pour une utilisation dans une fonction appelée de manière externe à l'objet
         *puis que, en prenant l'exemple de "setInterval" rattachée à l'objet "window" 
         *le "this" fera référence à l'objet "window" et non à l'objet voulu.
         *en ce moment là faudra faire setIinterval( obj.changeIMGLoader, time, obj ); au lieu de setIinterval( obj.changeIMGLoader, time ); 
         *car la déclaration est externe à l’objet "obj" de type "iJS.mi_loager".
         */
        this.changeIMGLoader = function (loader) {

            //ld = loader ou this ( l'objet lui même) 
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

        /*permet de lancer l'animation ( par remplacement successif d'image
         *suivant une intervalle de temps défini par "timeInterval"
         *par défaut l'intervalle de temps est de 150ms
         */
        this.startLoading = function (timeInterval) {

            if (this.loaderID) //alors faut d'abord stopper l'animation encours 
                this.stopLoading();

            if (iJS.isNumber(timeInterval))
                this.loaderID = setInterval(this.changeIMGLoader, timeInterval, this)
            else {
                this.loaderID = setInterval(this.changeIMGLoader, 150, this);
            }

        }

        /*permet de stopper l'animation; soit immédiatement, soit après un un certain temps défini ici par "time"*/
        this.stopLoading = function (time) {
            
            /* @TODO: supprimer le paramètre "loader" et remplacer la variable associée par "this"
             *dans le bloc d’instruction contenu dans la fonction "setTimeout", 
             *de ce fait enlever le "this" comme paramètre à cette fonction.
            */
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