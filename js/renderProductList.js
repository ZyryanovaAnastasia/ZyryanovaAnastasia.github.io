    class ProductItem {
        constructor(title= 'Название', price= 0) {
            this.title = title;
            this.price = price;
        }

        render() { 
            return`
                <div class="product_list-item">
                <img src="img/${this.title}.jpg" alt="img${this.title}" class="product_list-item-img">
                <div class="product_list-item-div_text">
                    <h3 class="product_list-item-title">${this.title}</h3>
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
            this.fetchProducts();
            this.render();
            this.getSumPrice();
        }

        fetchProducts() {
            this.products = [
                { title: 'pants', price: 150 },
                { title: 'socks', price: 50 },
                { title: 'jacket', price: 350 },
                { title: 'dress', price: 250 },
            ];
        }

        getSumPrice() {
            let sum = 0;
            for (let product of this.products) {
                sum += product.price;
            }

            return sum;
        }

        render() { 
            const productList = this.products.map(({title, price}) => {
                const productItem = new ProductItem(title, price);
                return productItem.render();
            });
            document.querySelector('.product_list').innerHTML = productList.join('');
        }
    }

    onload = () => {
        new ProductList();
    }