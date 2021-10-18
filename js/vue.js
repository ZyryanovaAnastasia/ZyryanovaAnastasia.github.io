const PRODUCTS =  [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
]

Vue.component('product-item', {
    props: ['item'],
    template: `
        <div class="product_list-item">
            <img src="#" alt="img" class="product_list-item-img"">
            <div class="product_list-item-div_text">
                <h3 class="product_list-item-title">{{ item.title }}</h3>
                <span class="product_list-item-price">{{ item.price }}руб.</span>
            </div>
            <button class="product_list-item-btn_add">Добавить</button>
        </div>
    `,
});

Vue.component('basket-card', {
    props: ['item'],
    template: `
        <div class="basket">
            <span class="basket-title">Корзина</span>
        </div>
    `,
});

Vue.component('basket-goods-item', {
    props: ['item'],
    template: `
        <div class="basket-item">
            <div class="basket-item-div_text">
                <h3 class="basket-item-title">{{ item.title }}</h3>
                <span class="basket-item-price">{{ item.price }}руб.</span>
            </div>
        </div>
    `,
});

const app = new Vue({
    el: '#app',
    data: {
        products: PRODUCTS,
        productsFiltered: PRODUCTS,
        basketCardVision: false,
        searchStr: '',
        title: 'myTitle'
    },
    methods: {
        productsFilter: function () {
            this.productsFiltered = this.products.filter(({ title }) => new RegExp(this.searchStr, 'i').test(title))
        }
    }
})