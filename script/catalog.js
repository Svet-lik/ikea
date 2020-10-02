import { getData } from './getData.js';
import generateSubCatalog from './generateSubCatalog.js';

export const catalog = () => {
    const updateSubCatalog = generateSubCatalog();
    const btnBurger = document.querySelector('.btn-burger');
    const catalog = document.querySelector('.catalog');
    const subCatalog = document.querySelector('.subcatalog');
    const subcatalogHeader = document.querySelector('.subcatalog-header');
    const btnReturn = document.querySelector('.btn-return');

    //Добавление overlay в разметку
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.append(overlay);

    //управление открытием меню
    const openMenu = () => {
        catalog.classList.add('open');
        overlay.classList.add('active');
    };
    //управление закрытием меню
    const closeMenu = () => {
        closeSubMenu();
        catalog.classList.remove('open');
        overlay.classList.remove('active');
    };
    //управление открытием подменю
    const handlerCatalog = event => {
        event.preventDefault();        
        const itemList = event.target.closest('.catalog-list__item>a');
        if (itemList) {
            getData.subCatalog(itemList.textContent, (data) => {
                updateSubCatalog(itemList.textContent, data);
                subCatalog.classList.add('subopen');
            })
        };
        if (event.target.closest('.btn-close')) {
            closeMenu();
        }
    };
    //управление закрытием подменю
    const closeSubMenu = () => {
        subCatalog.classList.remove('subopen');
    };

    //вешаем обработчики для открытия/закрытия меню/подменю
    btnBurger.addEventListener('click', openMenu);
    overlay.addEventListener('click', closeMenu);
    catalog.addEventListener('click', handlerCatalog);
    subCatalog.addEventListener('click', event => {
        const btnReturn = event.target.closest('.btn-return');
        if (btnReturn) closeSubMenu();
    })

    document.addEventListener('keypress', e => {
        if (e.code === 'Escape') {
            closeMenu();
        };
    });
}