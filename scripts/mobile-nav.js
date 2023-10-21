const sideNav = document.querySelector('.side-nav');
const menuButton = document.querySelector('.menu-button'); // No need to create the button element

document.addEventListener('click', (event) => {
    if (
        sideNav.classList.contains('active') &&     // Menu is open
        event.target !== sideNav &&                 // Click target is not the menu
        event.target !== menuButton &&              // Click target is not the menu button
        !menuButton.contains(event.target)
        ) {
        // Close the menu
        console.log("Closed by window click!");
        closeNav();
    }
});

function toggleNav() {
    if(menuButton.classList.contains('opened')) {
        closeNav();
    } else { openNav(); }
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    var menuButton = document.getElementById("menuButton");
    //menuButton.style.display = 'none';
    menuButton.classList.add('opened');
    menuButton.setAttribute('aria-expanded', true);

    var sideNav = document.getElementById("sideNav");
    sideNav.classList.add('active');
    sideNav.style.width = "250px";

    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("main").style.marginRight = "-250px";

    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";

    console.log("Opened!");

}
  
/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    var menuButton = document.getElementById("menuButton");
    menuButton.style.display = 'inherit';
    menuButton.classList.remove('opened');
    menuButton.setAttribute('aria-expanded', false);

    var sideNav = document.getElementById("sideNav");
    sideNav.classList.remove('active');
    sideNav.style.width = "0";

    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("main").style.marginRight = "0";

    document.body.style.backgroundColor = "white";
    
    console.log("Closed!");
}