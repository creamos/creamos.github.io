function fillPanelFromFile(jsonFile) {

    var xrhFile = new XMLHttpRequest();

    // load content data 
    xrhFile.open("GET", jsonFile);
    xrhFile.onreadystatechange = function () {
        if (xrhFile.readyState === 4) {
            if (xrhFile.status === 200 || xrhFile.status == 0) {
                fillPanelFromData(JSON.parse(xrhFile.responseText));
            }
        }
    }

    xrhFile.send();
}


function fillPanelFromData(jsonData) {
    var panel = document.getElementById('project-panel-content');
    
    // Remove previously filled-in elements
    for (let index = 0; index < panel.childNodes.length; ) {
        const childNode = panel.childNodes[index];

        if (childNode.nodeType == Node.ELEMENT_NODE && childNode.nodeName == "HEADER")
            index++
        else
            childNode.remove();
    }

    // set title field
    var title = document.getElementById('project-panel-title');
    title.innerHTML = jsonData.title;
    
    // generate the page content
    const contentData = jsonData.content;
    for (let index = 0; index < contentData.length; index++) {
        const data = contentData[index];
        
        const template = getElementTemplateGenerator (data.type, data.value);
        if (!template || template == '') continue; // in case of invalid content

        panel.insertAdjacentHTML("beforeend", template);
    }
}

function getElementTemplateGenerator(type, dataContent) {
    switch (type) {
        case 'header': return headerElement(dataContent);
        case 'text': return textElement(dataContent);
        case 'space': return spaceElement(dataContent);
        case 'banner': return bannerElement(dataContent);
        case 'left-img': return leftImageElement(dataContent);
        case 'right-img': return rightImageElement(dataContent);
        default: return '';
    }
}

function headerElement(data) {
    return `
        <h4>${data}</h4>
    `;
}

function textElement(data) {
    return `
        <p>${data}</p>
    `;
}

function spaceElement(data) {
    return `
        <div class="spacer"></div>
    `;
}

function bannerElement(data) {
    return `
        <img class="banner" src="${data}" alt="" />
    `;
}

function leftImageElement(data) {
    return `
        <img class="left" src="${data}" alt="" />
    `;
}

function rightImageElement(data) {
    return `
        <img class="right" src="${data}" alt="" />
    `;
}