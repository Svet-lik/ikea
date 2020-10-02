import {
    getData
} from './getData.js';

const wishList = ['idd005', 'idd0010', 'idd015', 'idd025', 'idd095'];

const generateGoodsPage = () => {

    const mainHeader = document.querySelector('.main-header'); //для прописывания заголовка страницы
    const goodsList = document.querySelector('.goods-list');
    // генерируем карточки
    const generateCards = data => {
        goodsList.textContent = '';
        data.forEach(item => {
            const {name, price, description, img:[img1, img2], id} = item;
             goodsList.insertAdjacentHTML('afterbegin', `                
                <li class="goods-list__item">
					<a class="goods-item__link" href="card.html#${id}">
						<article class="goods-item">
							<div class="goods-item__img">
								<img src=${img1}
									 data-second-image="${img2}" alt=${name}>
							</div>
							<p class="goods-item__new">Новинка</p>
							<h3 class="goods-item__header">${name}</h3>
							<p class="goods-item__description">${description}</p>
							<p class="goods-item__price">
								<span class="goods-item__price-value">${price}</span>
								<span class="goods-item__currency"> ₽</span>
							</p>
							<button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="idd001"></button>
						</article>
					</a>
				</li>
            `)
        });
    }

    if (location.pathname.includes('goods') && location.search) {
        // декодирование строки на русский язык
        const search = decodeURI(location.search);
        // разбиение строки составляющие каталог подкаталог(меню подменю)
        const prop = search.split('=')[0].substring(1);
        const value = search.split('=')[1];

        if (prop === 's') {
            getData.search(value, generateCards);
            mainHeader.textContent = `Поиск: ${value}`;
        } else if (prop === 'wishlist') {
            getData.wishList(wishList, generateCards);            
            mainHeader.textContent = `Список желаний`;
        } else if (prop === 'cat' || prop === 'subcat') {
            getData.category(prop, value, generateCards);
            mainHeader.textContent = value;
        }
    }
};

export default generateGoodsPage;