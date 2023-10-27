function ProjectListFactory() {
    this.load = function loadProjectItems(jsonFile, container) {
        _self = this;
        var xrhFile = new XMLHttpRequest();

        // load content data 
        xrhFile.open("GET", jsonFile);
        xrhFile.onreadystatechange = function () {
            if (xrhFile.readyState === 4) {
                if (xrhFile.status === 200 || xrhFile.status == 0) {
                    _self.createPanels(JSON.parse(JSON.minify(xrhFile.responseText)));
                }
            }
        }

        xrhFile.send();
    }

    this.createPanels = function createPanels(projectsTable) {
        projectsTable.forEach(projectEntry => {
            console.log(projectEntry);
        });
    }
}