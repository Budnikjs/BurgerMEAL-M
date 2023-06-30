/* общее количство итемов в корзине */
const basketAmount = document.querySelector('.basket__amount');
/* количество бургеров в конкретной позиции в корзине */
const itemAmount = document.querySelectorAll('.amount');
const basketItem = document.querySelectorAll('.product-counter');

const itemCost = document.querySelectorAll('.item__cost');
const basketBlock = document.querySelector('.basket-block');

/* функция подсчета общего числа бургеров в корзине */
function totalAmountCount() {
    let basketAmountVar = 0;
    basketItem.forEach(element => {
        basketAmountVar += Number(element.querySelector('.amount').innerHTML);
    });
    basketAmount.innerHTML = basketAmountVar;
};


document.addEventListener('click', event => {
    if (event.target.className === 'amount-more') {
        event.target.parentElement.querySelector('.amount').textContent++;
    }
    if (event.target.className === 'amount-les') {
        let amount = event.target.parentElement.querySelector('.amount');
        if (amount.textContent > 0) {
            amount.textContent--;
            if (amount.textContent === '0') {
                console.log(amount.parentElement.parentElement.remove());
            }
        }
    };
    totalAmountCount();
});
