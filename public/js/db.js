// === Workspace-Loader ===
async function loadWorkspaces() {
    try {
        const data = await window.electronAPI.invoke('get-workspaces');
        if (!data) return;

        // Container mit den Items (Workspaces)
        const subMenu = document.querySelector('.subMenu[data-index="Workspaces"]');
        if (!subMenu) return;

        // Findet den Add-Button im SubMenu
        const addBtn = subMenu.querySelector('button.addBtnNav[data-category="Workspaces"]');
        if (!addBtn) return;

        // Zuerst alle alten Items entfernen (außer dem Add-Button)
        // Wir entfernen alle .item-Elemente im SubMenu
        subMenu.querySelectorAll('.item').forEach(item => item.remove());

        // Für jeden Workspace ein Item erzeugen und vor dem Add-Button einfügen
        data.forEach(workspace => {
            const div = document.createElement('div');
            div.classList.add('item');
        
            const icon = document.createElement('i');
            icon.classList.add('fas', 'fa-briefcase');
        
            const p = document.createElement('p');
            p.textContent = workspace.name; // sicher, kein HTML-Injection
        
            div.appendChild(icon);
            div.appendChild(p);
        
            subMenu.insertBefore(div, addBtn);
        });

    } catch (err) {
        console.error('Fehler beim Laden der Workspaces:', err);
    }
}

// === Add Workspace ===
const wsAddForm = document.querySelector('.modalForm[data-category="Workspaces"]');
wsAddForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(wsAddForm);

    const result = await window.electronAPI.invoke('add-workspace', Object.fromEntries(data));
    console.log(result);
});

// === Load iconlist ===
async function loadFontAwesomeIconsCustom() {
    const selectTrigger = document.querySelector('.select-trigger');
    const optionsContainer = document.querySelector('.options-container');
    const iconInput = document.getElementById('iconInput');

    const res = await fetch('../database/fa-icons.json');
    const iconGroups = await res.json();

    optionsContainer.innerHTML = '';

    const layoutWrapper = document.createElement('div');
    layoutWrapper.classList.add('icon-selector-layout');

    const categoryList = document.createElement('div');
    categoryList.classList.add('category-list');

    const iconsGrid = document.createElement('div');
    iconsGrid.classList.add('icons-grid');

    layoutWrapper.appendChild(categoryList);
    layoutWrapper.appendChild(iconsGrid);
    optionsContainer.appendChild(layoutWrapper);

    const resetButton = document.createElement('div');
    resetButton.classList.add('reset-icon');

    const resetIcon = document.createElement('i');
    resetIcon.classList.add('fas', 'fa-times');
    resetButton.appendChild(resetIcon);

    resetButton.addEventListener('click', () => {
        iconInput.value = '';
        selectTrigger.textContent = '';
        initLang();
        optionsContainer.style.display = 'none';
    });
    categoryList.appendChild(resetButton);

    for (const [groupName, icons] of Object.entries(iconGroups)) {
        const previewIcon = document.createElement('div');
        previewIcon.classList.add('category-icon');
        previewIcon.title = groupName;

        const iconEl = document.createElement('i');
        iconEl.classList.add('fas', `fa-${icons[0]}`);
        previewIcon.appendChild(iconEl);

        previewIcon.addEventListener('click', () => {
            renderIcons(icons);
            setActiveCategory(previewIcon);
        });

        categoryList.appendChild(previewIcon);
    }

    function renderIcons(iconArray) {
        iconsGrid.replaceChildren();
        iconArray.forEach(iconName => {
            const option = document.createElement('div');
            option.classList.add('option');
            option.dataset.value = iconName;

            const icon = document.createElement('i');
            icon.classList.add('fas', `fa-${iconName}`);
            option.appendChild(icon);

            option.addEventListener('click', () => {
                const selectedIcon = document.createElement('i');
                selectedIcon.classList.add('fas', `fa-${iconName}`);
                selectTrigger.innerHTML = '';
                selectTrigger.appendChild(selectedIcon);

                iconInput.value = iconName;
                optionsContainer.style.display = 'none';
            });

            iconsGrid.appendChild(option);
        });
    }

    function setActiveCategory(activeEl) {
        document.querySelectorAll('.category-icon').forEach(el => el.classList.remove('active'));
        activeEl.classList.add('active');
    }

    const firstGroup = Object.values(iconGroups)[0];
    renderIcons(firstGroup);
    categoryList.querySelectorAll('.category-icon')[0]?.classList.add('active');

    selectTrigger.addEventListener('click', () => {
        optionsContainer.style.display = optionsContainer.style.display === 'flex' ? 'none' : 'flex';
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.custom-select')) {
            optionsContainer.style.display = 'none';
        }
    });
}
loadFontAwesomeIconsCustom();