document.addEventListener('DOMContentLoaded', () => {
    // === SideNav-Closer ===
    const aside = document.querySelector('aside');
    const asideCloser = document.querySelector('.asideCloser');
    const contentContainer = document.querySelector('.contentContainer');

    // == Get-State ==
    const savedAsideState = localStorage.getItem('asideState') || 'opened';

    // == Set Nav-State ==
    if (savedAsideState === 'opened') {
        aside.classList.add('active');
        asideCloser.classList.add('active');
        contentContainer.classList.add('active');
    } else {
        aside.classList.remove('active');
        asideCloser.classList.remove('active');
        contentContainer.classList.remove('active');
    }

    // == Click-Event ==
    asideCloser.addEventListener('click', () => {
        const isNowActive = aside.classList.toggle('active');
        asideCloser.classList.toggle('active');
        contentContainer.classList.toggle('active');

        localStorage.setItem('asideState', isNowActive ? 'opened' : 'closed');
    });


    // === Get year helper ===
    document.querySelectorAll('.activeYear').forEach(el => {
        const yearNow = new Date().getFullYear();
        el.textContent = `${yearNow}`;
    });

    // === Sub Menu Handling ===
    const navButtons = document.querySelectorAll('.navButton');
    const subMenus = document.querySelectorAll('.subMenu');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.dataset.index;

            navButtons.forEach(b => {
                if (b.dataset.index === index) {
                    b.classList.toggle('active');
                } else {
                    b.classList.remove('active');
                }
            });

            subMenus.forEach(sub => {
                if (sub.dataset.index === index) {
                    sub.classList.toggle('active');
                } else {
                    sub.classList.remove('active');
                }
            });
        })
    });

    // === Database Handling ===
    loadWorkspaces();

    // === Form Handling ===
    const addBtnNav = document.querySelectorAll('.addBtnNav');
    const modalContainer = document.querySelector('.modalContainer');
    const addModals = document.querySelectorAll('.modalContainer form');

    addBtnNav.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            modalContainer.classList.add('active');
    
            addModals.forEach(modal => {
                if (modal.dataset.category === category) {
                    modal.classList.add('active');
                } else {
                    modal.classList.remove('active');
                }
            });
        });
    });

    modalContainer.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    function closeModal() {
        modalContainer.classList.remove('active');
        addModals.forEach(modal => modal.classList.remove('active'));
    }
});