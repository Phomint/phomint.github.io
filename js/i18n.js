// i18n.js - Loaded as a standard script
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'pt';
        this.init();
    }

    init() {
        this.applyLanguage(this.currentLang);
        this.setupEventListeners();
        this.updateButtonState(this.currentLang);
    }

    // selector is now in HTML, we just update its state
    setupEventListeners() {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });

        const mobileSelect = document.querySelector('.mobile-lang-selector');
        if (mobileSelect) {
            mobileSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    }

    setLanguage(lang) {
        if (lang === this.currentLang) return;

        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        this.updateButtonState(lang);
        this.applyLanguage(lang);
    }

    updateButtonState(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        const mobileSelect = document.querySelector('.mobile-lang-selector');
        if (mobileSelect) mobileSelect.value = lang;
    }

    applyLanguage(lang) {
        if (typeof translations === 'undefined') {
            console.error('Translations not loaded!');
            return;
        }

        const entries = document.querySelectorAll('[data-i18n]');

        entries.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(translations[lang], key);

            if (translation) {
                // If the element has children (like bold tags inside), we typically want to replace text content
                // But for this project, our keys map to full text or specific blocks. 
                // We will use innerHTML to be safe for keys that might contain basic styling if needed, 
                // or textContent for safety. Given our content, textContent is safer unless specified.
                // However, some descriptions might have formatting. Let's generally use textContent 
                // but if we need HTML, we should handle it specially.
                // For now, let's assume textContent unless the element is a container.

                // Special case for elements that might maintain structure (like spans inside)
                // If it's a simple text replacement:
                if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
                    el.placeholder = translation;
                } else {
                    el.innerHTML = translation; // Using innerHTML to allow tags like <br> if present in future
                }
            }
        });

        // Dispatch event for other scripts (like projects.js reloading data if needed)
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    getNestedTranslation(obj, path) {
        return path.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : null;
        }, obj);
    }
}

// Initialize globally
window.languageManager = new LanguageManager();
