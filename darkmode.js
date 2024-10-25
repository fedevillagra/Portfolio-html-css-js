const LOCAL_STORAGE_KEY = 'nightowl-color-scheme';
const LIGHT = 'light';
const DARK = 'dark';
let store = null;
const persistPreference = true;
let mode = LIGHT;
let automaticInitialization = true;
let toggleButtonMode = 'currentState';

try {
    store = localStorage;
} catch (err) {
    // El usuario probablemente bloquea las cookies.
}

function loadCss() {
    const css = document.createElement('style');
    css.innerHTML = `
    .nightowl-light body {
        filter: invert(0%);
    }
    
    .nightowl-dark:not(img) {
        background-color: #111;
    }

    .nightowl-dark body:not(img){
        filter: invert(100%) ;
    }

    .nightowl-dark img, .nightowl-dark video, .nightowl-dark iframe, .nightowl-dark .nightowl-daylight, .nightowl-dark .notDarkMode {
        filter: invert(100%) ;
    }

    .nightowl-dark .icon {
        filter: invert(15%) hue-rotate(180deg);
    }

    .nightowl-dark pre {
        filter: invert(6%);
    }

    .nightowl-dark li::marker {
        color: #666;
    }
    `;
    document.head.appendChild(css);
}

function createNightowl(options) {
    automaticInitialization = false;
    if (options.defaultMode === 'dark') {
        mode = DARK;
    }
    if (options.toggleButtonMode) {
        toggleButtonMode = options.toggleButtonMode;
    }
    if (document.readyState === 'complete') {
        loadCss();
        initializeNightowl();
        initializeSwitcher();
    } else {
        window.addEventListener('load', () => {
            loadCss();
            initializeNightowl();
            initializeSwitcher();
        });
    }
}

window.addEventListener('load', () => {
    if (automaticInitialization) {
        loadCss();
        initializeNightowl();
        initializeSwitcher();
    }
});

function enableDarkMode() {
    mode = DARK;
    const htmlElement = document.querySelector('html');

    if (htmlElement) {
        htmlElement.classList.remove('nightowl-light');
        htmlElement.classList.add('nightowl-dark');
    }

}

function enableLightMode() {
    mode = LIGHT;
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
        htmlElement.classList.remove('nightowl-dark');
        htmlElement.classList.add('nightowl-light');
    }
}

function toggleMode() {
    mode = mode === DARK ? LIGHT : DARK;
    updateMode();
}

function updateMode() {
    if (mode === DARK) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
    setSwitcherIcon();
}

function setSwitcherIcon() {
    const switchers = document.querySelectorAll('#nightowl-switcher-default');

    // Definir los íconos para los modos claro y oscuro
    const lightIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 25px; height:25px;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg>';
    const darkIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 25px; height:25px;"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>';

    switchers.forEach(switcher => {
        if (switcher) {
            switcher.innerHTML = mode === DARK ? (toggleButtonMode === 'newState' ? lightIcon : darkIcon) : (toggleButtonMode === 'newState' ? darkIcon : lightIcon);
        }
    });
}

function createSwitcher() {
    const switcher = document.createElement('div');
    switcher.id = 'nightowl-switcher-default';
    switcher.style.position = 'fixed';
    switcher.style.left = 'calc(100vw - 100px)';
    switcher.style.top = '10px';
    switcher.style.width = '50px';
    switcher.style.height = '50px';
    switcher.style.borderRadius = '50%';
    switcher.style.backgroundColor = toggleButtonMode === 'newState' ? 'black' : 'white';
    switcher.style.display = 'flex';
    switcher.style.justifyContent = 'center';
    switcher.style.alignItems = 'center';
    switcher.style.cursor = 'pointer';
    switcher.style.zIndex = '9999';
    switcher.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
    switcher.style.transition = 'all 0.3s ease-in-out';
    switcher.style.color = toggleButtonMode === 'newState' ? 'white' : 'black';

    switcher.addEventListener('click', () => {
        toggleMode();
        storeModeInLocalStorage();
    });
    return switcher;
}

function initializeSwitcher() {
    // Tomar los dos nav
    const navbar = document.getElementById('desktop-nav');
    const navbarResponsive = document.getElementById('hamburger-nav');

    // Crear dos switchers
    const desktopSwitcher = createSwitcher('nightowl-switcher-desktop', navbar);
    const mobileSwitcher = createSwitcher('nightowl-switcher-mobile', navbarResponsive);

    navbar.appendChild(desktopSwitcher);
    navbarResponsive.appendChild(mobileSwitcher);

    setSwitcherIcon();
}

function initializeColorSchemeChangeListener() {
    // Puedes agregar aquí un cambio de esquema basado en preferencias del usuario si es necesario
}

function checkForRememberedValue() {
    let rememberedValue = null;
    try {
        if (store) {
            rememberedValue = store.getItem(LOCAL_STORAGE_KEY);
        }
    } catch (err) {}

    if (rememberedValue && [DARK, LIGHT].includes(rememberedValue)) {
        mode = rememberedValue;
    } else if (hasNativeDarkPrefersColorScheme()) {
        mode = DARK;
    }
}

function initializeNightowl() {
    initializeColorSchemeChangeListener();
    checkForRememberedValue();
    updateMode();
}

function storeModeInLocalStorage() {
    if (persistPreference && mode !== null) {
        try {
            if (store) {
                store.setItem(LOCAL_STORAGE_KEY, mode);
            }
        } catch (err) {}
    }
}

function hasNativeDarkPrefersColorScheme() {
    return (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );
}

