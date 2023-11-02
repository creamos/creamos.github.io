function openProjectPanel(jsonFile) {
    
    fillPanelFromFile(jsonFile);
    document.getElementById('project-panel-wrapper').classList.toggle("active", true);
}

function closeProjectPanel() {

    document.getElementById('project-panel-wrapper').classList.toggle("active", false);
    emptyPanelContent();
}

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

function emptyPanelContent() {
    var panel = document.getElementById('project-panel-content');
    for (let index = 0; index < panel.childNodes.length; ) {
        const childNode = panel.childNodes[index];
        
        // look for nodes that must be kept
        if (childNode.nodeType == Node.ELEMENT_NODE) {

            var nodeID = (Element(childNode)).getAttribute('id');
            if (nodeID == "project-content-header" || nodeID == "project-external-link") {
                index++
                continue;
            }
        }
        
        // if the node doestn't match
        childNode.remove();

        // if (childNode.nodeType == Node.ELEMENT_NODE && childNode.nodeName == "HEADER"||
        // childNode.elemenel)
        //     index++
        // else
            
    }
}

function fillPanelFromData(jsonData) {

    // Remove previously filled-in elements
    emptyPanelContent();

    // set title field
    var title = document.getElementById('project-panel-title');
    title.innerHTML = jsonData.title;

    // set external link
    var externalLink = document.getElementById('project-external-link').getElementsByTagName('a')[0];
    externalLink.setAttribute("href", jsonData.link);
    
    // generate the page content
    var panel = document.getElementById('project-panel-content');
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
        case 'center-img': return centerImageElement(dataContent);
        case 'video': return videoElement(dataContent);
        case 'cleaner': return cleanerElement(dataContent);
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
    <a class="img banner" href="${data}" target="_blank">
        <img src="${data}" alt="" />
    </a>
    `;
}

function leftImageElement(data) {
    return `
        <a class="img left" href="${data}" target="_blank">
            <img src="${data}" alt="" />
        </a>
    `;
}

function rightImageElement(data) {
    return `
        <a class="img right" href="${data}" target="_blank">
            <img src="${data}" alt="" />
        </a>
    `;
}

function centerImageElement(data) {
    return `
        <a class="img center" href="${data}" target="_blank">
            <img src="${data}" alt="" />
        </a>
    `;
}

function videoElement(data) {
    return `
        <video controls width="${data.width}">
            <source src="${data.link}">
            Your browser does not support HTML video.
        </video>
    `;
}

function cleanerElement(dataContent) {
    return `
        <div class="cleaner"></div>
    `;
}