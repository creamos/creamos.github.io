function itemTemplate(data) {
    return `
        <article class="item">
        <a onclick="openProjectPanel('${data.path}')" class="image fit"><img src="${data.thumbnail}" alt="" /></a>
        <div class="details">
            <h5 class="topic">${data.topic}</h5>
            <span class="tags">${data.tags}</span>
        </div>
        <header>
            <h3>${data.title}</h3>
            <a href="${data.link}" target="_blank" class="project-link icon brands ${data.link_icon}"></a>
        </header>
        </article>
    `;
}

function projectEntryGenerator() {

    this.run = function findContainersAndPopulate(jsonFile, containerClass) {
        _self = this;
        containers = document.getElementsByClassName(containerClass);

        if (containers.length == 0) console.log("warning: no containers found");
        else _self.load(jsonFile, containers);
    }

    this.load = function loadProjectItems(jsonFile, containers) {
        _self = this;
        var xrhFile = new XMLHttpRequest();

        // load content data 
        xrhFile.open("GET", jsonFile);
        xrhFile.onreadystatechange = function () {
            if (xrhFile.readyState === 4) {
                if (xrhFile.status === 200 || xrhFile.status == 0) {
                    _self.createPanels(JSON.parse(xrhFile.responseText), containers);
                }
            }
        }

        xrhFile.send();
    }

    this.createPanels = function createPanels(projectsTable, containers) {

        for (let index = 0; index < projectsTable.length; index++) {
            const projectEntry = projectsTable[index];
            const container = containers[Math.floor(index*containers.length/projectsTable.length)];

            container.insertAdjacentHTML("beforeend", itemTemplate(projectEntry));
        }

        return projectsTable;
    }
}