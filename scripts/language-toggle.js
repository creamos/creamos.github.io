function initLanguageToggle() {
    if (sessionStorage.lang == null)
        sessionStorage.lang = 'en';

    setLangToggle(sessionStorage.lang != 'en');
    translate(sessionStorage.lang, 'lang-tag');

    const langToggle = document.getElementById("language-toggle");

    langToggle.addEventListener("change", (e) => {

        sessionStorage.lang = e.currentTarget.checked ? 'fr':'en';
        translate(sessionStorage.lang, 'lang-tag');
    });
}

function setLangToggle(state) {
    document.getElementById("language-toggle").checked = state;
}