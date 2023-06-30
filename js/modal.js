//modal form-delivery
const deliveryModal = document.querySelector('.form-delivery');
const deliveryLocalBlock = document.querySelector('.DeliveryChoice_Local');
const buyBtn = document.querySelector('#placeanorderBasketBtn');
const closeOrder = document.querySelector('.form-delivery__close-delivery');

const deliveryPickup = document.querySelector('#formDeliveryChoice_PickUp');
const deliveryLocal = document.querySelector('#formDeliveryChoice_Local');
const overlayFormDelivery = document.querySelector('.overlay-form-delivery')
const sendFormDeliveryBtn = document.querySelector('.send-form-delivery-btn');

document.addEventListener('click', event => {
    if (event.target === buyBtn) {
        deliveryModal.style.display = "flex";
        deliveryModal.style.pointerEvents = "all";
        overlayFormDelivery.style.visibility = "visible";
        overlayFormDelivery.style.height = "300%" //только тут, если полоса прокрутки увеличится, нужно увеличить область вниз на 1000%, костыль короче
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
    if ((event.target === closeOrder) || 
        (event.target === overlayFormDelivery) ||
        (event.target === sendFormDeliveryBtn)) {
        deliveryModal.style.display = "none";
        overlayFormDelivery.style.visibility = "hidden";
        overlayFormDelivery.style.height = "100%"
        document.getElementsByTagName('body')[0].style.overflow = 'visible';
    }
});



/* visibility addres into the form */
const deliveryRadio = document.querySelectorAll('.form-delivery__radio');
const deliveryAdress = document.querySelector('.DeliveryChoice_Local');
deliveryRadio.forEach( Element => {Element.addEventListener('change', function() {
        if(deliveryLocal.checked) {
            deliveryAdress.style.visibility = 'visible';
        } else {
            deliveryAdress.style.visibility = 'hidden';
        }
    })
})
