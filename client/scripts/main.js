let categoryLink = document.querySelector(`a[href = 'goods.html${location.hash}']`);
const goodsTitle = document.querySelector('.goods__title');
let hash = location.hash.substring(1);


const headerCityButton = document.querySelector('.header__city-button');

headerCityButton.textContent = localStorage.getItem('city-location') || 'Ваш город?';

headerCityButton.addEventListener('click', e => {
    const city = prompt('Укажите ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('city-location', city);
})

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

subheaderCart.addEventListener('click', e => {
    cartOverlay.classList.add('cart-overlay-open');

    //Disable scrolling
    const scrollWidth = window.innerWidth - document.body.offsetWidth;
    document.body.dbScrollY = window.scrollY;
    document.body.style.cssText = `
        top: -${window.scrollY}px;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${scrollWidth}px;
    `;

})

cartOverlay.addEventListener('click', e => {
    const target = e.target;
    if(target.classList.contains('cart__btn-close') || target.classList.contains('cart-overlay')){
        cartOverlay.classList.remove('cart-overlay-open');

        //Enable scrolling
        document.body.style.cssText = ``;
        window.scroll({
            top: document.body.dbScrollY,
        });
    }
})

//retrieving data from server
const getData = async () => {
    const dataPromise = await fetch('db.json');
    if (dataPromise.ok){
        return dataPromise.json();
    } else {
        throw new Error(`Error when fetching data ${dataPromise.status} ${dataPromise.statusText}`);
    }
}

const getGoods = (callback, property, value) => {
    getData().then(data => {
        if(value){
            callback(data.filter(i => i[property] === value));
        } else {
            callback(data);
        }
    }, err => {
        console.error(err);
    })
}

try {
    const goodsList = document.querySelector('.goods__list');
    if(!goodsList){
        throw new Error('This page doesn\'t contain element with class goods__list');
    }

    const createCard = ({ id, preview, cost, brand, name, sizes }) => {

        const li = document.createElement('li');
        li.classList.add('goods__item');
        li.innerHTML = `
        <article class="good">
                            <a class="good__link-img" href="card-good.html#${id}">
                                <img class="good__img" src="goods-image/${preview}" alt="">
                            </a>
                            <div class="good__description">
                                <p class="good__price">${cost} &#8381;</p>
                                <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                                ${sizes ?
                                `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(" ")}</span></p>`
                                : ''}
                                <a class="good__link" href="card-good.html#${id}">Подробнее</a>
                            </div>
                        </article>
        `;
        return li;
    };

    const renderGoodsList = (data) => {
        goodsList.innerHTML = '';

        for(let i = 0; i < data.length; i++){
            const item = data[i];
            const card = createCard(item);
            goodsList.append(card);
        }
    };

    window.addEventListener('hashchange', () => {
        hash = location.hash.substring(1);
        categoryLink = document.querySelector(`a[href = 'goods.html${location.hash}']`);
        renderTitle();
        getGoods(renderGoodsList, 'category', hash);
    })

    getGoods(renderGoodsList, 'category', hash);

} catch (e){

}

const renderTitle = () => {
    if(goodsTitle){
        if(categoryLink){
            goodsTitle.textContent = categoryLink.textContent;
        } else {
            goodsTitle.textContent = 'Все';
        }
    }
}

renderTitle();

try{
    if(!document.querySelector('.card-good')){
        throw 'It is not good page!'
    }
    const cardGoodImage = document.querySelector('.card-good__image');
    const cardGoodBrand = document.querySelector('.card-good__brand');
    const cardGoodTitle = document.querySelector('.card-good__title');
    const cardGoodPrice = document.querySelector('.card-good__price');
    const cardGoodColor = document.querySelector('.card-good__color');
    const cardGoodColorList = document.querySelector('.card-good__color-list');
    const cardGoodSizes = document.querySelector('.card-good__sizes');
    const cardGoodSizesList = document.querySelector('.card-good__sizes-list');
    const cardGoodSelectWrappers = document.querySelectorAll('.card-good__select__wrapper');

    const createCardGoodPropertyList = (data) => data.reduce((html, item, index) => html +
        `<li class="card-good__select-item" data-id="${index}">${item}</li>`, ''
    );

    const renderCardGood = ( [{ brand, name, cost, color, sizes, photo }] ) => {
        cardGoodImage.src = 'goods-image/' + photo;
        cardGoodImage.alt = `${brand} ${name}`;
        cardGoodBrand.textContent = brand;
        cardGoodTitle.textContent = name;
        cardGoodPrice.textContent = `${cost} ₽`;
        if(color){
            cardGoodColor.textContent = color[0];
            cardGoodColor.dataset.id = 0;
            cardGoodColorList.innerHTML = createCardGoodPropertyList(color);
        } else {
            cardGoodColor.style.display = 'none';
        }

        if(sizes){
            cardGoodSizes.textContent = sizes[0];
            cardGoodSizes.dataset.id = 0;
            cardGoodSizesList.innerHTML = createCardGoodPropertyList(sizes);
        } else {
            cardGoodSizes.style.display = 'none';
        }

        cardGoodSelectWrappers.forEach(wrapper => {
            wrapper.addEventListener('click', (e) => {
                const target = e.target;

                if(target.closest('.card-good__select')){
                    target.classList.toggle('card-good__select__open');
                }

                if(target.closest('.card-good__select-item')){
                    const cardGoodSelect = wrapper.querySelector('.card-good__select');
                    cardGoodSelect.textContent = target.textContent;
                    cardGoodSelect.dataset.id = target.dataset.id;
                    cardGoodSelect.classList.remove('card-good__select__open');
                }

            });
        });

    }

    getGoods(renderCardGood, 'id', hash);

}catch (e) {
    console.error(e);
}