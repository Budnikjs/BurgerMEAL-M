/* кнопка добавть */
const addItem = document.querySelectorAll('.btn-add-product');

const itemGood = {
    img__src:'item__img',
    item__name: 'burger',
    item__wt: '250',
    item__cost: '300',
    amount: 1,
};

/* global */
const itemGoods = [];

window.onload = function () {
    if (localStorage.getItem('itemGoods') != undefined) {
        itemGoods = JSON.parse(localStorage.getItem(''));
    }
    renderBasket();
}


/* функция добавления бургера */
addItem.forEach(element => {
    element.addEventListener('click', function() {
        let newItemGood = Object.assign({}, itemGood);        
        newItemGood.img__src = this.parentElement.parentElement.parentElement.querySelector('.product-card-img').querySelector('.item__img').src;
        newItemGood.item__name = this.parentElement.parentElement.querySelector('.product-card-conent-top').querySelector('.item__name').innerHTML;
        newItemGood.item__wt = this.parentElement.querySelector('.item__wt').innerHTML;
        newItemGood.item__cost = this.parentElement.parentElement.querySelector('.product-card-conent-top').querySelector('.item__cost').innerHTML;
        newItemGood.amount = 1;
        
        let hasIt = itemGoods.some(element => {
            return element.item__name === newItemGood.item__name
        })

        if(hasIt){
            itemGoods.forEach(element => {
                if(element.item__name === newItemGood.item__name)
                element.amount++;
                console.log(element.amount);
            })
        } else {
            itemGoods.push(newItemGood);
        }

        console.log(itemGoods);

        localStorage.setItem('itemGoods', JSON.stringify(itemGoods));

        clearBasket();
        renderBasket();        
    })
})

function clearBasket() {
    const basketItemAll = document.querySelectorAll('.basket-item');
    basketItemAll.forEach(element => {
        element.parentNode.removeChild(element);
    })
}

function renderBasket() {
    itemGoods.forEach(element => {
        const renderingItem = `
                <li class="basket-item">
                    <div class="basket-item-product">
                        <img src="${element.img__src}" alt="">
                        <div class="basket-item-product-info">
                            <h4 class="item__name">${element.item__name}</br><span class="product-cost-one">${element.item__wt}</h4>
                            <h3 class="item__cost">${element.item__cost}</h3>
                        </div>
                    </div>
                    <div class="product-counter">
                        <span class="amount-les">-</span>
                        <span class="amount">${element.amount}</span>
                        <span class="amount-more">+</span>
                    </div>                                                                                    
                </li>
            `;        
        document.querySelector('.basket-list').insertAdjacentHTML("afterbegin", renderingItem);
    })    
}

