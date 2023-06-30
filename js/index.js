
const basketAmount = document.querySelector('.basket__amount');/* общее количство итемов в корзине */
const itemAmount = document.querySelectorAll('.amount');/* количество бургеров в конкретной позиции в корзине */
const itemAmountPlus = document.querySelectorAll('.amount-more');
const itemAmountMinus = document.querySelectorAll('.amount-les');
const addItem = document.querySelectorAll('.btn-add-product');/* кнопка добавть */

const itemCost = document.querySelectorAll('.item__cost');
const basketBlock = document.querySelector('.basket-block');
const basketTotalPrice = document.querySelector('.total__amount');

/* globe */
const itemGood = {
    img__src:'item__img',
    item__name: 'burger',
    item__wt: '250',
    item__cost: '300',
    amount: 1,
};
const itemGoods = [];

window.onload = function () {
    if (localStorage.getItem('itemGoods') != undefined) {
        const arrFromLocal = JSON.parse(localStorage.getItem('itemGoods'));
        itemGoods.push(...arrFromLocal);
        console.log(itemGoods);
    }
    clearBasket();
    renderBasket();
}

function totalAmountCount() {
    const basketItem = document.querySelectorAll('.product-counter');
    let basketAmountVar = 0;
    basketItem.forEach(element => {
        basketAmountVar += Number(element.querySelector('.amount').innerHTML);
    });
    basketAmount.innerHTML = basketAmountVar;
};

document.addEventListener('click', event => {
    if (event.target.className === 'amount-more') {
        event.target.parentElement.querySelector('.amount').textContent++;
        const findItem = event.target.parentElement.parentElement.querySelector('.basket-item-product').querySelector('.item__name');
        itemGoods.forEach(element => {
            if(findItem.textContent.indexOf(element.item__name) >= 0) {
                element.amount++;
            }; 
        })
    }
    if (event.target.className === 'amount-les') {
        let amount = event.target.parentElement.querySelector('.amount');
        if (amount.textContent > 0) {
            const findItem = event.target.parentElement.parentElement.querySelector('.basket-item-product').querySelector('.item__name');
            amount.textContent--;
            itemGoods.forEach(element => {
                if(findItem.textContent.indexOf(element.item__name) >= 0) {
                    element.amount--;
                }; 
            })
        }        
        if (amount.textContent === '0') {
            const findItem = event.target.parentElement.parentElement.querySelector('.basket-item-product').querySelector('.item__name');
            console.log(amount.parentElement.parentElement);
            itemGoods.forEach(element => {
                if(findItem.textContent.indexOf(element.item__name) >= 0) {
                    console.log(itemGoods.indexOf(element));
                    const idxOfDelElement = itemGoods.indexOf(element);
                    itemGoods.splice(idxOfDelElement, 1);
                }; 
            })   
            amount.parentElement.parentElement.remove();
        }
        
    };
    totalAmountCount();
    totalPrice();
    
    localStorage.setItem('itemGoods', JSON.stringify(itemGoods));

});

/* функция добавления бургера */
addItem.forEach(element => {
    element.addEventListener('click', function() {
        let newItemGood = Object.assign({}, itemGood);        
        newItemGood.img__src = this.parentElement.parentElement.parentElement.querySelector('.product-card-img').querySelector('.item__img').getAttribute("src");
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
    });
    totalAmountCount();
    totalPrice();   
}

function totalPrice() {
    let totalPrice = 0;
    basketBlock.querySelectorAll('.item__cost').forEach(element => {
        itemPrice = Number(element.querySelector('span').innerText);
        itemQuantity = Number(element.parentElement.parentElement.parentElement.querySelector('.amount').innerText);
        totalPrice += itemPrice*itemQuantity;
        basketTotalPrice.innerText = `${totalPrice} ₽`;
    })
};
