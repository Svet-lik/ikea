import getData from './getData.js';
import userData from './userData.js';

const generateCartPage = () => {
    const renderCard = ({
        category,
        subcategory,
        name: itemName,
        price,
        description,
        img,
        id,
        count
    }) => {
        const productImageContainer = document.querySelector('.product__image-container');
        const productName = document.querySelector('.product__name');
        const productDescriptionText = document.querySelector('.product_description-text');
        const productTotalRegular = document.querySelector('.product__total-regular');
        const btnRemove = document.querySelector('.btn-remove');
        const productControlsQuantity = document.querySelector('.product-controls__quantity');

        productControlsQuantity.textContent = '';
        productName.textContent = itemName;
        productDescriptionText.textContent = description;
        productTotalRegular.textContent = price;
        btnRemove
        
        if (count) {
            for (let i=1;i<=count;i++) {
                productControlsQuantity.insertAdjacentHTML('afterbegin', `
                <option value="${i}">${i}</option>                
                `);

            }
        }

        productImageContainer.insertAdjacentHTML('afterbegin', `
            <img src=${img} 
            alt="${itemName}" 
            aria-describedby="aria_product_description_40366083" 
            itemprop="image">
        `);
    }
    if (location.pathname.includes('cart')) {
        
        getData.cart(userData.cartListData, renderCard);
    }
}

export default generateCartPage;

