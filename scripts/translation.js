langTables = {};

function Translate() {
    //initialization
    this.init = function (attribute, lng) {
        this.attribute = attribute;
        this.lng = lng;
    }

    //translate 
    this.translateDocument = function () {
        var allDom = document.getElementsByTagName("*");
        for (var i = 0; i < allDom.length; i++) {
            var elem = allDom[i];
            var key = elem.getAttribute(_self.attribute);
            if (key != null) {
                //check if an attribute has to be set instead of the innerHTML
                var attributeToSet = elem.getAttribute("lang-set-attr");
                if (attributeToSet != null)
                    elem.setAttribute(attributeToSet, langTables[this.lng][key]);
                else
                    elem.innerHTML = langTables[this.lng][key];
            }
        }
        document.documentElement.setAttribute("lang", this.lng);
    }

    //fetch lang file if necessary then translate 
    this.process = function () {
        _self = this;
        var xrhFile = new XMLHttpRequest();
        //load content data 
        if (langTables[this.lng] != null) {
            this.translateDocument();
        } else {
            xrhFile.open("GET", "/lang/" + this.lng + ".json");
            xrhFile.onreadystatechange = function () {
                if (xrhFile.readyState === 4) {
                    if (xrhFile.status === 200 || xrhFile.status == 0) {
                        langTables[_self.lng] = JSON.parse(processCommands(JSON.minify(xrhFile.responseText)));
                        _self.translateDocument();
                    }
                }
            }

            xrhFile.send();
        }
    }
}

const regColorTag = new RegExp("\\[color\\:[ ]*#(\\w+)\\]\\(([^\\)]*)\\)", "g");

function processCommands(jsonText) {
    var msg = jsonText;
    msg = msg.replaceAll(regColorTag, '\<span style\=\\\"color: #$1\\\"\>$2\<\/span\>');

    return msg;
}


function translate(lng, tagAttr) {
    var translate = new Translate();
    translate.init(tagAttr, lng);
    translate.process();
}