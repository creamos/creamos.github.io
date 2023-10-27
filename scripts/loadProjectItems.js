function ProjectListFactory() {
    this.load = function loadProjectItems(jsonFile, container) {
        _self = this;
        var xrhFile = new XMLHttpRequest();

        // load content data 
        xrhFile.open("GET", jsonFile);
        xrhFile.onreadystatechange = function () {
            if (xrhFile.readyState === 4) {
                if (xrhFile.status === 200 || xrhFile.status == 0) {
                    _self.createPanels(JSON.parse(JSON.minify(xrhFile.responseText)), container);
                }
            }
        }

        xrhFile.send();
    }

    this.createPanels = function createPanels(projectsTable, container) {

        function getEntryField(entry, fieldTag) {
            var path = fieldTag.split(".");
            var lastIndex = path.length-1;

            var location = {...entry};
            for (var i = 0; i < lastIndex; i++){
                location = {...location[path[i]]};
            }

            var result = "" + location[path[lastIndex]];
            var detectCommaRegex = new RegExp(",([^ ])", "g");

            return result.replaceAll(detectCommaRegex, ', $1');
        }

        if ("content" in document.createElement("template")) {

            const template = document.querySelector("template#project-item-template").content;


            for (let index = 0; index < projectsTable.length; index++) {
                const projectEntry = projectsTable[index];
                container.appendChild(document.importNode(template, true))
                const entry = container.children[container.children.length-1];

                var fields = entry.getElementsByTagName("*");
                for (var i = 0; i < fields.length; i++) {
                    var field = fields[i];
                    var key = field.getAttribute("entry-tag");
                    if (key != null) {
                        //check if an attribute has to be set instead of the innerHTML
                        var attributeToSet = field.getAttribute("entry-set-attr");
                        if (attributeToSet != null)
                        field.setAttribute(attributeToSet, getEntryField(projectEntry, key));
                        else
                            field.innerHTML = getEntryField(projectEntry, key);
                    }
                }

                entry.classList.add("interest-"+ projectEntry["interest"]);
            }

        }

        return projectsTable;
    }
}