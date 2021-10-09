const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const CATALOG_URL = '/catalogData.json';

function makeGETRequest(method, url) {
    return new Promise((resolve, reject) => {
        var xhr;
    
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    
        xhr.open(method, `${API_URL}${url}`, true);
        xhr.send();
        xhr.onload = () => {
            resolve(this.products = JSON.parse(xhr.responseText))
        };
    });
}

class ProductItem {
    constructor(product_name = 'Название', price = 0) {
        this.product_name = product_name;
        this.price = price;
    }

    render() { 
        return`
            <div class="product_list-item">
            <img src="img/${this.product_name}.jpg" alt="img${this.product_name}" class="product_list-item-img">
            <div class="product_list-item-div_text">
                <h3 class="product_list-item-title">${this.product_name}</h3>
                <span class="product_list-item-price">${this.price}руб.</span>
            </div>
            <button class="product_list-item-btn_add">Добавить</button>
            </div>
        `;
    }
}

class ProductList {
    products = [];

    constructor() {
        this.fetchProducts().then(() => {
            this.render();
            this.getSumPrice();
        });

    }

    fetchProducts() {
        return makeGETRequest('GET', CATALOG_URL).then(productsList => {
            this.products = productsList;
        });
    }

    getSumPrice() {
        console.log(this.products.reduce((prev, {price}) => prev + price, 0))
        return this.products.reduce((prev, {price}) => prev + price, 0);
    }

    render() { 
        const productList = this.products.map(({product_name, price}) => {
            const productItem = new ProductItem(product_name, price);
            return productItem.render();
        });
        document.querySelector('.product_list').innerHTML = productList.join('');
    }      
}

window.onload = () => {
    new ProductList();
}