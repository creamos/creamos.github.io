function initLanguageToggle() {
    translate('en', 'lng-tag');
    const langToggle = document.getElementById("language-toggle");

    langToggle.addEventListener("change", (e) => {
        if (e.currentTarget.checked)
            translate('fr', 'lng-tag');
        else
            translate('en', 'lng-tag');
    });
}