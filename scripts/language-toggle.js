function initLanguageToggle() {
    translate('en', 'lng-tag');
    const langToggle = document.getElementById("language-toggle");

    langToggle.addEventListener("change", (e) => {
        if (e.currentTarget.checked)
            translate('fr', 'lang-tag');
        else
            translate('en', 'lang-tag');
    });
}