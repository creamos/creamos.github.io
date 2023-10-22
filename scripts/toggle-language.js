function toggleLanguage(lang) {

    document.querySelectorAll("[data-lang]").forEach(element => {
        if (element.dataset.lang == lang) element.classList.toggle('hide', false);
        else element.classList.toggle('hide', true);
    });

    document.querySelectorAll("[data-translate-placeholder-"+lang+"]").forEach(element => {
        element.setAttribute("placeholder", lang == 
            'en' ? element.dataset.translatePlaceholderEn
            : 'fr' ? element.dataset.translatePlaceholderFr
            : element.dataset.translatePlaceholderEn);
    });
}


toggleLanguage('en');
const langToggle = document.getElementById("language-toggle");

langToggle.addEventListener("change", (e) => {
    if (e.currentTarget.checked) {
        toggleLanguage('fr');
    } else {
        toggleLanguage('en');
    }
 });