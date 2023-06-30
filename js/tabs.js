//tabs---------------------------------------------------
const tabsBtn = document.querySelectorAll('.tab__btn');
const tabsItem = document.querySelectorAll('.tab-item');

const tabsIemTitle = document.querySelector('.item-title');
tabsIemTitle.innerHTML = document.querySelector('.nav-list').querySelector('.active-tab').innerText;


tabsBtn.forEach(function (activeBtn) {
    activeBtn.addEventListener('click', function () {

        const tabId = activeBtn.getAttribute('data-tab');
        const activeTab = document.querySelector(tabId);

        tabsBtn.forEach(function (item) {
            item.classList.remove('active-tab');
        });

        tabsItem.forEach(function (item) {
            item.classList.remove('active-tab');
        });

        activeBtn.classList.add('active-tab');
        activeTab.classList.add('active-tab');
        tabsIemTitle.innerHTML = activeBtn.innerText;
    });
});
//-------------------------------------------------------