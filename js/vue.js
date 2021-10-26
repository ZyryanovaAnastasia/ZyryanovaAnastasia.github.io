const API_URL = 'http://localhost:8000';
const CATALOG_URL = '/products.json';
const BASKET_URL = '/basket.json';

const transformProducts = function(products) {
    return products.map((_Product) => {
      return {
        id: _Product.id_product,
        title: _Product.product_name,
        price: _Product.price
      }
    })
}

const makeGETRequest = (method, url) => (
    new Promise((resolve) => {
        var xhr;
    
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    
        xhr.open(method, `${API_URL}${url}`, true);
        xhr.send();
        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText))
        };
    })
  );

  
Vue.component('custom-button', {
    template: `
      <button @click="$emit('click')">
        <slot></slot>
      </button>
    `
  })

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
    data: function () {
        return {
          basketGoods: []
        }
    },
    mounted: function () {
        service('GET', BASKET_URL).then((products) => {
            // this.basketGoods = transformProducts(products);
        })
      },
    template: `
        <div class="basket">
            <div class="basket-header">
                <slot name="header"></slot>
            </div>
            <slot></slot>
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
        products: [],
        productsFiltered: [],
        basket: [],
        basketCardVision: false,
        searchStr: ''
    },
    mounted: function () {
        makeGETRequest('GET', CATALOG_URL).then((products) => {
          const resultProducts = transformProducts(products);
          this.products = resultProducts;
          this.productsFiltered = resultProducts;
        })
        makeGETRequest('GET', BASKET_URL).then((products) => {
            const resultProducts = transformProducts(products);
            this.basket = resultProducts;
        })
    },
    methods: {
        productsFilter: function () {
            this.productsFiltered = this.products.filter(({ title }) => new RegExp(this.searchStr, 'i').test(title))
        },
        openCard: function () {
            this.basketCardVision = true;
        },
        closeCard: function () {
            this.basketCardVision = false;
        }
    }
})