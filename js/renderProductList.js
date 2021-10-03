const products = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
  ];
  
  const renderProductItem = (title = "Название", price = 0) => {
      const productItem = `
      <div class="product_list-item">
        <img src="" alt="${title}" class="product_list-item-img">
        <div class="product_list-item-div_text">
            <h3 class="product_list-item-title">${title}</h3>
            <span class="product_list-item-price">${price}руб.</span>
        </div>
        <button class="product_list-item-btn_add">Добавить</button>
      </div>
      `;
      return productItem;
  };
  
  const renderProductList = (list) => {
    let productList = list.map(({title, price}) => renderProductItem(title, price));
    document.querySelector('.product_list').innerHTML = productList.join('');
  }
  
  renderProductList(products);